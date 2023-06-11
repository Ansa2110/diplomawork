document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение отправки формы

    const emailInput = document.getElementById('exampleInputEmail1');
    const email = emailInput.value;

    // Создаем объект FormData для отправки данных формы
    const formData = new FormData();
    formData.append('email', email);

    // Отправляем запрос на сервер
    fetch('php/subscribe.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(result => {
      alert(result); // Выводим сообщение с результатом
      emailInput.value = ''; // Очищаем поле ввода email
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  });
