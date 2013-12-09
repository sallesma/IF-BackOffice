<?php

include("connection.php");
$id = $_POST['id'];
$name = mysql_real_escape_string( $_POST['name'] );
$weblink = mysql_real_escape_string( $_POST['weblink'] );

$editPartnerQuery ="UPDATE partners SET name='".$name."', weblink='".$weblink."' WHERE id=".$id."";
echo $editPartnerQuery;
mysql_query($editPartnerQuery);
mysql_close($link);
?>