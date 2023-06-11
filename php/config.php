<?php
$servername = "localhost";
$username = "postgres";
$password = "Ansar16112002";
$dbname = "postgres";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>
