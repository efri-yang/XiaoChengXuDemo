<?php
	$page=$_REQUEST["page"];
	$page=$page ? $page :1;
	$pageCount=10;


	

	$start=($page-1)*$pageCount;
	$end=$start+$pageCount;
	$start=$start ? $start :1;
	$arr=array();
	$arr["total"]=5;
	if($page <= $arr["total"]){
		for($i=$start;$i<=$end;$i++){
			$arr["list"][]=$i;
		}
	}
	
	echo json_encode($arr);
?>