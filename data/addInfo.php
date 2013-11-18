<?php

include('connection.php');

$name = mysql_real_escape_string( $_POST['name'] );
$picture = $_POST['picture'];
$isCategory = $_POST['isCategory'];
$content = mysql_real_escape_string( $_POST['content'] );
$parent = $_POST['parent'];


$addInfoQuery ="INSERT INTO infos(name, picture, isCategory, content, parent)
				VALUES ('".$name."', '".$picture."', '".$isCategory."', '".$content."', '".$parent."')";
mysql_query($addInfoQuery);
mysql_close($link);
?>