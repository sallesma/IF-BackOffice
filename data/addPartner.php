<?php

include ("connection.php");

$name = mysql_real_escape_string( $_POST['name'] );
$website = mysql_real_escape_string( $_POST['website'] );

$addPartnersQuery ="INSERT INTO partners(name, website) VALUES ('".$name."', '".$website."')";
echo $addPartnersQuery;
mysql_query($addPartnersQuery);
mysql_close($link);
?>