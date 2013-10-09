<?php

include ("connection.php");


$title = utf8_decode ($_POST['title']);
$body =  utf8_decode($_POST['body']);

$addNewsQuery ="INSERT INTO news(title, content) VALUES ('".$title."', '".$body."')";

mysql_query($addNewsQuery);
mysql_close($link);
?>