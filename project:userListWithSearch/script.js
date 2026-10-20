const API_URL = 'https://jsonplaceholder.typicode.com/users';
const userContainer = document.getElementById('user-container');
const searchInput = document.getElementById('search');

// Функция для получения данных пользователей
async function fetchUsers() {
  try {
    const response = await fetch(API_URL);
    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
    return [];
  }
}

// Функция для отображения списка пользователей
function displayUsers(users) {
  userContainer.innerHTML = ''; // Очищаем контейнер перед обновлением

  users.forEach(user => {
    // Создаем карточку пользователя
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');

    // Заполняем содержимое карточки
    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
    `;

    // Добавляем карточку в контейнер
    userContainer.appendChild(userCard);
  });
}

// Загружаем всех пользователей при загрузке страницы
fetchUsers().then(displayUsers);

// Обработчик события для поиска
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();

  fetchUsers().then(users => {
    // Фильтруем пользователей по имени
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(query)
    );
    displayUsers(filteredUsers); // Отображаем отфильтрованных пользователей
  });
});
