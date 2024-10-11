import React, { useState } from 'react';
import styles from '../styles/LoginPage.module.css'; // Подключение CSS стилей

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password_admin, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://172.19.0.3:8080/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: username,
          password: password_admin,
        }),
      });

      const data = await response.json();
      console.log('Данные пользователя:', data);

       // Проверяем, что message похож на JWT токен
       const isJwtToken = data.message && /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/.test(data.message);

       if (isJwtToken) {
         localStorage.setItem('jwtToken', data.message);
         console.log('JWT токен сохранен в localStorage');
       } else {
         console.error('JWT токен не найден в ответе или токен некорректный');
       }

      if (response.ok) {
        alert('Вход выполнен успешно');
        // Логика перенаправления пользователя после успешного входа
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
            value={password_admin}
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
