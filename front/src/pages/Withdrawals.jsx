import React, { useEffect, useState } from 'react';
import styles from '../styles/Withdrawals.module.css'; // CSS-модуль для стилизации

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usersData, setUsersData] = useState([]);

  // Функция для получения данных с бэкенда и обновления состояния
  const fetchUsersData = async () => {
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch('http://172.19.0.3:8080/withdraw/all', {
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
  
      if (Array.isArray(data) && data.length > 0) {
        const transformedData = data.map((user, index) => ({
          id: index + 1,
          telegramUsername: `@${user.Username}`,
          usernameTg: user.Username,
          telegramLink: `https://t.me/@${user.Username}`,
          wallet: user.Wallet,
          amount: user.Amount,
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

  const confirmAction = async () => {
    const token = localStorage.getItem('jwtToken');
    
    try {
      let response;
      if (currentAction === 'send') {
        // Отправляем запрос на вывод средств
        response = await fetch(`http://172.19.0.3:8080/withdraw/confirm?username=${selectedUser.usernameTg}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      } else if (currentAction === 'reject') {
        // Отправляем запрос на отказ
        response = await fetch(`http://172.19.0.3:8080/withdraw/cancel?username=${selectedUser.usernameTg}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }


      setIsModalOpen(false); // Закрыть модальное окно после подтверждения
      fetchUsersData(); // Обновить данные пользователей после выполнения действия
    } catch (error) {
      console.error('Ошибка при выполнении действия:', error);
    }
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
              <td>{user.amount}</td>
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
            {currentAction === 'send' && (
              <p>
                Вы уверены, что хотите отправить запрос пользователю{' '}
                {selectedUser?.telegramUsername} на сумму {selectedUser?.amount}?
              </p>
            )}
            {currentAction === 'reject' && (
              <p>
                Вы уверены, что хотите отклонить запрос пользователя{' '}
                {selectedUser?.telegramUsername}?
              </p>
            )}
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
