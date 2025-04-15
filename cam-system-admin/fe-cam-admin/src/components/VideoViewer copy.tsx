// frontend/src/components/VideoViewer.tsx
import Janus from 'janus-gateway';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const VideoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 8px;
  background-color: #222;
`;

const VideoTile = styled.video`
  flex: 1 1 300px;
  max-width: 45%;
  background: black;
  border: 2px solid #333;
`;

interface VideoViewerProps {
  roomId: string;
  feedIds: number[];
}

const VideoViewer: React.FC<VideoViewerProps> = ({ roomId, feedIds }) => {
  const videoElementsRef = useRef<HTMLVideoElement[]>([]);
  const janusRef = useRef<Janus | null>(null);
  // feedId ごとのプラグインハンドルを管理
  const pluginHandlesRef = useRef<{ [feedId: number]: any }>({});

  useEffect(() => {
    // Janus の初期化。最初に adapter などがグローバルに読み込まれていることを前提とします。
    Janus.init({
      debug: false,
      callback: () => {
        janusRef.current = new Janus({
          server: 'ws://backend.skypics.jp:8188/', // JanusサーバーのURL。必要に応じて変更してください
          success: () => {
            // すべての feedId に対して購読処理を開始
            feedIds.forEach((feedId, index) => {
              subscribeToFeed(feedId, index);
            });
          },
          error: (err: any) => {
            console.error('Janus 接続エラー:', err);
          },
        });
      },
    });

    return () => {
      // コンポーネントアンマウント時に各プラグインハンドルの detach を試行
      Object.values(pluginHandlesRef.current).forEach(handle => {
        try {
          handle.detach();
        } catch (err) {
          console.error('プラグインハンドルの detach エラー:', err);
        }
      });
      if (janusRef.current) {
        janusRef.current.destroy({
          success: () => {
            console.log('Janus セッションが正常に破棄されました');
          },
          error: (err: any) => {
            console.error('Janus セッションの破棄エラー:', err);
          },
        });
      }
    };
  }, [feedIds]);

  // join メッセージ送信も含めた購読処理の関数
  const subscribeToFeed = (feedId: number, index: number) => {
    if (!janusRef.current) return;
    janusRef.current.attach({
      plugin: 'janus.plugin.videoroom',
      opaqueId: 'viewer-' + Janus.randomString(8),
      success: (pluginHandle: any) => {
        // プラグインハンドルを変数にキャプチャし、後でクリーンアップできるよう保存
        const handle = pluginHandle;
        pluginHandlesRef.current[feedId] = handle;

        // 受信設定が既にないか確認し、なければ追加する
        if (handle.webrtcStuff && handle.webrtcStuff.pc) {
          // audio, video 共に受信方向のみで追加
          handle.webrtcStuff.pc.addTransceiver('audio', { direction: 'recvonly' });
          handle.webrtcStuff.pc.addTransceiver('video', { direction: 'recvonly' });
        }

        // onmessage でサーバーからの応答（例えば SDP offer）を処理
        handle.onmessage = (msg: any, jsep: any) => {
          console.log('Received message:', msg, jsep);
          //if (msg.videoroom === 'attached' && jsep) {
          // Janus から送られてきた SDP offer に対して SDP answer を生成し、start リクエストを送信
          handle.createAnswer(
            { jsep: jsep, media: { audioSend: false, videoSend: false, data: false } },
            {
              success: (jsepAnswer: any) => {
                const body = { request: 'start', room: parseInt(roomId, 10) };
                console.log('Sending SDP answer:', jsepAnswer, body);
                handle.send({
                  message: body,
                  jsep: jsepAnswer,
                  transaction: Janus.randomString(12),
                });
              },
              error: (err: any) => {
                console.error('SDP生成エラー:', err);
              },
            },
          );
          //}
        };

        // attach 成功後、明示的に join メッセージを送る
        handle.send({
          message: {
            request: 'join',
            room: parseInt(roomId, 10),
            ptype: 'subscriber',
            feed: feedId,
          },
          transaction: Janus.randomString(12),
        });
      },
      // onremotrack を利用して、リモートトラック受信時に映像を表示する
      onremotetrack: (track: MediaStreamTrack, mid: string, on: boolean) => {
        if (on && track.kind === 'video') {
          // 新しい MediaStream を生成してトラックを追加
          const stream = new MediaStream();
          stream.addTrack(track);
          if (videoElementsRef.current[index]) {
            Janus.attachMediaStream(videoElementsRef.current[index], stream);
          }
        }
      },
      oncleanup: function () {
        console.log('Feed', feedId, 'のクリーンアップ');
      },
      error: function (err: any) {
        console.error('プラグインエラー:', err);
      },
    });
  };

  return (
    <VideoGrid>
      {feedIds.map((feedId, idx) => (
        <VideoTile
          key={feedId}
          ref={el => {
            if (el) videoElementsRef.current[idx] = el;
          }}
          autoPlay
          muted
          playsInline
        />
      ))}
    </VideoGrid>
  );
};

export default VideoViewer;
