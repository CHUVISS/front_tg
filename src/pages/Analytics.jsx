import React from 'react';
import styles from '../styles/Analytics.module.css'; // CSS-модуль для стилей

const Analytics = () => {
  const data = [
    { name: 'YouTube', value: '50000000' },
    { name: 'TikTok', value: '50000000' },
    { name: 'Facebook', value: '50000000' },
    { name: 'Instagram', value: '50000000' },
    { name: 'Всего просмотров день', value: '50000000' },
    { name: 'Всего просмотров неделя', value: '50000000' },
    { name: 'Всего просмотров месяц', value: '50000000' },
    { name: 'На выплату', value: '50000000' },
  ];

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
