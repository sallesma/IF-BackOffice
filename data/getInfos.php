<?php

include("connection.php");

$getInfosQuery = "SELECT id, name, parent, isCategory FROM infos ORDER BY id";
$getInfosResult = mysql_query($getInfosQuery);

$treeArray = Array();

while($infosRow = mysql_fetch_assoc($getInfosResult)){
	$info = array( "name" => $infosRow['name'],
				  "id" => $infosRow['id'],
				  "isCategory" => $infosRow['isCategory'],
				  "parentid" =>$infosRow['parent']);
	array_push($treeArray, $info);
}

mysql_close($link);

echo json_encode($treeArray);
?>