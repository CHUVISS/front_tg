import React, { useState } from 'react';
import styles from '../styles/Withdrawals.module.css'; // CSS-модуль для стилизации

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleSendClick = (user) => {
    setSelectedUser(user);
    setCurrentAction('send');
    setIsModalOpen(true);
  };

  const handleRejectClick = (user) => {
    setSelectedUser(user);
    setCurrentAction('reject');
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    setIsModalOpen(false); // Закрыть модальное окно после подтверждения
  };

  const cancelAction = () => {
    setIsModalOpen(false); // Закрыть модальное окно без действия
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
            <th>Отправить вывод</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              <td>
                <a href={user.telegramLink} target="_blank" rel="noopener noreferrer">
                  {user.telegramUsername}
                </a>
              </td>
              <td>{user.balance}</td>
              <td>{user.wallet}</td>
              <td>
                <button className={styles.acceptButton} onClick={() => handleSendClick(user)}>
                  Отправить
                </button>
                <button className={styles.declineButton} onClick={() => handleRejectClick(user)} style={{ marginLeft: '10px' }}>
                  Отклонить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Модальное окно для подтверждения */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Подтверждение действия</h2>
            <p>
              Вы уверены, что хотите {currentAction === 'send' ? 'отправить' : 'отклонить'} запрос пользователя{' '}
              {selectedUser?.telegramUsername}?
            </p>
            <div className={styles.modalActions}>
              <button className={styles.acceptButton} onClick={confirmAction}>Подтвердить</button>
              <button className={styles.declineButton} onClick={cancelAction} style={{ marginLeft: '10px' }}>
                Отменить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
