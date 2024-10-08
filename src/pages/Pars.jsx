import React, { useState } from 'react';

const DropdownSearchPage = () => {
  // Состояние для выбранного пункта в выпадающем списке
  const [selectedOption, setSelectedOption] = useState('');
  // Состояние для значения поиска
  const [searchTerm, setSearchTerm] = useState('');

  // Данные для выпадающего списка
  const options = ['YouTube', 'TikTok', 'Instagram', 'Facebook'];
  //const users = [{telegramUsername: '@user1', telegramLink: 'https://t.me/user1',}, {telegramUsername: '@user2', telegramLink: 'https://t.me/user2'}]

  // Функция для обработки изменения выбора в выпадающем списке
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Функция для обработки изменений в поле поиска
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Фильтрация опций на основе значения поиска
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Парсинг</h1>

      {/* Выпадающий список */}
      <label htmlFor="dropdown">Выберите пункт:</label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        style={{ display: 'block', margin: '10px 0', padding: '10px' }}
      >
        <option value="">-- Select an option --</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Поле поиска */}
      <label htmlFor="search">Поиск:</label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Введите для поиска..."
        style={{ display: 'block', margin: '10px 0', padding: '10px' }}
      />

      {/* Вывод выбранного элемента */}
      {selectedOption && (
        <div style={{ marginTop: '20px' }}>
          <strong>Выбранный пункт:</strong> {selectedOption}
        </div>
      )}
      {/* Отображение результата поиска */}
      <ul>
        {filteredOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>

    </div>
  );
};

export default DropdownSearchPage;
