<?php

include("connection.php");

$id = $_POST['id'];
$name = $_POST['name'];
$genre = $_POST['genre'];
$descritpion = $_POST['description'];
$day = $_POST['day'];
$scene = $_POST['scene'];
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
$website = $_POST['website'];
$twitter = $_POST['twitter'];
$facebook = $_POST['facebook'];
$youtube = $_POST['youtube'];





$editArtistQuery ="UPDATE artistes SET nom='".$name."', genre='".$genre."', description='".$description."', jour='".$day."', scene='".$scene."', debut='".$start_time."', fin='".$end_time."', website='".$website."', facebook='".$facebook."', twitter='".$twitter."', youtube='".$youtube."' WHERE id=".$id."";

echo $editArtistQuery;

mysql_query($editArtistQuery);
mysql_close($link);
?>