import React, { useEffect, useState } from 'react';
import styles from '../styles/Analytics.module.css'; // CSS-модуль для стилей

const Analytics = () => {
  const [data, setData] = useState([]); // Состояние для хранения данных аналитики

    const convertToShortNum =
        (labelValue) => {
            return Math.abs(Number(labelValue)) >= 1.0e+9

                ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " млрд."
                // Six Zeroes for Millions
                : Math.abs(Number(labelValue)) >= 1.0e+6

                    ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " млн."
                    // Three Zeroes for Thousands
                    : Math.abs(Number(labelValue)) >= 1.0e+3

                        ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " тыс."

                        : Math.abs(Number(labelValue));
        }

    // Функция для получения данных с бэкенда
    const fetchAnalyticsData = async () => {
        const token = localStorage.getItem('jwtToken'); // Получаем токен из localStorage
        try {
            const response = await fetch('http://localhost:8080/channels/all', {
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
            console.log('Данные просмотров:', data);

            // Преобразуем данные для отображения
            const transformedData = [
                {name: 'YouTube', value: convertToShortNum(data.youtube) || '0'},
                {name: 'TikTok', value: convertToShortNum(data.tiktok) || '0'},
                {name: 'Facebook', value: convertToShortNum(data.facebook) || '0'},
                {name: 'Instagram', value: convertToShortNum(data.instagram) || '0'},
                {name: 'Всего просмотров день', value: convertToShortNum(data.day_views) || '0'},
                {name: 'Всего просмотров неделя', value: convertToShortNum(data.week_views) || '0'},
                {name: 'Всего просмотров месяц', value: convertToShortNum(data.month_views) || '0'},
                {name: 'Всего просмотров', value: convertToShortNum(data.total_views) || '0'},
                {name: 'На выплату', value: data.total_withdraw || '0'},
                {name: 'Выплаченно', value: data.total_withdraw_accept || '0'},
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
