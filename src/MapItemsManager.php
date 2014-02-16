<?php

class MapItemsManager {

	public function __construct(){}

	public function getMapItems(){
		include("connection.php");

		$getMapItemsQuery = "SELECT id, label, x, y, infoId FROM map";
		$getMapItemsResult = mysql_query($getMapItemsQuery);

		$allMapItems = Array();
		while($mapItemRow = mysql_fetch_assoc($getMapItemsResult)){
			$thisMapItem = array('id'=> $mapItemRow['id'],
						 'label'=> $mapItemRow['label'],
						 'x'=> $mapItemRow['x'],
			 			 'y'=> $mapItemRow['y'],
						 'infoId'=> $mapItemRow['infoId'] );
			array_push($allMapItems, $thisMapItem);
		}
		mysql_close($link);
		return (json_encode($allMapItems));
	}

    public function addMapItem($label, $x, $y, $infoId) {
		include('connection.php');

		$label = mysql_real_escape_string( $label );

		$addMapItemQuery ="INSERT INTO map (label, x, y, infoId) VALUES ('".$label."', '".$x."', '".$y."', '".$infoId."')";
		mysql_query($addMapItemQuery);

		if ($infoId != "-1") {
			$updateLinkedInfo = "UPDATE infos SET isDisplayedOnMap = 1 WHERE id=".$infoId;
			mysql_query($updateLinkedInfo);
		}

		mysql_close($link);
		return $addMapItemQuery;
	}

    public function updateMapItem ( $id, $label, $x, $y, $infoId) {
		include("connection.php");

		$name = mysql_real_escape_string( $name );

		$getLinkedInfoIdQuery = "SELECT infoId FROM map WHERE id=".$id;
		$getLinkedInfoIdResult = mysql_query($getLinkedInfoIdQuery);
		while($infoIdRow = mysql_fetch_assoc($getLinkedInfoIdResult)){
			$prevousInfoId = $infoIdRow['infoId'];
		}

		$editMapItemQuery ="UPDATE map SET label='".$label."', x='".$x."', y='".$y."', infoId='".$infoId."' WHERE id=".$id."";
		mysql_query($editMapItemQuery);

		if ($prevousInfoId != $infoId) {
			$updateNewLinkedInfo = "UPDATE infos SET isDisplayedOnMap = 1 WHERE id=".$infoId;
			mysql_query($updateNewLinkedInfo);

			$updatePreviousLinkedInfo = "UPDATE infos SET isDisplayedOnMap = 0 WHERE id=".$prevousInfoId;
			mysql_query($updatePreviousLinkedInfo);
		}
		mysql_close($link);
	}

    public function deleteMapItem( $id ) {
		include("connection.php");

		$getLinkedInfoIdQuery = "SELECT infoId FROM map WHERE id=".$id;
		$getLinkedInfoIdResult = mysql_query($getLinkedInfoIdQuery);
		while($infoIdRow = mysql_fetch_assoc($getLinkedInfoIdResult)){
			$infoId = $infoIdRow['infoId'];
		}

		if ($infoId != -1) {
			$updateLinkedInfo = "UPDATE infos SET isDisplayedOnMap = 0 WHERE id=".$infoId;
			mysql_query($updateLinkedInfo);
		}

		$deleteMapItemQuery ="DELETE FROM map WHERE id=".$id;
		mysql_query($deleteMapItemQuery);

		mysql_close($link);
	}
}