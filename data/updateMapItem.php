<?php

include("connection.php");
$id = $_POST['id'];
$label = mysql_real_escape_string( $_POST['label'] );
$x = $_POST['x'];
$y = $_POST['y'];
$infoId = $_POST['infoId'];

$editMapItemQuery ="UPDATE map SET label='".$label."', x='".$x."', y='".$y."', infoId='".$infoId."' WHERE id=".$id."";

mysql_query($editMapItemQuery);
mysql_close($link);
?>