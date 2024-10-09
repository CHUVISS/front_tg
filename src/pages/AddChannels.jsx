import React, { useState } from 'react';
import styles from '../styles/AddChannels.module.css'; // CSS для стилизации

const AddChannels = () => {
  const [channels, setChannels] = useState([
    {
      id: 1,
      username: '@user1',
      socialNetwork: 'YouTube',
      link: 'https://www.youtube.com/user1',
    },
    {
      id: 2,
      username: '@user2',
      socialNetwork: 'Instagram',
      link: 'https://www.instagram.com/user2',
    },
    {
      id: 3,
      username: '@user3',
      socialNetwork: 'TikTok',
      link: 'https://www.tiktok.com/@user3',
    },
  ]);

  const handleDecline = async (channelId, username) => {
    const isConfirmed = window.confirm(`Вы уверены, что хотите отклонить ${username}?`);

    if (isConfirmed) {
      try {
        // Пример запроса удаления через POST
        const response = await fetch(`/api/channels/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: channelId }),
        });

        if (response.ok) {
          setChannels(channels.filter((channel) => channel.id !== channelId));
          alert(`${username} был удалён из базы данных.`);
        } else {
          alert('Ошибка при удалении канала. Проверьте сервер.');
        }
      } catch (error) {
        console.error('Ошибка при удалении канала:', error);
        alert('Произошла ошибка при попытке удаления.');
      }
    }
  };

  const handleAccept = async (channelId, username, linkSocial, socialNetwork) => {
    const isConfirmed = window.confirm(`Вы уверены, что хотите принять ${username}?`);
  
    if (isConfirmed) {
      try {
        // Пример запроса для принятия канала через POST
        const response = await fetch(`http://localhost:8080/users/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            social_link: linkSocial,       // Пример: "https://social.com/user"
            tgId: username,                // Пример: "user123"
            wallet: "TRC20",               // Пример: "TRC20"
            social_name: socialNetwork,    // Пример: "Instagram"
            count_views: 0                 // Пример: 0
          }),
        });
  
        if (response.ok) {
          // Логика обновления состояния после принятия (например, убираем канал из списка)
          setChannels(channels.filter((channel) => channel.id !== channelId));
          alert(`${username} был принят.`);
        } else {
          alert('Ошибка при принятии канала. Проверьте сервер.');
        }
      } catch (error) {
        console.error('Ошибка при принятии канала:', error);
        alert('Произошла ошибка при попытке принятия.');
      }
    }
  };
  

  return (
    <div className={styles.channelsContainer}>
      <h1>Добавление каналов</h1>
      <table className={styles.channelsTable}>
        <thead>
          <tr>
            <th>Телеграм</th>
            <th>Соц. сеть</th>
            <th>Ссылка</th>
            <th>Отклонить</th>
            <th>Принять</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr key={channel.id}>
              <td>{channel.username}</td>
              <td>{channel.socialNetwork}</td>
              <td>
                <a href={channel.link} target="_blank" rel="noopener noreferrer">
                  Открыть
                </a>
              </td>
              <td>
                <button
                  className={styles.declineButton}
                  onClick={() => handleDecline(channel.id, channel.username)}
                >
                  Отклонить
                </button>
              </td>
              <td>
                <button
                  className={styles.acceptButton}
                  onClick={() => handleAccept(channel.id, channel.username, channel.link, channel.socialNetwork)}
                >
                  Принять
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddChannels;
