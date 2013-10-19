<?php
$treeArray = array(
				array(
								"text" => "Chocolate Beverage",
								"id" => "1",
								"parentid" => "-1"
				),
				array(
								"id" => "2",
								"parentid" => "1",
								"text" => "Hot Chocolate"
				),
				array(
								"id" => "3",
								"parentid" => "1",
								"text" => "Peppermint Hot Chocolate"
				),
				array(
								"id" => "4",
								"parentid" => "1",
								"text" => "Salted Caramel Hot Chocolate"
				),
				array(
								"id" => "5",
								"parentid" => "1",
								"text" => "White Hot Chocolate"
				),
				array(
								"id" => "6",
								"text" => "Espresso Beverage",
								"parentid" => "-1"
				),
				array(
								"id" => "7",
								"parentid" => "6",
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
);
/*
$data = [];
$children = [];
// build hierarchical source.
for (i = 0; i < count($treeArray); i++) {
    $item = $treeArray[i];
    $label = $item["text"];
    $parentid = $item["parentid"];
    $id = $item["id"];

    if ($children[parentid]) {
        $item = array( parentid => $parentid, label => $label, item => $item );
        if (!$children[$parentid][children]) {
            $children[$parentid][children] = Array();
        }
        $children[$parentid][children[count($children[$parentid][children])]] = $item;
        $children[id] = $item;
    }
    else {
        $children[id] = array( parentid => $parentid, label => $label, item => $item );
        $data[id] = $children[id];
    }
}
*/

echo json_encode($treeArray);
?>