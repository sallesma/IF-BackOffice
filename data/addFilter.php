<?php

include('connection.php');


$addFilterQuery ="INSERT INTO filters(url) VALUES ('".$_POST['url']."')";

mysql_query($addFilterQuery);
mysql_close($link);

?>