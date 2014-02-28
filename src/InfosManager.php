<?php

class InfosManager {

	public function __construct(){}

	public function getInfos(){
		

		$getInfosQuery = "SELECT id, name, parent, isCategory FROM ".INFOS_TABLE." ORDER BY parent";
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
		return (json_encode($treeArray));
	}

	public function getInfo( $id ){
		

		$getInfoQuery = "SELECT id, name, parent, picture, isCategory, content, isDisplayedOnMap FROM ".INFOS_TABLE." WHERE id = ".$id;
		$getInfoResult = mysql_query($getInfoQuery);

		while($infoRow = mysql_fetch_assoc($getInfoResult)){
		$info = array( "name" => $infoRow['name'],
						"id" => $infoRow['id'],
						"parentid" =>$infoRow['parent'],
						"picture" => $infoRow['picture'],
						"isCategory" => $infoRow['isCategory'],
						"content" => $infoRow['content'],
						"isDisplayedOnMap" => $infoRow['isDisplayedOnMap']);
		}
		

		echo json_encode($info);
	}

	public function addInfo($name, $picture, $isCategory, $content, $parent) {
		include('connection.php');

		$name = mysql_real_escape_string( $name );
		$content = mysql_real_escape_string( $content );

		$addInfoQuery ="INSERT INTO ".INFOS_TABLE."(name, picture, isCategory, content, parent)
						VALUES ('".$name."', '".$picture."', '".$isCategory."', '".$content."', '".$parent."')";
		mysql_query($addInfoQuery);
		
	}

	public function deleteInfo( $id ) {
		

		//Récupérer le parentId
		$getParentIdQuery = "SELECT parent FROM ".INFOS_TABLE." WHERE id = ".$id;
		$getParentIdResult = mysql_query($getParentIdQuery);
		while($ParentIdRow = mysql_fetch_assoc($getParentIdResult)){
			$parentId = $ParentIdRow['parent'];
		}

		//replacer les enfants dans le parent
		$editChildrenQuery ="UPDATE ".INFOS_TABLE." SET parent='".$parentId."' WHERE parent=".$id;
		mysql_query($editChildrenQuery);

		//Picture deletion
		//get the url
		$getInfoImageUrlQuery = "SELECT picture FROM ".INFOS_TABLE." WHERE id =".$id;
		$getInfoImageUrlResult = mysql_query($getInfoImageUrlQuery);

		while($pictureRow = mysql_fetch_array($getInfoImageUrlResult)){
			$url = $pictureRow[0];
		}

		//delete the file from server
		if ($url != "") {
			$beginPos = strpos($url, "/src");
			$urlToDelete = substr($url, $beginPos );

			if ( !unlink(getcwd().$urlToDelete) ) {
				echo ("Error deleting ".$urlToDelete);
			} else {
				echo ("Deleted ".$urlToDelete);
			}
		}

		//Delete linked map item if exists
		$deleteInfoMapItemQuery = "DELETE FROM ".MAP_TABLE." WHERE infoId=".$id;
		mysql_query($deleteInfoMapItemQuery);

		//Supprimer l'info
		$deleteInfoQuery ="DELETE FROM ".INFOS_TABLE." WHERE id=".$id;
		mysql_query($deleteInfoQuery);

		
	}

	public function updateInfo ( $id, $name, $picture, $isCategory, $content, $parentId ) {

		$name = mysql_real_escape_string( $name );
		$content = mysql_real_escape_string( $content );

		$getInfoImageUrlQuery = "SELECT picture FROM ".INFOS_TABLE." where id=".$id."";
		$getInfoImageUrlResult = mysql_query($getInfoImageUrlQuery);

		while($pictureRow = mysql_fetch_array($getInfoImageUrlResult)){
			$url = $pictureRow[0];
		}

		if ($url != $picture && $url != "") {
			$beginPos = strpos($url, "/src");
			$urlToDelete = substr($url, $beginPos );

			if ( !unlink(getcwd().$urlToDelete) ) {
				echo ("Error deleting ".$urlToDelete);
			} else {
				echo ("Deleted ".$urlToDelete);
			}
		}

		$editInfoQuery ="UPDATE ".INFOS_TABLE." SET name='".$name."', picture='".$picture."', isCategory='".$isCategory."', parent='".$parentId."', content='".$content."' WHERE id=".$id;

		mysql_query($editInfoQuery);
		
	}
}