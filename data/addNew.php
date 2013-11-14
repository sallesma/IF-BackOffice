<?php

include ("connection.php");


$title = mysql_real_escape_string( $_POST['title'] );
$body = mysql_real_escape_string( $_POST['body'] );

$addNewsQuery ="INSERT INTO news(title, content) VALUES ('".$title."', '".$body."')";
echo $addNewsQuery;
mysql_query($addNewsQuery);
mysql_close($link);
?>