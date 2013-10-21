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

//Supprimer l'info
$deleteInfoQuery ="DELETE FROM infos WHERE id=".$id;
mysql_query($deleteInfoQuery);

mysql_close($link);
?>