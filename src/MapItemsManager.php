<?php

class MapItemsManager {

	public function __construct(){}

	public function getMapItems(){
		

		$getMapItemsQuery = "SELECT id, label, x, y, infoId FROM ".MAP_TABLE."";
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
		
		return (json_encode($allMapItems));
	}

    public function addMapItem($label, $x, $y, $infoId) {
		include('connection.php');

		$label = mysql_real_escape_string( $label );

		$addMapItemQuery ="INSERT INTO ".MAP_TABLE." (label, x, y, infoId) VALUES ('".$label."', '".$x."', '".$y."', '".$infoId."')";
		mysql_query($addMapItemQuery);

		if ($infoId != "-1") {
			$updateLinkedInfo = "UPDATE infos SET isDisplayedOnMap = 1 WHERE id=".$infoId;
			mysql_query($updateLinkedInfo);
		}

		
		return $addMapItemQuery;
	}

    public function updateMapItem ( $id, $label, $x, $y, $infoId) {
		

		$name = mysql_real_escape_string( $name );

		$getLinkedInfoIdQuery = "SELECT infoId FROM ".MAP_TABLE." WHERE id=".$id;
		$getLinkedInfoIdResult = mysql_query($getLinkedInfoIdQuery);
		while($infoIdRow = mysql_fetch_assoc($getLinkedInfoIdResult)){
			$prevousInfoId = $infoIdRow['infoId'];
		}

		$editMapItemQuery ="UPDATE ".MAP_TABLE." SET label='".$label."', x='".$x."', y='".$y."', infoId='".$infoId."' WHERE id=".$id."";
		mysql_query($editMapItemQuery);

		if ($prevousInfoId != $infoId) {
			$updateNewLinkedInfo = "UPDATE infos SET isDisplayedOnMap = 1 WHERE id=".$infoId;
			mysql_query($updateNewLinkedInfo);

			$updatePreviousLinkedInfo = "UPDATE infos SET isDisplayedOnMap = 0 WHERE id=".$prevousInfoId;
			mysql_query($updatePreviousLinkedInfo);
		}
		
	}

    public function deleteMapItem( $id ) {
		

		$getLinkedInfoIdQuery = "SELECT infoId FROM ".MAP_TABLE." WHERE id=".$id;
		$getLinkedInfoIdResult = mysql_query($getLinkedInfoIdQuery);
		while($infoIdRow = mysql_fetch_assoc($getLinkedInfoIdResult)){
			$infoId = $infoIdRow['infoId'];
		}

		if ($infoId != -1) {
			$updateLinkedInfo = "UPDATE ".INFOS_TABLE." SET isDisplayedOnMap = 0 WHERE id=".$infoId;
			mysql_query($updateLinkedInfo);
		}

		$deleteMapItemQuery ="DELETE FROM ".MAP_TABLE." WHERE id=".$id;
		mysql_query($deleteMapItemQuery);

		
	}
}