<?php

include("connection.php");
$id = $_POST['id'];
$name = mysql_real_escape_string( $_POST['name'] );
$website = mysql_real_escape_string( $_POST['website'] );

$editPartnerQuery ="UPDATE partners SET name='".$name."', website='".$website."' WHERE id=".$id."";
mysql_query($editPartnerQuery);
mysql_close($link);
?>