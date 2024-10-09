import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <LoginPage />
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/channels" element={<AddChannels />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:tgId" element={<UserPage />} />
            <Route path="/withdrawals" element={<Withdrawals />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/pars" element={<Pars />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
