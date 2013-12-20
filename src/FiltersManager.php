<?php

class FiltersManager {

	public function __construct(){}

	public function getFilters(){
		include("connection.php");

		$getFiltersQuery = "SELECT id, picture FROM filters";
		$getFiltersResult = mysql_query($getFiltersQuery);

		$allFilters = Array();
		while($filterRow = mysql_fetch_assoc($getFiltersResult)){
			$thisFilter = array('id'=> $filterRow['id'],
						 'picture'=> $filterRow['picture'] );
			array_push($allFilters, $thisFilter);
		}
		mysql_close($link);
		return (json_encode($allFilters));
	}

	public function addFilter( $url ) {
		include('connection.php');

		$addFilterQuery ="INSERT INTO filters(picture) VALUES ('".$url."')";

		mysql_query($addFilterQuery);
		mysql_close($link);
	}

	public function deleteFilter( $id ) {
		include("connection.php");

		//get the url
		$getFilterUrlQuery = "SELECT picture FROM filters WHERE id = ".$id;
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
		$deleteFilterQuery ="DELETE FROM filters WHERE id= ".$id;
		mysql_query($deleteFilterQuery);

		mysql_close($link);
	}
}