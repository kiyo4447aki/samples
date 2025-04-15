import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { JanusSignalingClient, JanusSignalingOptions } from '../lib/JanusSignalingClient';
import FeedInfo from './FeedInfo';

const VideoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 8px;
  background-color: #222;
  justify-content: center;
`;

const VideoTileContainer = styled.div`
  flex: 1 1 300px;
  max-width: 45%;
  background: black;
  border: 2px solid #333;
  position: relative;

  /* レスポンシブ対応：画面幅が768px未満の場合は1列レイアウトに */
  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

const VideoTile = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

interface VideoViewerProps {
  roomId: string;
  feedIds: number[];
}

interface ClientWithFeed {
  feedId: number;
  client: JanusSignalingClient;
}

const VideoViewer: React.FC<VideoViewerProps> = ({ roomId, feedIds }) => {
  const videoElementsRef = useRef<HTMLVideoElement[]>([]);
  const [clients, setClients] = useState<ClientWithFeed[]>([]);

  useEffect(() => {
    const createdClients: ClientWithFeed[] = feedIds.map(feedId => {
      const options: JanusSignalingOptions = {
        roomId: Number(roomId),
        feedId: feedId,
        onRemoteStream: (stream: MediaStream) => {
          const idx = feedIds.indexOf(feedId);
          if (videoElementsRef.current[idx]) {
            videoElementsRef.current[idx].srcObject = stream;
          }
        },
      };
      const client = new JanusSignalingClient(options);
      client.connect();
      return { feedId, client };
    });
    setClients(createdClients);
    return () => {
      createdClients.forEach(({ client }) => client.disconnect());
      setClients([]);
    };
  }, [roomId, feedIds]);

  return (
    <VideoGrid>
      {feedIds.map((feedId, idx) => (
        <VideoTileContainer key={feedId}>
          <VideoTile
            ref={el => {
              if (el) videoElementsRef.current[idx] = el;
            }}
            autoPlay
            muted
            playsInline
          />
          {/* 個別視聴の場合のみ詳細情報を表示（feedIds が 1 の場合） */}
          {feedIds.length === 1 && clients.find(c => c.feedId === feedId) && (
            <FeedInfo client={clients.find(c => c.feedId === feedId)!.client} />
          )}
        </VideoTileContainer>
      ))}
    </VideoGrid>
  );
};

export default VideoViewer;
