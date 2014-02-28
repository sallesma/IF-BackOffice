<?php

class FiltersManager {

	public function __construct(){}

	public function getFilters(){
		$getFiltersQuery = "SELECT id, picture FROM ".FILTERS_TABLE."";
		$getFiltersResult = mysql_query($getFiltersQuery);
		
		$allFilters = Array();
		while($filterRow = mysql_fetch_assoc($getFiltersResult)){
			$thisFilter = array('id'=> $filterRow['id'],
						 'picture'=> $filterRow['picture'] );
			array_push($allFilters, $thisFilter);
		}
		return (json_encode($allFilters));
	}

	public function addFilter( $url ) {
		$addFilterQuery ="INSERT INTO ".FILTERS_TABLE."(picture) VALUES ('".$url."')";
		mysql_query($addFilterQuery);
	}
	
	public function deleteFilter( $id ) {
	
		//get the url
		$getFilterUrlQuery = "SELECT picture FROM ".FILTERS_TABLE." WHERE id = ".$id;
		$getFilterUrlResult = mysql_query($getFilterUrlQuery);

		$filterRow = mysql_fetch_array($getFilterUrlResult);
		$url = $filterRow[0];

		//delete the filter file from server
		$beginPos = strpos($url, "/src");
		$urlToDelete = substr($url, $beginPos );

		if ( !unlink(getcwd().$urlToDelete) ) {
			echo ("Error deleting ".$urlToDelete);
		} else {
			echo ("Deleted ".$urlToDelete);
		}

		//delete the filter from database
		$deleteFilterQuery ="DELETE FROM ".FILTERS_TABLE." WHERE id= ".$id;
		mysql_query($deleteFilterQuery);

		
	}
}