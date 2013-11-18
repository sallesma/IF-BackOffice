<?php

include("connection.php");

//Supprimer la news
$deleteNewsQuery ="DELETE FROM news WHERE id=".$_GET['id'];
mysql_query($deleteNewsQuery);

mysql_close($link);
?>