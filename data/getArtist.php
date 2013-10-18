<?php

include("connection.php");

$id = $_GET['id'];

$getArtistQuery = "SELECT * FROM artistes WHERE id=".$id."; ";
$getArtistResult = mysql_query($getArtistQuery);

$artistRow = mysql_fetch_assoc($getArtistResult)){
    
    $arr = array('id'=> artistRow['id'], 'nom'=> artistRow['nom'],'picture'=> artistRow['picture'],'genre'=> artistRow['genre'],'description'=> artistRow['description'],'jour'=> artistRow['jour'],'scene'=> artistRow['scene'],'debut'=> artistRow['debut'],'fin'=> artistRow['fin'],'website'=> artistRow['website'],'facebook'=> artistRow['facebook'],'twitter'=> artistRow['twitter'],'youtube'=> artistRow['youtube'] );

        echo json_encode($arr);
}


mysql_close($link);

?>
