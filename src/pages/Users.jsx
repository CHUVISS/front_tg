import React from 'react';
import styles from '../styles/Users.module.css'; // CSS-модуль для стилизации
import { Link } from 'react-router-dom';

const Users = () => {
  // Пример данных для отображения в таблице
  const usersData = [
    {
      id: 1,
      telegramUsername: '@user1',
      telegramLink: 'https://t.me/user1',
      channelsCount: 5,
      wallet: 'TRC20-wallet-address-1',
      referrals: 10,
      views: 10000,
      balance: 500,
    },
    {
      id: 2,
      telegramUsername: '@user2',
      telegramLink: 'https://t.me/user2',
      channelsCount: 3,
      wallet: 'TRC20-wallet-address-2',
      referrals: 7,
      views: 8500,
      balance: 300,
    },
    // Добавьте больше пользователей по необходимости
  ];

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
              <Link to={`/users/${user.id}`}>
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
