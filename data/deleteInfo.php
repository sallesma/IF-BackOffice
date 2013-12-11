<?php

include("connection.php");

$id = $_POST['id'];

//Récupérer le parentId
$getParentIdQuery = "SELECT parent FROM infos WHERE id = ".$id;
$getParentIdResult = mysql_query($getParentIdQuery);

while($ParentIdRow = mysql_fetch_assoc($getParentIdResult)){
	$parentId = $ParentIdRow['parent'];
}

//replacer les enfants dans le parent
$editChildrenQuery ="UPDATE infos SET parent='".$parentId."' WHERE parent=".$id;
mysql_query($editChildrenQuery);


//Picture deletion
//get the url
$getInfoImageUrlQuery = "SELECT picture FROM infos WHERE id =".$id;
$getInfoImageUrlResult = mysql_query($getInfoImageUrlQuery);

while($pictureRow = mysql_fetch_array($getInfoImageUrlResult)){
	$url = $pictureRow[0];
}

//delete the file from server
$beginPos = strpos($url, "data/");
$urlToDelete = substr($url, $beginPos + strlen("data/") );

if (!unlink($urlToDelete)) {
	echo ("Error deleting $file");
} else {
	echo ("Deleted $file");
}


//Delete linked map item if exists
$deleteInfoMapItemQuery = "DELETE FROM map WHERE infoId=".$id;
mysql_query($deleteInfoMapItemQuery);

//Supprimer l'info
$deleteInfoQuery ="DELETE FROM infos WHERE id=".$id;
mysql_query($deleteInfoQuery);

mysql_close($link);
?>