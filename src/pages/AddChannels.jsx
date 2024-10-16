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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState(''); // Принять или Отклонить
  const [selectedChannel, setSelectedChannel] = useState(null);

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

    try {
      const response = await fetch(`/api/channels/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: channelId }),
      });

      if (response.ok) {
        setChannels(channels.filter((channel) => channel.id !== channelId));
        // Убрали alert
      } else {
        console.error('Ошибка при удалении канала.');
      }
    } catch (error) {
      console.error('Ошибка при удалении канала:', error);
    }
  };

  const handleAccept = async () => {
    const channelId = selectedChannel.id;
    const username = selectedChannel.username;
    const linkSocial = selectedChannel.link;
    const socialNetwork = selectedChannel.socialNetwork;
    closeModal();

    try {
      const response = await fetch(`http://localhost:8080/users/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          social_link: linkSocial,
          tgId: username,
          wallet: 'TRC20',
          social_name: socialNetwork,
          count_views: 0,
        }),
      });

      if (response.ok) {
        setChannels(channels.filter((channel) => channel.id !== channelId));
        // Убрали alert
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
                  Открыть
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
