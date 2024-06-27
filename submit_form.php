<?php

$servername = "localhost"; 
$username = "username";     
$password = "password";   
$dbname = "radio_form";    


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $city = $_POST['city'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];


    $stmt = $conn->prepare("INSERT INTO messages (city, name, email, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $city, $name, $email, $message);


    if ($stmt->execute()) {
        echo "Данные успешно отправлены в базу данных.";
    } else {
        echo "Ошибка при отправке данных: " . $stmt->error;
    }

    
    $stmt->close();
}


$conn->close();
?>
    