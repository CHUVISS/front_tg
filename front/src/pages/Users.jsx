import React, { useEffect, useState } from 'react';
import styles from '../styles/Users.module.css'; // CSS-модуль для стилизации
import { Link } from 'react-router-dom';

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  

  // Функция для получения данных с бэкенда и обновления состояния
  const fetchUsersData = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch('http://172.19.0.3:8080/users/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      const data = await response.json();
      console.log('Данные просмотров:', data);
  
      if (Array.isArray(data) && data.length > 0) {
        const transformedData = data.map((user, index) => ({
          id: index + 1,
          telegramUsername: `@${user.Username}`,
          usernameTg: user.Username,
          telegramLink: `https://t.me/@${user.Username}`,
          channelsCount: user.Channels,
          wallet: user.Wallet,
          referrals: user.Referrals,
          views: user.CountViews,
          balance: user.Balance,
        }));
        setUsersData(transformedData);
      } else {
        console.log('Данные пользователей пустые или не являются массивом');
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных пользователей:', error);
    }
  };
  

  useEffect(() => {
    fetchUsersData(); // Загружаем данные при монтировании компонента
  }, []);

  return (
    <div className={styles.usersContainer}>
      <h1>Пользователи</h1>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>Телеграм</th>
            <th>Каналов</th>
            <th>Кошелек</th>
            <th>Рефералов</th>
            <th>Просмотров</th>
            <th>Баланс</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.usernameTg}`}>
                  <button>{user.telegramUsername}</button>
                </Link>
              </td>
              <td>{user.channelsCount}</td>
              <td>{user.wallet}</td>
              <td>{user.referrals}</td>
              <td>{user.views}</td>
              <td>{user.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
