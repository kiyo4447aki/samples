// src/App.tsx
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';

export interface AuthContextType {
  username: string;
  isAuthenticated: boolean;
}

interface AuthContextValue {
  auth: AuthContextType;
  setAuth: React.Dispatch<React.SetStateAction<AuthContextType>>;
}

// 認証情報はバックエンドから Cookie によって管理されるので、withCredentials を有効にする
axios.defaults.withCredentials = true;

export const AuthContext = createContext<AuthContextValue>({
  auth: { username: '', isAuthenticated: false },
  setAuth: () => {},
});

const App: React.FC = () => {
  // 初期状態はまだ認証チェックしていないため null などで区別する方法もありますが、ここでは isAuthChecked フラグを使います。
  const [auth, setAuth] = useState<AuthContextType>({ username: '', isAuthenticated: false });
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // /api/auth/me を呼び出して、Cookie にセットされた JWT の有効性を確認
    axios
      .get('/api/auth/me')
      .then(res => {
        if (res.data && res.data.isAuthenticated) {
          setAuth({ username: res.data.username, isAuthenticated: true });
        } else {
          setAuth({ username: '', isAuthenticated: false });
        }
      })
      .catch(err => {
        console.error('Authentication check failed', err);
        setAuth({ username: '', isAuthenticated: false });
      })
      .finally(() => {
        setIsAuthChecked(true);
      });
  }, []);

  // 認証チェックが完了するまで、ロード中の表示を返す
  if (!isAuthChecked) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/*"
            element={auth.isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
