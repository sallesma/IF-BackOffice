<?php

include ("connection.php");

$name = mysql_real_escape_string( $_POST['name'] );
$weblink = mysql_real_escape_string( $_POST['weblink'] );

$addPartnersQuery ="INSERT INTO partners(name, weblink) VALUES ('".$name."', '".$weblink."')";
echo $addPartnersQuery;
mysql_query($addPartnersQuery);
mysql_close($link);
?>