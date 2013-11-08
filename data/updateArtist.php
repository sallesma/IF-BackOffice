<?php

include("connection.php");

$id = $_POST['id'];
$name = $_POST['name'];
$style = $_POST['style'];
$description = $_POST['description'];
$day = $_POST['day'];
$stage = $_POST['stage'];
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
$website = $_POST['website'];
$twitter = $_POST['twitter'];
$facebook = $_POST['facebook'];
$youtube = $_POST['youtube'];





$editArtistQuery ="UPDATE artists SET name='".$name."', style='".$style."', description='".$description."', day='".$day."', stage='".$stage."', beginHour='".$start_time."', endHour='".$end_time."', website='".$website."', facebook='".$facebook."', twitter='".$twitter."', youtube='".$youtube."' WHERE id=".$id."";

mysql_query($editArtistQuery);
mysql_close($link);
?>