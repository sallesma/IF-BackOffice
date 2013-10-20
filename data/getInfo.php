<?php

include("connection.php");

$getInfoQuery = "SELECT id, name, parent, picture, isCategory, content FROM infos WHERE id = ".$_GET['id'];
$getInfoResult = mysql_query($getInfoQuery);

while($infoRow = mysql_fetch_assoc($getInfoResult)){
$info = array( "name" => $infoRow['name'],
				"id" => $infoRow['id'],
				"parentid" =>$infoRow['parent'],
				"picture" => $infoRow['picture'],
				"isCategory" => $infoRow['isCategory'],
				"content" => $infoRow['content']);
}
mysql_close($link);

echo json_encode($info);
?>
