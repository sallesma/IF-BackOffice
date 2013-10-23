<?php

include("connection.php");

//Supprimer l'artiste
$deleteArtistQuery ="DELETE FROM artists WHERE id=".$_GET['id'];
mysql_query($deleteArtistQuery);

mysql_close($link);
?>