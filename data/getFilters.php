<?php

include("connection.php");

$getFiltersQuery = "SELECT id, url FROM filters";
$getFiltersResult = mysql_query($getFiltersQuery);

while($filtersRow = mysql_fetch_array($getFiltersResult)){
	echo "<div class=\"col-sm-6 col-md-3\">";
	echo "	<form role=\"form\">";
	echo "		<a href=\"#photoFilter-edit\" class=\"thumbnail\">";
	echo "			<img src=\"".$filtersRow[1]."\" alt=\"...\">";
	echo "		</a>";
	echo "		<button type=\"button\" class=\"filterDeleteButton btn btn-danger\">Supprimer</button>";
	echo "		<input type=\"hidden\" name=\"filterId\" value=\"".$filtersRow[0]."\">";
    echo "	</form>";
	echo "</div>";
}

mysql_close($link);
?>