import React, { useState } from 'react';
import styles from '../styles/LoginPage.module.css'; // Подключение CSS стилей

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Вход выполнен успешно');
        // Логика перенаправления пользователя после успешного входа
        // Например, можно перенаправить на страницу с каналами
        window.location.href = '/channels'; 
      } else {
        setErrorMessage(data.message || 'Ошибка входа');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setErrorMessage('Произошла ошибка. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h1>Вход в систему</h1>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Имя пользователя:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        <button type="submit" className={styles.loginButton}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
