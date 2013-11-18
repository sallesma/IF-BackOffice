<?php

include("connection.php");

$id = $_POST['id'];
$name = mysql_real_escape_string( $_POST['name'] );
$style = mysql_real_escape_string( $_POST['style'] );
$picture = $_POST['image'];
$description = mysql_real_escape_string( $_POST['description'] );
$day = mysql_real_escape_string( $_POST['day'] );
$stage = mysql_real_escape_string( $_POST['stage'] );
$start_time = $_POST['start_time'];
$end_time = $_POST['end_time'];
$website = $_POST['website'];
$twitter = $_POST['twitter'];
$facebook = $_POST['facebook'];
$youtube = $_POST['youtube'];





$editArtistQuery ="UPDATE artists SET name='".$name."', picture='".$picture."' ,style='".$style."', description='".$description."', day='".$day."', stage='".$stage."', beginHour='".$start_time."', endHour='".$end_time."', website='".$website."', facebook='".$facebook."', twitter='".$twitter."', youtube='".$youtube."' WHERE id=".$id."";

mysql_query($editArtistQuery);
mysql_close($link);
?>