<?php

include("connection.php");

$getInfosQuery = "SELECT id, name, parent FROM infos ORDER BY id";
$getInfosResult = mysql_query($getInfosQuery);

$treeArray = Array();

while($infosRow = mysql_fetch_assoc($getInfosResult)){
	$info = array( "text" => $infosRow['name'], "id" => $infosRow['id'], "parentid" =>$infosRow['parent']);
	array_push($treeArray, $info);
}

mysql_close($link);
/*$treeArray = array(
				array(
								"text" => "Chocolate Beverage",
								"id" => "1",
                                "desc" => "",
								"parentid" => "-1"
				),
				array(
								"id" => "2",
								"parentid" => "1",
                                "desc" => "Miam, un chocolat chaud c'est trop bon",
								"text" => "Hot Chocolate"
				),
				array(
								"id" => "3",
								"parentid" => "1",
                                "desc" => "Au PepperMint, c'est encore mieux",
								"text" => "Peppermint Hot Chocolate"
				),
				array(
								"id" => "4",
								"parentid" => "1",
                                "desc" => "CARAMEL trop oufff",
								"text" => "Salted Caramel Hot Chocolate"
				),
				array(
								"id" => "5",
								"parentid" => "1",
                                "desc" => "Blanc parce que c'est bon!",
								"text" => "White Hot Chocolate"
				),
				array(
								"id" => "6",
								"text" => "Espresso Beverage",
                                "desc" => "",
								"parentid" => "-1"
				),
				array(
								"id" => "7",
								"parentid" => "6",
                                 "desc" => "Le café Americano c'est top génial!!",
								"text" => "Caffe Americano"
				),
                array(
								"id" => "8",
								"text" => "Caffe Latte",
								"parentid" => "6"
				),
				array(
								"id" => "9",
								"text" => "Caffe Mocha",
								"parentid" => "6"
				),
				array(
								"id" => "10",
								"text" => "Cappuccino",
								"parentid" => "6"
				),
				array(
								"id" => "11",
								"text" => "Pumpkin Spice Latte",
								"parentid" => "6"
				),
				array(
								"id" => "12",
								"text" => "Frappuccino",
								"parentid" => "-1"
				),
				array(
								"id" => "13",
								"text" => "Caffe Vanilla Frappuccino",
								"parentid" => "12"
				),
				array(
								"id" => "15",
								"text" => "450 calories",
								"parentid" => "13"
				),
				array(
								"id" => "16",
								"text" => "16g fat",
								"parentid" => "13"
				),
				array(
								"id" => "17",
								"text" => "13g protein",
								"parentid" => "13"
				),
				array(
								"id" => "14",
								"text" => "Caffe Vanilla Frappuccino Light",
								"parentid" => "12"
				)
);*/

echo json_encode($treeArray);
?>