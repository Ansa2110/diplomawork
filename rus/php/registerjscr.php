<?php
// Извлечение данных из формы
$first_name = $_POST['name'];
$last_name = $_POST['lastname'];
$age = $_POST['age'];
$team_name = $_POST['team'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$team_size = $_POST['teamSize'];
$team_members = $_POST['teamMembers'];
$startup_description = $_POST['desc'];


$servername = "127.0.0.1";
$username = "postgres";
$password = "Ansar16112002";
$dbname = "postgres";
// Отправка данных в базу данных
try {
    $connection = new PDO("pgsql:host=$servername;dbname=$dbname", $username, $password);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "INSERT INTO jsc_event (first_name, last_name, age, team_name, phone, email, team_size, team_members, startup_description)
              VALUES (:first_name, :last_name, :age, :team_name, :phone, :email, :team_size, :team_members, :startup_description)";

    $statement = $connection->prepare($query);
    $statement->bindParam(':first_name', $first_name);
    $statement->bindParam(':last_name', $last_name);
    $statement->bindParam(':age', $age, PDO::PARAM_INT);
    $statement->bindParam(':team_name', $team_name);
    $statement->bindParam(':phone', $phone);
    $statement->bindParam(':email', $email);
    $statement->bindParam(':team_size', $team_size, PDO::PARAM_INT);
    $statement->bindParam(':team_members', $team_members);
    $statement->bindParam(':startup_description', $startup_description);

    $statement->execute();

    echo "Success";
} catch (PDOException $e) {
    http_response_code(500);
    echo "Error: " . $e->getMessage();
    file_put_contents("error_log.txt", $e->getMessage(), FILE_APPEND); // Записываем ошибку в файл error_log.txt
}
