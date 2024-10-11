import React, { useEffect, useState } from 'react';
import styles from '../styles/Analytics.module.css'; // CSS-модуль для стилей

const Analytics = () => {
  const [data, setData] = useState([]); // Состояние для хранения данных аналитики

  // Функция для получения данных с бэкенда
  const fetchAnalyticsData = async () => {
    const token = localStorage.getItem('jwtToken'); // Получаем токен из localStorage
    try {
      const response = await fetch('http://172.19.0.3:8080/channels/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Добавляем токен в заголовки
        },
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json(); // Получаем данные в формате JSON

      // Преобразуем данные для отображения
      const transformedData = [
        { name: 'YouTube', value: data.youtube || '0' },
        { name: 'TikTok', value: data.tiktok || '0' },
        { name: 'Facebook', value: data.facebook || '0' },
        { name: 'Instagram', value: data.instagram || '0' },
        { name: 'Всего просмотров день', value: data.viewsToday || '0' },
        { name: 'Всего просмотров неделя', value: data.viewsWeek || '0' },
        { name: 'Всего просмотров месяц', value: data.viewsMonth || '0' },
        { name: 'Всего просмотров', value: data.total_views || '0' },
        { name: 'На выплату', value: data.total_withdraw || '0' },
      ];

      setData(transformedData); // Обновляем состояние с полученными данными
    } catch (error) {
      console.error('Ошибка при загрузке данных аналитики:', error);
    }
  };

  useEffect(() => {
    fetchAnalyticsData(); // Загружаем данные при монтировании компонента
  }, []);

  return (
    <div className={styles.analyticsContainer}>
      <h1>Аналитика</h1>
      <div className={styles.analyticsGrid}>
        {data.map((item, index) => (
          <div key={index} className={styles.analyticsCard}>
            <h3>{item.name}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
