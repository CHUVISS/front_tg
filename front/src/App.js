import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Импортируем боковое меню
import AddChannels from './pages/AddChannels'; // Страница "Добавление каналов"
import Users from './pages/Users'; // Страница "Пользователи"
import Withdrawals from './pages/Withdrawals'; // Страница "Выводы"
import Analytics from './pages/Analytics'; // Страница "Аналитика"
import Pars from './pages/Pars'; //Страница "Парсинга"
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';

const App = () => {
  // Проверка наличия токена для определения, авторизован ли пользователь
  const isAuthenticated = !!localStorage.getItem('jwtToken');

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Routes>
          {/* Если не авторизован, редирект на страницу логина */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/channels" /> : <LoginPage />}
          />
        </Routes>
      </div>
      {isAuthenticated && (
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: 1, padding: '20px' }}>
            <Routes>
              <Route path="/channels" element={<AddChannels />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:username" element={<UserPage />} />
              <Route path="/withdrawals" element={<Withdrawals />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/pars" element={<Pars />} />
            </Routes>
          </div>
        </div>
      )}
      <Footer />
    </Router>
  );
};

export default App;
