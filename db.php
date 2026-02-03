<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "campus_db";

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else {
    $conn = new mysqli($host, $user, $pass, $dbname);
}
?>