export interface JanusSignalingOptions {
  roomId: number; // Janus のルームID
  feedId: number; // 受信対象の publisher feed ID
  onRemoteStream: (stream: MediaStream) => void; // 映像受信時のコールバック
}

export class JanusSignalingClient {
  private JANUS_SERVER_URL = 'ws://backend.skypics.jp:8188/janus'; // Janus サーバーの URL
  private ws: WebSocket | null = null; // WebSocket 接続
  private pc: RTCPeerConnection | null = null; // WebRTC ピア接続
  private sessionId?: number; // Janus セッション ID
  private handleId?: number; // Janus ハンドル ID（プラグイン接続）
  private lastJsep: any = null; // 最後に生成した SDP answer 等

  constructor(private options: JanusSignalingOptions) {}

  // ランダムな英数字トランザクション ID を生成
  private makeTxn(): string {
    return `txn-${Math.random().toString(36).substring(2, 14)}`;
  }

  // WebSocket を通して Janus にメッセージ送信
  private send(msg: any) {
    console.log('Sending message to Janus:', msg);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  public connect(): void {
    console.log('Connecting to Janus server...');
    this.ws = new WebSocket(this.JANUS_SERVER_URL, 'janus-protocol');

    this.ws.onopen = () => {
      console.log('WebSocket connected.');
      this.send({ janus: 'create', transaction: this.makeTxn() });
    };

    this.ws.onmessage = async (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log('Received message from Janus:', data);

      // セッション作成応答
      if (data.janus === 'success' && data.data && data.data.id && !this.sessionId) {
        this.sessionId = data.data.id;
        console.log('Session created. ID:', this.sessionId);
        this.send({
          janus: 'attach',
          plugin: 'janus.plugin.videoroom',
          session_id: this.sessionId,
          transaction: this.makeTxn(),
        });
      }
      // プラグインアタッチ応答
      else if (
        data.janus === 'success' &&
        data.data &&
        data.data.id &&
        !this.handleId &&
        this.sessionId
      ) {
        this.handleId = data.data.id;
        console.log('Plugin attached. Handle ID:', this.handleId);
        this.send({
          janus: 'message',
          session_id: this.sessionId,
          handle_id: this.handleId,
          body: {
            request: 'join',
            room: this.options.roomId,
            ptype: 'subscriber',
            feed: this.options.feedId,
          },
          transaction: this.makeTxn(),
        });
      }
      // SDP offer を受信した場合
      else if (data.janus === 'event' && data.jsep && data.jsep.type === 'offer') {
        console.log('Received SDP offer:', data.jsep);
        this.pc = new RTCPeerConnection();
        // 受信用トランシーバーを明示的に追加
        this.pc.addTransceiver('audio', { direction: 'recvonly' });
        this.pc.addTransceiver('video', { direction: 'recvonly' });

        this.pc.ontrack = (event: RTCTrackEvent) => {
          if (event.streams && event.streams[0]) {
            console.log('Remote stream received.');
            this.options.onRemoteStream(event.streams[0]);
          }
        };

        try {
          await this.pc.setRemoteDescription(new RTCSessionDescription(data.jsep));
          const answer = await this.pc.createAnswer();
          await this.pc.setLocalDescription(answer);
          console.log('Created SDP answer:', answer);
          this.lastJsep = answer; // SDP answer を保存
          this.send({
            janus: 'message',
            session_id: this.sessionId,
            handle_id: this.handleId,
            body: { request: 'start', room: this.options.roomId },
            jsep: answer,
            transaction: this.makeTxn(),
          });
        } catch (err) {
          console.error('Error during SDP negotiation:', err);
        }

        // ICE candidate の処理（trickle ICE）
        this.pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
          if (event.candidate) {
            this.send({
              janus: 'trickle',
              session_id: this.sessionId,
              handle_id: this.handleId,
              candidate: event.candidate,
              transaction: this.makeTxn(),
            });
          } else {
            this.send({
              janus: 'trickle',
              session_id: this.sessionId,
              handle_id: this.handleId,
              candidate: { completed: true },
              transaction: this.makeTxn(),
            });
          }
        };
      }
      // trickle ICE の候補が届いた場合
      else if (data.janus === 'trickle' && data.candidate) {
        try {
          const candidate = new RTCIceCandidate(data.candidate);
          console.log('Adding remote ICE candidate:', candidate);
          await this.pc?.addIceCandidate(candidate);
        } catch (err) {
          console.error('Failed to add remote ICE candidate:', err);
        }
      }
    };

    this.ws.onerror = err => {
      console.error('WebSocket error:', err);
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  public disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
  }

  // ゲッター：最後に生成した SDP answer（jsep）を返す
  public getLastJsep(): any {
    return this.lastJsep;
  }

  // ゲッター：RTCPeerConnection を返す
  public getPC(): RTCPeerConnection | null {
    return this.pc;
  }
}
