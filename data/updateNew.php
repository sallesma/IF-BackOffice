<?php

include("connection.php");
$id = $_POST['id'];
$title = mysql_real_escape_string( $_POST['title'] );
$content = mysql_real_escape_string( $_POST['content'] );

$editNewsQuery ="UPDATE news SET title='".$title."', content='".$content."' WHERE id=".$id."";

mysql_query($editNewsQuery);
mysql_close($link);
?>