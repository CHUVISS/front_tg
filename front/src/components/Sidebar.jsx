import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import styles from '../styles/Sidebar.module.css' // Используем CSS модули

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Link to="/channels" className={styles.sidebarButton}>
        Добавление каналов
      </Link>
      <Link to="/users" className={styles.sidebarButton}>
        Пользователи
      </Link>
      <Link to="/withdrawals" className={styles.sidebarButton}>
        Выводы
      </Link>
      <Link to="/analytics" className={styles.sidebarButton}>
        Аналитика
      </Link>
      <Link to="/pars" className={styles.sidebarButton}>
        Парсинг
      </Link>
    </div>
  );
};

export default Sidebar;
