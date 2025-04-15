// src/Dashboard.tsx
import axios from 'axios';
import React, { useContext } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './App';
import RoomDetail from './components/RoomDetail';
import RoomList from './components/RoomList';

const Header = styled.header`
  padding: 16px;
  background: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAuth({ username: '', isAuthenticated: false });
      navigate('/login');
    }
  };

  return (
    <div>
      <Header>
        <h1>防犯カメラ管理システム</h1>
        <nav>
          <Link to="/" style={{ color: '#fff', marginRight: '16px' }}>
            ルーム一覧
          </Link>
          <button onClick={handleLogout}>ログアウト</button>
        </nav>
      </Header>
      <Routes>
        <Route path="/" element={<RoomList />} />
        <Route path="/rooms/:roomId" element={<RoomDetail />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
