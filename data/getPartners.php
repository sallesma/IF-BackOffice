<?php

print <<<END
<table>
	<tr>
								<th>Nom</th>
								<th>Image</th>
								<th>Lien</th>
							</tr>
END;

include("connection.php");

$getPartnersQuery = "SELECT id, name, picture, weblink FROM partners ORDER BY name";
$getPartnersResult = mysql_query($getPartnersQuery);

while($partnerRow = mysql_fetch_assoc($getPartnersResult)){
	echo "<tr>";
	echo "<td>".$partnerRow['name']."</td>";
	echo "<td>".$partnerRow['picture']."</td>";
	echo "<td>".$partnerRow['weblink']."</td>";
	echo "<td><input type=\"hidden\" value=\"".$partnerRow['id']."\" name=\"id\"/>
				<button type=\"button\" class=\"modifyPartnerButton btn btn-primary\">Modifier</button>
				<button type=\"button\" class=\"partnerDeleteButton btn btn-danger\">Supprimer !</button>
				</td>";
	echo "</tr>";
}

echo "</table>";

mysql_close($link);

?>
