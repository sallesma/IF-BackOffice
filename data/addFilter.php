<?php

include('connection.php');


$addFilterQuery ="INSERT INTO filters(picture) VALUES ('".$_POST['url']."')";

mysql_query($addFilterQuery);
mysql_close($link);

?>