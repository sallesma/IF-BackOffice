<?php

print <<<END
<table>
	<tr>
								<th>Nom</th>
								<th>Genre</th>
								<th>Scène</th>
								<th>Jour</th>
								<th>Heure</th>
							</tr>
END;

include("connection.php");

$getArtistsQuery = "SELECT id, name, style, day, stage, beginHour FROM artists ORDER BY name";
$getArtistsResult = mysql_query($getArtistsQuery);

while($artistRow = mysql_fetch_assoc($getArtistsResult)){
	echo "<tr>";
	echo "<td>".$artistRow['name']."</td>";
	echo "<td>".$artistRow['style']."</td>";
	echo "<td>".$artistRow['stage']."</td>";
	echo "<td>".$artistRow['day']."</td>";
	echo "<td>".$artistRow['beginHour']."</td>";
	echo "<td><input type=\"hidden\" value=\"".$artistRow['id']."\" name=\"id\"/>
				<button type=\"button\" class=\"showArtistButton btn btn-primary\">Plus</button>
				<button type=\"button\" class=\"artistDeleteButton btn btn-danger\">Supprimer !</button>
				</td>";
	echo "</tr>";
}

echo "</table>";

mysql_close($link);

?>
