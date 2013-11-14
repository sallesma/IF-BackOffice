<?php

include('connection.php');

$name = mysql_real_escape_string( $_POST['name'] );
$picture = mysql_real_escape_string( $_POST['image'] );
$style = mysql_real_escape_string( $_POST['style'] );
$description = mysql_real_escape_string( $_POST['description'] );
$day = mysql_real_escape_string( $_POST['day'] );
$stage = mysql_real_escape_string( $_POST['stage'] );
$startTime = $_POST['startTime'];
$endTime = $_POST['endTime'];
$website = $_POST['website'];
$facebook = $_POST['facebook'];
$twitter = $_POST['twitter'];
$youtube = $_POST['youtube'];

$addArtistQuery ="INSERT INTO artists(name, picture, style, description, day, stage, beginHour, endHour, website, facebook, twitter, youtube) VALUES ('".$name."','".$picture."' ,'".$style."', '".$description."', '".$day."', '".$stage."', '".$startTime."', '".$endTime."', '".$website."', '".$facebook."', '".$twitter."', '".$youtube."')";

mysql_query($addArtistQuery);
mysql_close($link);
?>