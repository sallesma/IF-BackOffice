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

}