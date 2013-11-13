<?php

include("connection.php");

//get the url
$getFilterUrlQuery = "SELECT url FROM filters WHERE id = ".$_GET['id'];
$getFilterUrlResult = mysql_query($getFilterUrlQuery);

while($filterRow = mysql_fetch_array($getFilterUrlResult)){
	$url = $filterRow[0];
}

//delete the filter file from server
$beginPos = strpos($url, "data/");
$urlToDelete = substr($url, $beginPos + strlen("data/") );

if (!unlink($urlToDelete)) {
	echo ("Error deleting $file");
} else {
	echo ("Deleted $file");
}

//delete the filter from database
$deleteFilterQuery ="DELETE FROM filters WHERE id= ".$_GET['id'];
mysql_query($deleteFilterQuery);

mysql_close($link);
?>