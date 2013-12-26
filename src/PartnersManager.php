<?php

class PartnersManager {

	public function __construct(){}

	public function getPartners(){
		include("connection.php");

		$getPartnersQuery = "SELECT id, name, picture, website FROM partners";
		$getPartnersResult = mysql_query($getPartnersQuery);

		$allPartners = Array();
		while($partnerRow = mysql_fetch_assoc($getPartnersResult)){
			$thisPartner = array('id'=> $partnerRow['id'],
						 'name'=> $partnerRow['name'],
						 'picture'=> $partnerRow['picture'],
						 'website'=> $partnerRow['website'] );
			array_push($allPartners, $thisPartner);
		}
		mysql_close($link);
		return (json_encode($allPartners));
	}
    
    public function addPartner($name, $picture, $website) {
		include('connection.php');

		$name = mysql_real_escape_string( $name );
        
		$addPartnerQuery ="INSERT INTO partners(name, picture, website)
						VALUES ('".$name."', '".$picture."', '".$website."')";
		mysql_query($addPartnerQuery);
		mysql_close($link);
	}
    
    public function updatePartner ( $id, $name, $picture, $website) {
		include("connection.php");

		$name = mysql_real_escape_string( $name );

		$getPartnerImageUrlQuery = "SELECT picture FROM partners where id=".$id."";
		$getPartnerImageUrlResult = mysql_query($getPartnerImageUrlQuery);

		while($pictureRow = mysql_fetch_array($getPartnerImageUrlResult)){
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

		$editPartnerQuery ="UPDATE partners SET name='".$name."', picture='".$picture."', website='".$website."' WHERE id=".$id;

		mysql_query($editPartnerQuery);
		mysql_close($link);
	}

    
    public function deletePartner( $id ) {
		include("connection.php");

		//get the url
		$getPartnerImageUrlQuery = "SELECT picture FROM partners WHERE id = ".$id;
		$getPartnerImageUrlResult = mysql_query($getPartnerImageUrlQuery);

		while($pictureRow = mysql_fetch_array($getPartnerImageUrlResult)){
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
		$deleteArtistQuery ="DELETE FROM partners WHERE id=".$id;
		mysql_query($deleteArtistQuery);

		mysql_close($link);
	}


}