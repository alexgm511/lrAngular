<?php
require_once 'dbHelper.php';
$db = new dbHelper(); // functions to facilitate interaction with database

	// Return all rows from both products and productDetails tables
	$rows = $db->select("products",array());
	$detRows = $db->select("productDetails",array());
	$_allProds = array();
	
	// Build a dataset with only the necessary fields 
	foreach ($rows['data'] as $p) {
		$_prod = array();
		$_sizes = array();
		foreach ($p as $k=>$v) {
			if (($k == "type") || ($k == "title") || ($k == "description") ||
			($k == "image") || ($k == "smImage") || ($k == "id")) {
				$_prod[$k] = $v;
			}
		}
		// join the details (model sizes) with the main product dataset
		foreach ($detRows['data'] as $d) {
			$_size = array();
			if ($d['productId'] == $_prod['id']) {
				foreach ($d as $kk=>$vv) {
					if (($kk == "sku") || ($kk == "skuDescription") ||
					($kk == "price") || ($kk == "count")) {
						$_size[$kk] = $vv;
					}
				}
				$_sizes[] = $_size;
			}
		}
		$_prod['sizes'] = $_sizes;
		$_allProds[] = $_prod;
	}
	// return a JSON dataset 
	print_r(json_encode($_allProds,JSON_NUMERIC_CHECK));

?>