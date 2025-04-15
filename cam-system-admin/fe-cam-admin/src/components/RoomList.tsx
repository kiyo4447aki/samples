import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../App';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const Th = styled.th`
  text-align: left;
  padding: 8px;
  background: #f0f0f0;
`;
const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;
const Container = styled.div`
  padding: 16px;
`;

interface Room {
  room: number;
  description: string;
  num_participants: number;
  // その他必要なプロパティがあれば追加
}

function RoomList() {
  const { auth } = useContext(AuthContext);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // axios.defaults.withCredentials = true が有効になっている前提で Cookie 経由で送信
        const res = await axios.get('/api/rooms');
        if (Array.isArray(res.data)) {
          setRooms(res.data);
        } else if (res.data.error) {
          setError('エラーが発生しました: ' + res.data.error);
        } else {
          setError('予期しないレスポンス形式: ' + JSON.stringify(res.data));
        }
      } catch (err: any) {
        console.error('ルーム取得エラー', err);
        setError('ルーム情報の取得に失敗しました');
      }
    };
    fetchRooms();
  }, [auth]);

  if (error) {
    return (
      <Container>
        <p style={{ color: 'red' }}>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2>ルーム一覧</h2>
      <Table>
        <thead>
          <tr>
            <Th>ルーム名</Th>
            <Th>参加中カメラ数</Th>
            <Th>操作</Th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(room => (
            <tr key={room.room}>
              <Td>{room.description}</Td>
              <Td>{room.num_participants}</Td>
              <Td>
                <button onClick={() => navigate(`/rooms/${room.room}`)}>詳細を見る</button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default RoomList;
