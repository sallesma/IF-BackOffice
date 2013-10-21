<?php

include("connection.php");

//Supprimer l'artiste
$deleteNewsQuery ="DELETE FROM news WHERE id=".$_GET['id'];
mysql_query($deleteNewsQuery);

mysql_close($link);
?>