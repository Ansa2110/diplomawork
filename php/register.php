<?php
$host = "127.0.0.1";
$dbname = "postgres";
$user = "postgres";
$password = "AnsaGGBET1!";

// Создаем соединение с базой данных
$conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


// Получаем данные из формы
$participantType = $_POST['participant-type'];
$firstName = $_POST['first-name'];
$lastName = $_POST['last-name'];
$age = $_POST['age'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$eventId = $_POST['event_id'];
$teamSize = $_POST['team-size'];
$teamMembers = [];

if ($participantType === 'startup') {
  for ($i = 1; $i <= $teamSize; $i++) {
    $teamMembers[] = [
      'first_name' => $_POST["team-member-$i-first-name"],
      'last_name' => $_POST["team-member-$i-last-name"],
      'phone' => $_POST["team-member-$i-phone"],
      'age' => $_POST["team-member-$i-age"],
      'email' => $_POST["team-member-$i-email"],
    ];
  }
}

// Вставляем данные в таблицу участников
$query = "INSERT INTO participants (participant_type, first_name, last_name, age, phone, email, event_id) VALUES (:participant_type, :first_name, :last_name, :age, :phone, :email, :event_id)";
$stmt = $conn->prepare($query);
$stmt->bindParam(':participant_type', $participantType);
$stmt->bindParam(':first_name', $firstName);
$stmt->bindParam(':last_name', $lastName);
$stmt->bindParam(':age', $age);
$stmt->bindParam(':phone', $phone);
$stmt->bindParam(':email', $email);
$stmt->bindParam(':event_id', $eventId);
$stmt->execute();

// Получаем ID последнего добавленного участника
$participantId = $conn->lastInsertId();

// Если тип участника - стартапер, вставляем данные членов команды
if ($participantType === 'startup') {
  foreach ($teamMembers as $member) {
    $query = "INSERT INTO team_members (participant_id, first_name, last_name, age, phone, email) VALUES (:participant_id, :first_name, :last_name, :age, :phone, :email)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':participant_id', $participantId);
    $stmt->bindParam(':first_name', $member['first_name']);
    $stmt->bindParam(':last_name', $member['last_name']);
    $stmt->bindParam(':age', $member['age']);
    $stmt->bindParam(':phone', $member['phone']);
    $stmt->bindParam(':email', $member['email']);
    $stmt->execute();
  }
}

if ($stmt->rowCount() > 0) {
    echo "You have successfully registered to the startup event";
} else {
    echo "Error: unable to register to the startup event";
}

$stmt = null;
$conn = null;
?>
