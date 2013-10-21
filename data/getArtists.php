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

$getArtistsQuery = "SELECT id, nom, genre, jour, scene, debut FROM artistes ORDER BY nom";
$getArtistsResult = mysql_query($getArtistsQuery);

while($artistRow = mysql_fetch_assoc($getArtistsResult)){
	echo "<tr>";
	echo "<td>".$artistRow['nom']."</td>";
	echo "<td>".$artistRow['genre']."</td>";
	echo "<td>".$artistRow['scene']."</td>";
	echo "<td>".$artistRow['jour']."</td>";
	echo "<td>".$artistRow['debut']."</td>";
	echo "<td><input type=\"hidden\" value=\"".$artistRow['id']."\" name=\"id\"/>
				<button type=\"button\" class=\"showArtistButton btn btn-primary\">Plus</button>
				<button type=\"button\" class=\"artistDeleteButton btn btn-danger\">Supprimer !</button>
				</td>";
	echo "</tr>";
}

echo "</table>";

mysql_close($link);

?>
