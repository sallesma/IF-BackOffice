<?php

include ("connection.php");


$title = $_POST['title'];
$body = $_POST['body'];

$addNewsQuery ="INSERT INTO news(title, content) VALUES ('".$title."', '".$body."')";

mysql_query($addNewsQuery);
mysql_close($link);
?>