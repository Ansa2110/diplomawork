<?php
// Укажите данные для подключения к базе данных
$servername = "127.0.0.1";
$username = "postgres";
$password = "Ansar16112002";
$dbname = "postgres";

// Создаем подключение к базе данных
$conn = new PDO("pgsql:host=$servername;dbname=$dbname", $username, $password);

// Устанавливаем атрибуты PDO
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Получаем email из запроса
$email = $_POST['email'];

// Проверяем, что email валидный
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format";
    exit;
}

// Подготавливаем запрос на добавление email в базу данных
$sql = "INSERT INTO newsletter (email) VALUES (:email)";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':email', $email);

// Выполняем запрос и выводим результат
if ($stmt->execute()) {
    echo "You have successfully subscribed to the newsletter!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Закрываем соединение с базой данных
$stmt = null;
$conn = null;
?>
