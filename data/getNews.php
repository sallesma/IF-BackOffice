<?php

print <<<END
<table>
	<tr>
								<th>Nom</th>
								<th>Description</th>
							</tr>
END;

include('connection.php');

$getNewsQuery = sprintf("SELECT title, content, date FROM news ORDER BY date DESC");
$getNewsResult = mysql_query($getNewsQuery);

while($newsRow = mysql_fetch_array($getNewsResult)){
	echo "<tr>";
	echo "<td width=\"100\"=>".$newsRow[0]."</td>";
	echo "<td>".$newsRow[1]."</td>";
	echo "<td>".$newsRow[2]."</td>";
	echo "<td><button type=\"button\" class=\"btn btn-primary\">Editer</button></td>";
	echo "</tr>";
}

echo "</table>";

?>