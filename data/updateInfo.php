<?php

include("connection.php");

$id = $_POST['id'];
$name = mysql_real_escape_string( $_POST['name'] );
$picture = $_POST['picture'];
$isCategory = $_POST['isCategory'];
$content = mysql_real_escape_string( $_POST['content'] );
$parentId = $_POST['parentId'];

$editInfoQuery ="UPDATE infos SET name='".$name."', picture='".$picture."', isCategory='".$isCategory."', parent='".$parentId."', content='".$content."' WHERE id=".$id;

mysql_query($editInfoQuery);
mysql_close($link);
?>