<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    if (isset($_POST['profile'])) {
        handleProfileRequest($_POST['email']);
    }

    if (isset($_POST['update'])) {
        handleUpdateRequest($_POST['id'], $_POST['name'], $_POST['number'], $_POST['email'], $_POST['dob']);
    }
}

function handleProfileRequest($email)
{
    $servername = "localhost";
    $username = "root";
    $password = "password";
    $dbname = "guvi";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT useremail, username, userdob, usernumber, userid FROM auth WHERE useremail='$email'";
    $result = $conn->query($sql);

    while ($row = $result->fetch_assoc()) {
        die(json_encode(array("email" => $row["useremail"], "number" => $row["usernumber"], "dob" => $row["userdob"], "name" => $row["username"], "id" => $row["userid"])));
    }

    $conn->close();
}

function handleUpdateRequest($id, $name, $number, $email, $dob)
{
    $servername = "guvi.cvvq0uavgzap.eu-north-1.rds.amazonaws.com";
    $username = "admin";
    $password = "administrator";
    $dbname = "guvi";

    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "UPDATE auth SET useremail='$email', usernumber='$number', username='$name', userdob='$dob' WHERE userid='$id'";
    $result = $conn->query($sql);

    if ($result) {
        die(json_encode(array("status" => true)));
    } else {
        die(json_encode(array("status" => false)));
    }

    $conn->close();
}

?>
