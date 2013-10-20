<?php

include('connection.php');


$addInfoQuery ="INSERT INTO infos(name, picture, isCategory, content, parent)
				VALUES ('".$_POST['name']."', '".$_POST['picture']."', '".$_POST['isCategory']."', '".$_POST['content']."', '".$_POST['parent']."')";
mysql_query($addInfoQuery);
mysql_close($link);
?>