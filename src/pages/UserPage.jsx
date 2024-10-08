import React, { useState } from 'react';
import styles from '../styles/UserPage.module.css';

const UserPage = () => {
  const [activeTab, setActiveTab] = useState('youtube'); // По умолчанию выбрана вкладка YouTube

  // Пример данных о пользователе и его каналах
  const user = {
    username: '@user1',
    telegramLink: 'https://t.me/user1',
    wallet: 'TRC20: ABC1234567890',
    channelsCount: 5,
    referrals: 10,
    balance: 500,
    channels: [
      { platform: 'YouTube', link: 'https://youtube.com/user1', viewsTotal: 1000, viewsWeek: 200, viewsDay: 50 },
      { platform: 'TikTok', link: 'https://tiktok.com/@user1', viewsTotal: 5000, viewsWeek: 800, viewsDay: 100 },
      { platform: 'Instagram', link: 'https://instagram.com/user1', viewsTotal: 3000, viewsWeek: 600, viewsDay: 75 },
      { platform: 'Facebook', link: 'https://facebook.com/user1', viewsTotal: 2000, viewsWeek: 400, viewsDay: 20 }
    ]
  };

  // Функция для смены активной вкладки
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.userContainer}>
      <h1>Пользователь:<a href={user.telegramLink} target="_blank" rel="noopener noreferrer">{user.username}</a></h1>
      <div className={styles.userInfo}>
        <p>Кошелек: {user.wallet}</p>
        <p>Каналы: {user.channelsCount}</p>
        <p>Рефералы: {user.referrals}</p>
        <p>Баланс: {user.balance}</p>
      </div>
      
      {/* Панель с кнопками для переключения между контентом */}
      <div className={styles.tabs}>
        <button className={activeTab === 'youtube' ? styles.activeTab : ''} onClick={() => handleTabChange('youtube')}>YouTube</button>
        <button className={activeTab === 'tiktok' ? styles.activeTab : ''} onClick={() => handleTabChange('tiktok')}>TikTok</button>
        <button className={activeTab === 'instagram' ? styles.activeTab : ''} onClick={() => handleTabChange('instagram')}>Instagram</button>
        <button className={activeTab === 'facebook' ? styles.activeTab : ''} onClick={() => handleTabChange('facebook')}>Facebook</button>
      </div>

      {/* Таблица с данными канала, фильтруем по активной вкладке */}
      <table className={styles.channelsTable}>
        <thead>
          <tr>
            <th>Ссылка на канал</th>
            <th>Просмотры всего</th>
            <th>Просмотры недели</th>
            <th>Просмотры дня</th>
          </tr>
        </thead>
        <tbody>
          {user.channels
            .filter((channel) => channel.platform.toLowerCase() === activeTab)
            .map((channel, index) => (
              <tr key={index}>
                <td>
                  <a href={channel.link} target="_blank" rel="noopener noreferrer">
                    Открыть канал
                  </a>
                </td>
                <td>{channel.viewsTotal}</td>
                <td>{channel.viewsWeek}</td>
                <td>{channel.viewsDay}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
