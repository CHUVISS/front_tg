import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Импортируем useParams
import styles from '../styles/UserPage.module.css';

const UserPage = () => {
  const { tgId } = useParams(); // Извлекаем tgId из URL
  const [user, setUser] = useState(null); // Состояние для данных о пользователе
  const [activeTab, setActiveTab] = useState('youtube'); // По умолчанию выбрана вкладка YouTube

  // Функция для получения данных о пользователе
  const fetchUserData = async (tgId) => {
    try {
      const response = await fetch(`http://localhost:8080/users?tgID=${tgId}`);
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      
      // Логируем формат данных, которые приходят с бэкенда
      console.log('Данные пользователя:', data);

      // Преобразование данных для удобства работы
      const transformedUser = {
        username: `${data.TgId}`, // Форматируем имя пользователя
        telegramLink: `https://t.me/${data.TgId}`,
        wallet: data.Wallet,
        channelsCount: data.Channels, // Используем channels из ответа
        referrals: data.Referrals,
        balance: data.Balance,
        channels: [] // Здесь мы оставим пустой массив, если не передаются данные о каналах
      };



      setUser(transformedUser); // Устанавливаем данные о пользователе
    } catch (error) {
      console.error('Ошибка при загрузке данных пользователя:', error);
    }
  };

  useEffect(() => {
    fetchUserData(tgId); // Загружаем данные пользователя при монтировании компонента
  }, [tgId]);

  // Функция для смены активной вкладки
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Если данные пользователя еще не загружены
  if (!user) {
    return <p>Загрузка...</p>; // Отображаем текст загрузки
  }

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
