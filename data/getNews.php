<?php

include("connection.php");
print <<<END
<table>
	<tr>
								<th>Nom</th>
								<th>Description</th>
                                <th>Date</th>
							</tr>
END;

$getNewsQuery = "SELECT id, title, content, date FROM news ORDER BY date DESC";
$getNewsResult = mysql_query($getNewsQuery);

while($newsRow = mysql_fetch_array($getNewsResult)){
     
	echo "<tr>";
    echo "<form role=\"form\">";
    echo "<input type=\"hidden\" name=\"title\" value=\"".$newsRow[1]."\">";
    echo "<input type=\"hidden\" name=\"content\" value=\"".$newsRow[2]."\">";
	echo "<td id=\"title\">".$newsRow[1]."</td>";
	echo "<td id=\"content\">".$newsRow[2]."</td>";
	echo "<td>".$newsRow[3]."</td>";
	echo "<td>
			<button type=\"button\" class=\"btn btn-primary modifyNewButton\">Modifier</button>
			<button type=\"button\" class=\"newsDeleteButton btn btn-danger\">Supprimer !</button>
		</td>";
    echo "<input type=\"hidden\" name=\"rowID\" value=\"".$newsRow[0]."\">";
    echo "</form>";
	echo "</tr>";
   
}

echo "</table>";
mysql_close($link);
?>