<?php

// Fill the blanks ;)
$host = "";
$login = "";
$password = "";
$databaseName = "";
$table_schema= "";

$link = mysql_connect($host, $login, $password)
			or die("Impossible de se connecter : " . mysql_error());
$database = mysql_select_db($databaseName, $link);

?>