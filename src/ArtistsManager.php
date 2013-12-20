<?php

class ArtistsManager {

	public function __construct(){}

	public function getArtists(){
		include("connection.php");

		$getArtistsQuery = "SELECT id, name, style, day, stage, beginHour FROM artists ORDER BY name";
		$getArtistsResult = mysql_query($getArtistsQuery);

		$allArtists = Array();
		while($artistRow = mysql_fetch_assoc($getArtistsResult)){
			$thisArtist = array('id'=> $artistRow['id'],
								'name'=> $artistRow['name'],
								'style'=> $artistRow['style'],
								'day'=> $artistRow['day'],
								'stage'=> $artistRow['stage'],
								'beginHour'=> $artistRow['beginHour'] );
			array_push($allArtists, $thisArtist);
		}
		mysql_close($link);
		return (json_encode($allArtists));
	}

	public function getArtist( $id ){
		include("connection.php");

		$getArtistQuery = "SELECT * FROM artists WHERE id =".$id."";
		$getArtistResult = mysql_query($getArtistQuery);

		$artistRow = mysql_fetch_assoc($getArtistResult);
		$artist = array('id'=> $artistRow['id'],
					 'name'=> $artistRow['name'],
					 'picture'=> $artistRow['picture'],
					 'style'=> $artistRow['style'],
					 'description'=> $artistRow['description'],
					 'jour'=> $artistRow['day'],
					 'stage'=> $artistRow['stage'],
					 'beginHour'=> $artistRow['beginHour'],
					 'endHour'=> $artistRow['endHour'],
					 'website'=> $artistRow['website'],
					 'facebook'=> $artistRow['facebook'],
					 'twitter'=> $artistRow['twitter'],
					 'youtube'=> $artistRow['youtube'] );
		mysql_close($link);
		return (json_encode($artist));
	}

	public function addArtists($name, $picture, $style, $description, $day, $stage, $startTime, $endTime, $website, $facebook, $twitter, $youtube) {
		include('connection.php');

		$name = mysql_real_escape_string($name );
		$picture = mysql_real_escape_string( $picture );
		$style = mysql_real_escape_string( $style );
		$description = mysql_real_escape_string( $description );
		$day = mysql_real_escape_string( $day );
		$stage = mysql_real_escape_string( $stage );

		$addArtistQuery ="INSERT INTO artists(name, picture, style, description, day, stage, beginHour, endHour, website, facebook, twitter, youtube) VALUES ('".$name."','".$picture."' ,'".$style."', '".$description."', '".$day."', '".$stage."', '".$startTime."', '".$endTime."', '".$website."', '".$facebook."', '".$twitter."', '".$youtube."')";

		mysql_query($addArtistQuery);
		mysql_close($link);
	}

	public function deleteArtist( $id ) {
		include("connection.php");

		//get the url
		$getArtistImageUrlQuery = "SELECT picture FROM artists WHERE id = ".$id;
		$getArtistImageUrlResult = mysql_query($getArtistImageUrlQuery);

		while($pictureRow = mysql_fetch_array($getArtistImageUrlResult)){
			$url = $pictureRow[0];
		}

		//delete the picture file from server
		$beginPos = strpos($url, "/src");
		$urlToDelete = substr($url, $beginPos );

		if ( !unlink(getcwd().$urlToDelete) ) {
			echo ("Error deleting ".$urlToDelete);
		} else {
			echo ("Deleted ".$urlToDelete);
		}

		//Supprimer l'artiste
		$deleteArtistQuery ="DELETE FROM artists WHERE id=".$id;
		mysql_query($deleteArtistQuery);

		mysql_close($link);
	}

	public function updateArtists ( $id, $name, $picture, $style, $description, $day, $stage, $startTime, $endTime, $website, $facebook, $twitter, $youtube) {
		include("connection.php");

		$name = mysql_real_escape_string($name );
		$picture = mysql_real_escape_string( $picture );
		$style = mysql_real_escape_string( $style );
		$description = mysql_real_escape_string( $description );
		$day = mysql_real_escape_string( $day );
		$stage = mysql_real_escape_string( $stage );

		$getArtistImageUrlQuery = "SELECT picture FROM artists where id=".$id."";
		$getArtistImageUrlResult = mysql_query($getArtistImageUrlQuery);

		while($pictureRow = mysql_fetch_array($getArtistImageUrlResult)){
			$url = $pictureRow[0];
		}

		if ($url != $picture && $url != "") {
			$beginPos = strpos($url, "/src");
			$urlToDelete = substr($url, $beginPos );

			if ( !unlink(getcwd().$urlToDelete) ) {
				echo ("Error deleting ".$urlToDelete);
			} else {
				echo ("Deleted ".$urlToDelete);
			}
		}

		$editArtistQuery ="UPDATE artists SET name='".$name."', picture='".$picture."' ,style='".$style."', description='".$description."', day='".$day."', stage='".$stage."', beginHour='".$start_time."', endHour='".$end_time."', website='".$website."', facebook='".$facebook."', twitter='".$twitter."', youtube='".$youtube."' WHERE id=".$id."";

		mysql_query($editArtistQuery);
		mysql_close($link);
	}
}