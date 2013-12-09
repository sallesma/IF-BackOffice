<?php

include ("connection.php");

$label = mysql_real_escape_string( $_POST['label'] );
$x = $_POST['x'];
$y = $_POST['y'];
$infoId = $_POST['infoId'];

$addMapItemsQuery ="INSERT INTO map (label, x, y, infoId) VALUES ('".$label."', '".$x."', '".$y."', '".$infoId."')";
echo $addMapItemsQuery;
mysql_query($addMapItemsQuery);
mysql_close($link);
?>