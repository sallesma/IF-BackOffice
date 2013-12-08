<?php

include("connection.php");

//Supprimer la news
$deletePartnerQuery ="DELETE FROM partners WHERE id=".$_GET['id'];
mysql_query($deletePartnerQuery);

mysql_close($link);
?>