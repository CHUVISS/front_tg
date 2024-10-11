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
  const handleParsing = () => {
    alert(`Вы выбрали: ${selectedOption}, ввели: ${searchTerm}`);
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
        <button  onClick={handleParsing} style={{ padding: '10px 20px' }}>
          Парсинг
        </button>
      </div>
    </div>
  );
};

export default DropdownSearchPage;
