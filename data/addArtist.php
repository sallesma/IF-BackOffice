<?php

include('connection.php');


$addArtistQuery ="INSERT INTO artists(name, picture, style, description, day, stage, beginHour, endHour, website, facebook, twitter, youtube) VALUES ('".$_POST['name']."', 'pictureURL','".$_POST['style']."', '".$_POST['description']."', '".$_POST['day']."', '".$_POST['stage']."', '".$_POST['startTime']."', '".$_POST['endTime']."', '".$_POST['website']."', '".$_POST['facebook']."', '".$_POST['twitter']."', '".$_POST['youtube']."')";

mysql_query($addArtistQuery);
mysql_close($link);
?>