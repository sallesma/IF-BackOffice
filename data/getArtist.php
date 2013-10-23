<?php

include("connection.php");

$id = $_GET['id'];

$getArtistQuery = "SELECT * FROM artists WHERE id =".$id."";
$getArtistResult = mysql_query($getArtistQuery);

while($artistRow = mysql_fetch_assoc($getArtistResult)){

    $arr = array('id'=> $artistRow['id'], 'name'=> $artistRow['name'],'picture'=> $artistRow['picture'],'style'=> $artistRow['style'],'description'=> $artistRow['description'],'jour'=> $artistRow['day'],'stage'=> $artistRow['stage'],'beginHour'=> $artistRow['beginHour'],'endHour'=> $artistRow['endHour'],'website'=> $artistRow['website'],'facebook'=> $artistRow['facebook'],'twitter'=> $artistRow['twitter'],'youtube'=> $artistRow['youtube'] );
    echo (json_encode($arr));
}


mysql_close($link);

?>
