<?php

class ArtistsManager {

	public function __construct(){}

	public function getArtists(){
		
		$getArtistsQuery = "SELECT id, name, style, day, stage, beginHour FROM ".ARTISTS_TABLE." ORDER BY name";
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
		return (json_encode($allArtists));
	}

	public function getArtist( $id ){
		

		$getArtistQuery = "SELECT * FROM ".ARTISTS_TABLE." WHERE id =".$id."";
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
		return (json_encode($artist));
	}

	public function addArtists($name, $picture, $style, $description, $day, $stage, $startTime, $endTime, $website, $facebook, $twitter, $youtube) {

		$name = mysql_real_escape_string($name );
		$picture = mysql_real_escape_string( $picture );
		$style = mysql_real_escape_string( $style );
		$description = mysql_real_escape_string( $description );
		$day = mysql_real_escape_string( $day );
		$stage = mysql_real_escape_string( $stage );

		$addArtistQuery ="INSERT INTO ".ARTISTS_TABLE."(name, picture, style, description, day, stage, beginHour, endHour, website, facebook, twitter, youtube) VALUES ('".$name."','".$picture."' ,'".$style."', '".$description."', '".$day."', '".$stage."', '".$startTime."', '".$endTime."', '".$website."', '".$facebook."', '".$twitter."', '".$youtube."')";

		mysql_query($addArtistQuery);

	}

	public function deleteArtist( $id ) {
		

		//get the url
		$getArtistImageUrlQuery = "SELECT picture FROM ".ARTISTS_TABLE." WHERE id = ".$id;
		$getArtistImageUrlResult = mysql_query($getArtistImageUrlQuery);

		while($pictureRow = mysql_fetch_array($getArtistImageUrlResult)){
			$url = $pictureRow[0];
		}

		//delete the picture file from server
		if ($url != "") {
			$beginPos = strpos($url, "/src");
			$urlToDelete = substr($url, $beginPos );

			if ( !unlink(getcwd().$urlToDelete) ) {
				echo ("Error deleting ".$urlToDelete);
			} else {
				echo ("Deleted ".$urlToDelete);
			}
		}

		//Supprimer l'artiste
		$deleteArtistQuery ="DELETE FROM ".ARTISTS_TABLE." WHERE id=".$id;
		mysql_query($deleteArtistQuery);

		
	}

	public function updateArtists ( $id, $name, $picture, $style, $description, $day, $stage, $startTime, $endTime, $website, $facebook, $twitter, $youtube) {
		
		$name = mysql_real_escape_string($name );
		$picture = mysql_real_escape_string( $picture );
		$style = mysql_real_escape_string( $style );
		$description = mysql_real_escape_string( $description );
		$day = mysql_real_escape_string( $day );
		$stage = mysql_real_escape_string( $stage );
        $startTime = mysql_real_escape_string( $startTime );
        $endTime = mysql_real_escape_string( $endTime );

		$getArtistImageUrlQuery = "SELECT picture FROM ".ARTISTS_TABLE." where id=".$id."";
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

		$editArtistQuery ="UPDATE ".ARTISTS_TABLE." SET name='".$name."', picture='".$picture."' ,style='".$style."', description='".$description."', day='".$day."', stage='".$stage."', beginHour='".$startTime."', endHour='".$endTime."', website='".$website."', facebook='".$facebook."', twitter='".$twitter."', youtube='".$youtube."' WHERE id=".$id."";

        
		mysql_query($editArtistQuery);
		
	}
}