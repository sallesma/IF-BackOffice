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

$getNewsQuery = "SELECT title, content, date FROM news ORDER BY date DESC";
$getNewsResult = mysql_query($getNewsQuery);


while($newsRow = mysql_fetch_array($getNewsResult)){
	echo "<tr>";
	echo "<td>".utf8_encode($newsRow[0])."</td>";
	echo "<td>".utf8_encode($newsRow[1])."</td>";
	echo "<td>".$newsRow[2]."</td>";
	echo "<td><button type=\"button\" class=\"btn btn-primary\">Editer</button></td>";
	echo "</tr>";
}

echo "</table>";

?>