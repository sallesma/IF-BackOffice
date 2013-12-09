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

$getPartnersQuery = "SELECT id, name, picture, website FROM partners ORDER BY name";
$getPartnersResult = mysql_query($getPartnersQuery);

while($partnerRow = mysql_fetch_assoc($getPartnersResult)){
	echo "<tr>";
	echo "<form role=\"form\">";
    echo "<input type=\"hidden\" name=\"name\" value=\"".$partnerRow['name']."\">";
    echo "<input type=\"hidden\" name=\"website\" value=\"".$partnerRow['website']."\">";
	echo "<td>".$partnerRow['name']."</td>";
	echo "<td>".$partnerRow['picture']."</td>";
	echo "<td>".$partnerRow['website']."</td>";
	echo "<td>
			<button type=\"button\" class=\"modifyPartnerButton btn btn-primary\">Modifier</button>
			<button type=\"button\" class=\"partnerDeleteButton btn btn-danger\">Supprimer !</button>
			</td>";
	echo "<input type=\"hidden\" name=\"id\" value=\"".$partnerRow['id']."\">";
    echo "</form>";
	echo "</tr>";
	echo "</tr>";
}

echo "</table>";

mysql_close($link);

?>
