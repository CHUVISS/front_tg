import React from 'react';
import styles from '../styles/Withdrawals.module.css'; // CSS-модуль для стилизации

const Users = () => {
  // Пример данных для отображения в таблице
  const usersData = [
    {
      id: 1,
      telegramUsername: '@user1',
      telegramLink: 'https://t.me/user1',
      balance: 500,
      wallet: 'TRC20-wallet-address-1',
    },
    {
      id: 2,
      telegramUsername: '@user2',
      telegramLink: 'https://t.me/user2',
      balance: 300,
      wallet: 'TRC20-wallet-address-2',
    },
    // Добавьте больше пользователей по необходимости
  ];

  const handleSendClick = (username) => {
    // Логика отправки
    alert(`Отправлено пользователю ${username}`);
  };

  return (
    <div className={styles.usersContainer}>
      <h1>Выводы</h1>
      <table className={styles.usersTable}>
        <thead>
          <tr>
            <th>Телеграм</th>
            <th>Баланс</th>
            <th>Кошелек</th>
            <th>Отправил</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              <td>
                <a href={user.telegramLink} target="_blank" rel="noopener noreferrer">
              {user.telegramUsername}</a>
              </td>
              <td>{user.balance}</td>
              <td>{user.wallet}</td>
              <td>
                <button onClick={() => handleSendClick(user.telegramUsername)}>
                  Отправил
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
