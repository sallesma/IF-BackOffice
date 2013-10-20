<?php

include("connection.php");

$getInfosQuery = "SELECT id, name, parent FROM infos ORDER BY id";
$getInfosResult = mysql_query($getInfosQuery);

$treeArray = Array();

while($infosRow = mysql_fetch_assoc($getInfosResult)){
	$info = array( "text" => $infosRow['name'],
				  "id" => $infosRow['id'],
				  "parentid" =>$infosRow['parent']);
	array_push($treeArray, $info);
}

mysql_close($link);

echo json_encode($treeArray);
?>