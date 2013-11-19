<?php

include("connection.php");

$getInfosQuery = "SELECT id, name, parent, isCategory FROM infos ORDER BY parent";
$getInfosResult = mysql_query($getInfosQuery);

$treeArray = Array();
$pool = Array();

while($infosRow = mysql_fetch_assoc($getInfosResult)) {
	$info = array( "name" => $infosRow['name'],
				  "id" => $infosRow['id'],
				  "isCategory" => $infosRow['isCategory'],
				  "parentId" =>$infosRow['parent']);
	if ($info["parentId"] == "0") { // On prend les éléments qui sont à la racine
		array_push($treeArray, $info); //on les met dans le tableau final
	} else {
		array_push($pool, $info); // on met les autre dans la piscine
	}
}

mysql_close($link);
//We want no item to be before its parent in $treeArray so that the js tree can be constructed
$listCursor = 0;
while ( count($pool) > 0 && $listCursor < count($treeArray) ) { //On parcourt la liste définitive (on s'arrête si le pool est vide ou si on a traité toute la liste des parents)
	$poolCursor = 0;
	$poolSize = count($pool);
	while ($poolCursor <= $poolSize) { // pour chaque élément de la liste, on regarde dans le pool
		if ($pool[$poolCursor]["parentId"] == $treeArray[$listCursor]["id"]) { //on chope les éléments du pool dont c'est le parent
			array_push($treeArray, $pool[$poolCursor]);			// on les rajoute à la liste
			unset($pool[$poolCursor]);							// on les enlève du pool
		}
		$poolCursor = $poolCursor+1;
	}
	$pool = array_values($pool);								//on remet les indexs des éléments du pool normaux (sans trous)
	$listCursor = $listCursor+1;
}
echo json_encode($treeArray);			//on envoie la purée
?>