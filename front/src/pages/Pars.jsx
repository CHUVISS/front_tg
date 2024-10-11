import React, { useState } from 'react';

const DropdownSearchPage = () => {
  // Состояние для выбранного пункта в выпадающем списке
  const [selectedOption, setSelectedOption] = useState('');
  // Состояние для значения поиска
  const [searchTerm, setSearchTerm] = useState('');

  // Данные для выпадающего списка
  const options = ['YouTube', 'TikTok', 'Instagram', 'Facebook'];

  // Функция для обработки изменения выбора в выпадающем списке
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Функция для обработки изменений в поле поиска
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Функция для обработки нажатия на кнопку "Парсинг"
  const handleParsing = async () => {
    if (!selectedOption || !searchTerm) {
      alert('Пожалуйста, выберите тип канала и введите URL канала.');
      return;
    }

    // Данные, которые будут отправлены на сервер
    const requestData = {
      url: searchTerm,
      type_channel: selectedOption.toLowerCase(),
    };
    const token = localStorage.getItem('jwtToken');
    try {
      const response = await fetch('http://172.19.0.3:8080/parsing/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestData), // Преобразуем данные в JSON
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      await response.json(); // Получаем ответ от сервера
      alert(`Вы выбрали: ${selectedOption}, ввели: ${searchTerm}`);// Уведомление об успехе
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      alert('Ошибка при отправке данных на сервер.'); // Уведомление об ошибке
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Парсинг</h1>

      {/* Контейнер для выпадающего списка и поля поиска */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Выпадающий список */}
        <label htmlFor="dropdown">Выберите пункт:</label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={handleSelectChange}
          style={{ padding: '10px' }}
        >
          <option value="">-- Select an option --</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        
        {/* Поле поиска */}
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Введите для парсинга..."
          style={{ padding: '10px', flex: 1 }}
        />

        {/* Кнопка Парсинг */}
        <button onClick={handleParsing} style={{ padding: '10px 20px' }}>
          Парсинг
        </button>
      </div>
    </div>
  );
};

export default DropdownSearchPage;
