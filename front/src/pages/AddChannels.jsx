import React, { useState, useEffect } from 'react';
import styles from '../styles/AddChannels.module.css'; // CSS для стилизации

const AddChannels = () => {
  const [channels, setChannels] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // Принять или Отклонить
  const [selectedChannel, setSelectedChannel] = useState(null);

  // Функция для получения данных с бэкенда
  useEffect(() => {
    const fetchChannels = async () => {
      const token = localStorage.getItem('jwtToken'); // Получаем токен из localStorage
      try {
        const response = await fetch('http://172.19.0.3:8080/users/getAddChannels',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Добавляем токен в заголовки
          },
        });
        if (response.ok) {
          const data = await response.json();
          
          // Преобразуем данные от бэкенда в нужный формат
          const formattedData = data.map((channel, index) => ({
            id: index + 1,
            username: channel.Username,
            socialNetwork: channel.TypeChannel.charAt(0).toUpperCase() + channel.TypeChannel.slice(1), // Преобразуем, например, 'tiktok' -> 'TikTok'
            link: channel.Url, // Добавляем https, если не указано
          }));

          setChannels(formattedData);
        } else {
          console.error('Ошибка при получении каналов с бэкенда');
        }
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      }
    };

    fetchChannels();
  }, []);

  const openModal = (channel, action) => {
    setSelectedChannel(channel);
    setActionType(action);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedChannel(null);
  };

  const handleDecline = async () => {
    const channelId = selectedChannel.id;
    closeModal();
    setChannels((prevChannels) => prevChannels.filter((channel) => channel.id !== channelId));
  };

  const handleAccept = async () => {
    const channelId = selectedChannel.id;
    const usernameTg = selectedChannel.username;
    const linkSocial = selectedChannel.link;
    const token = localStorage.getItem('jwtToken');
    closeModal();

    try {
      const response = await fetch(`http://172.19.0.3:8080/users/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          url_channel: linkSocial,
          username: usernameTg, 
        }),
      });

      if (response.ok) {
        setChannels((prevChannels) => prevChannels.filter((channel) => channel.id !== channelId));
      } else {
        console.error('Ошибка при принятии канала.');
      }
    } catch (error) {
      console.error('Ошибка при принятии канала:', error);
    }
  };

  const confirmAction = () => {
    if (actionType === 'accept') {
      handleAccept();
    } else if (actionType === 'decline') {
      handleDecline();
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
            <th>Принять/Отклонить</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr key={channel.id}>
              <td>{channel.username}</td>
              <td>{channel.socialNetwork}</td>
              <td>
                <a href={channel.link} target="_blank" rel="noopener noreferrer">
                  {channel.link.split("/")[3]}
                </a>
              </td>
              <td>
                <button
                  className={styles.acceptButton}
                  onClick={() => openModal(channel, 'accept')}
                >
                  Принять
                </button>
                <button
                  className={styles.declineButton}
                  onClick={() => openModal(channel, 'decline')}
                >
                  Отклонить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Подтверждение действия</h2>
            <p>
              Вы уверены, что хотите {actionType === 'accept' ? 'принять' : 'отклонить'} {selectedChannel.username}?
            </p>
            <button className={styles.acceptButton} onClick={confirmAction}>Подтвердить</button>
            <button className={styles.declineButton} onClick={closeModal}>Отменить</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddChannels;
