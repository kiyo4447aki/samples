// src/Login.tsx
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './App';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      if (res.data && res.data.isAuthenticated) {
        setAuth({ username: res.data.username, isAuthenticated: true });
        navigate('/');
      } else {
        setError('ログインに失敗しました。');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('ログインに失敗しました。');
    }
  };

  return (
    <LoginContainer>
      <h2>ログイン</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>ユーザ名:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>パスワード:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">ログイン</button>
      </form>
    </LoginContainer>
  );
};

export default Login;
