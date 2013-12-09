<?php

include("connection.php");

$deleteMapItemQuery ="DELETE FROM map WHERE id=".$_GET['id'];
mysql_query($deleteMapItemQuery);

mysql_close($link);
?>