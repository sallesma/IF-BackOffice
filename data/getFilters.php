<?php

include("connection.php");

$getFiltersQuery = "SELECT url FROM filters";
$getFiltersResult = mysql_query($getFiltersQuery);

while($filtersRow = mysql_fetch_array($getFiltersResult)){
	echo "<div class=\"col-sm-6 col-md-3\">";
	echo "	<a href=\"#\" class=\"thumbnail\">";
	echo "		<img src=\"".$filtersRow[0]."\" alt=\"...\">";
	echo "	</a>";
	echo "</div>";
}

mysql_close($link);
?>