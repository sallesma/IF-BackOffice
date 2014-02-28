<?php

// Fill the blanks ;)
$host = "";
$login = "";
$password = "";
$databaseName = "";
$table_schema= "";

//Tables Names
define("ARTISTS_TABLE","artists");
define("FILTERS_TABLE","filters");
define("INFOS_TABLE","infos");
define("MAP_TABLE","map");
define("NEWS_TABLE","news");
define("PARTNERS_TABLE","partners");


$link = mysql_connect($host, $login, $password)
			or die("Impossible de se connecter : " . mysql_error());
$database = mysql_select_db($databaseName, $link);




?>