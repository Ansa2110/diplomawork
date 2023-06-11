<?php
// Извлечение данных из формы
$first_name = $_POST['firstName'];
$last_name = $_POST['lastName'];
$age = $_POST['age'];
$team_name = $_POST['teamName'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$team_size = $_POST['teamSize'];
$team_members = $_POST['teamMembers'];
$startup_description = $_POST['startupDescription'];

// Отправка данных в базу данных
try {
    $connection = new PDO('pgsql:host=your_host;port=your_port;dbname=your_database_name', 'your_user', 'your_password');
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
    echo "Error: " . $e->getMessage();
}
