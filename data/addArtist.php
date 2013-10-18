<?php

include('connection.php');


$addArtistQuery ="INSERT INTO artistes(nom, picture, genre, description, jour, scene, debut, fin, website, facebook, twitter, youtube) VALUES ('".$_POST['name']."', 'pictureURL','".$_POST['style']."', '".$_POST['description']."', '".$_POST['day']."', '".$_POST['scene']."', '".$_POST['startTime']."', '".$_POST['endTime']."', '".$_POST['website']."', '".$_POST['facebook']."', '".$_POST['twitter']."', '".$_POST['youtube']."')";

mysql_query($addArtistQuery);
mysql_close($link);
?>