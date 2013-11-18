<?php

include("connection.php");


//get the url
$getArtistImageUrlQuery = "SELECT picture FROM artists WHERE id = ".$_GET['id'];
$getArtistImageUrlResult = mysql_query($getArtistImageUrlQuery);

while($pictureRow = mysql_fetch_array($getArtistImageUrlResult)){
	$url = $pictureRow[0];
}

//delete the filter file from server
$beginPos = strpos($url, "data/");
$urlToDelete = substr($url, $beginPos + strlen("data/") );

if (!unlink($urlToDelete)) {
	echo ("Error deleting $file");
} else {
	echo ("Deleted $file");
}

//Supprimer l'artiste
$deleteArtistQuery ="DELETE FROM artists WHERE id=".$_GET['id'];
mysql_query($deleteArtistQuery);

mysql_close($link);
?>