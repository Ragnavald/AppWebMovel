<?php
$server = "localhost";
$db = "clube";
$user = "root";
$password = "";
$con = new PDO("mysql:host=$server;dbname=$db",
$user,
$password,
array(PDO::MYSQL_ATTR_INIT_COMMAND =>"
SET NAMES utf8"));
?>