<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = $_POST['username'];
    $pass = $_POST['password'];
    $email = $_POST['useremail'];
    $number = $_POST['number'];
    $date = $_POST['date'];

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

    $servername = "localhost";
    $username = "root";
    $password = "password";
    $dbname = "guvi";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $checkExistingAccountQuery = "SELECT * FROM auth WHERE useremail='$email'";
    $existingAccountResult = $conn->query($checkExistingAccountQuery);

    if ($existingAccountResult->num_rows == 1) {
        die(json_encode(array('status' => false, "msg" => "Account Exists with this email")));
    } else {
        $insertAccountQuery = "INSERT INTO auth (username, useremail, userpassword, usernumber, userdob) VALUES ('$user', '$email', '$pass', '$number', '$date')";
        $insertResult = $conn->query($insertAccountQuery);

        if ($insertResult) {
            die(json_encode(array('status' => true, "msg" => "Account Created")));
        } else {
            die(json_encode(array('status' => false, "msg" => "Something went wrong")));
        }
    }

    $conn->close();
}
?>
