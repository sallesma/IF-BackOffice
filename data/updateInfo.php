<?php

include("connection.php");

$id = $_POST['id'];
$name = mysql_real_escape_string( $_POST['name'] );
$picture = $_POST['picture'];
$isCategory = $_POST['isCategory'];
$content = mysql_real_escape_string( $_POST['content'] );
$parentId = $_POST['parentId'];


$getInfoImageUrlQuery = "SELECT picture FROM infos where id=".$id."";
$getInfoImageUrlResult = mysql_query($getInfoImageUrlQuery);

while($pictureRow = mysql_fetch_array($getInfoImageUrlResult)){
	$url = $pictureRow[0];
}

if ($url != $picture) {
    $beginPos = strpos($url, "data/");
    $urlToDelete = substr($url, $beginPos + strlen("data/") );

    if (!unlink($urlToDelete)) {
	   echo ("Error deleting $file");
    } else {
	echo ("Deleted $file");
    }
}

$editInfoQuery ="UPDATE infos SET name='".$name."', picture='".$picture."', isCategory='".$isCategory."', parent='".$parentId."', content='".$content."' WHERE id=".$id;

mysql_query($editInfoQuery);
mysql_close($link);
?>