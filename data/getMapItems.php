<?php

include("connection.php");
print <<<END
<table>
	<tr>
								<th>Label</th>
								<th>Coordonnée X</th>
                                <th>Coordonnée Y</th>
                                <th>Info liée ?</th>
							</tr>
END;

$getMapItemsQuery = "SELECT id, label, x, y, infoId FROM map";
$getMapItemsResult = mysql_query($getMapItemsQuery);

while($mapItemsRow = mysql_fetch_array($getMapItemsResult)){

	echo "<tr>";
    echo "<form role=\"form\">";
    echo "<input type=\"hidden\" name=\"label\" value=\"".$mapItemsRow[1]."\">";
    echo "<input type=\"hidden\" name=\"x\" value=\"".$mapItemsRow[2]."\">";
    echo "<input type=\"hidden\" name=\"y\" value=\"".$mapItemsRow[3]."\">";
    echo "<input type=\"hidden\" name=\"infoId\" value=\"".$mapItemsRow[4]."\">";
	echo "<td id=\"label\">".$mapItemsRow[1]."</td>";
	echo "<td id=\"x\">".$mapItemsRow[2]."</td>";
	echo "<td id=\"y\">".$mapItemsRow[3]."</td>";
	if ($mapItemsRow[4] != null)
		echo  "<td>Oui</td>";
	else
		echo  "<td>Non</td>";
	echo "<td>
			<button type=\"button\" class=\"btn btn-primary modifyMapItemButton\">Modifier</button>
			<button type=\"button\" class=\"mapItemDeleteButton btn btn-danger\">Supprimer !</button>
		</td>";
    echo "<input type=\"hidden\" name=\"id\" value=\"".$mapItemsRow[0]."\">";
    echo "</form>";
	echo "</tr>";

}

echo "</table>";
mysql_close($link);
?>