// frontend/src/components/RoomDetail.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import VideoViewer from './VideoViewer';

const Container = styled.div`
  padding: 16px;
`;

interface Participant {
  id: number;
  display?: string;
  [key: string]: any;
}

const RoomDetail: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [selectedFeedIds, setSelectedFeedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        // Cookie に保存された JWT は axios.defaults.withCredentials = true により自動送信される
        const res = await axios.get(`/api/rooms/${roomId}/participants`);
        setParticipants(res.data.participants);
      } catch (err) {
        console.error('参加者取得エラー', err);
      }
    };
    if (roomId) fetchParticipants();
  }, [roomId]);

  const handleViewAll = () => {
    setSelectedFeedIds(participants.map(p => p.id));
  };

  const handleViewSingle = (feedId: number) => {
    setSelectedFeedIds([feedId]);
  };

  return (
    <Container>
      <h2>ルーム {roomId} の参加者一覧</h2>
      <button onClick={handleViewAll}>全参加カメラ映像を表示</button>
      <ul>
        {participants.map(p => (
          <li key={p.id}>
            {p.display || `カメラ ${p.id}`}
            <button onClick={() => handleViewSingle(p.id)}>映像を視聴</button>
          </li>
        ))}
      </ul>
      {selectedFeedIds.length > 0 && roomId && (
        <VideoViewer roomId={roomId} feedIds={selectedFeedIds} />
      )}
    </Container>
  );
};

export default RoomDetail;
