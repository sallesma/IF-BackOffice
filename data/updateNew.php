<?php

include("connection.php");
$id = $_POST['id'];
$title = $_POST['title'];
$content = $_POST['content'];

$editNewsQuery ="UPDATE news SET title='".$title."', content='".$content."' WHERE id=".$id."";

mysql_query($editNewsQuery);
mysql_close($link);
?>