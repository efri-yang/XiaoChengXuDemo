<?php
	$id=$_POST["id"];

	$arr=array(
		"step"=>1,
		"customerInfo"=>array("username"=>"余先生","phone"=>"18106968460"),
		"orderInfo"=>array("num"=>123456789,"time"=>"2018.04.11 13:13","person"=>"小编麦芽"),
		"decorateInfo"=>array("xqmc"=>"万科集团01","zxjd"=>"新订单","fwmj"=>"100㎡","qwfg"=>"简约风格","fwqk"=>"毛呸房","zxys"=>"未填写","fwhx"=>"2室1厅1厨1卫0阳台","zxsj"=>"3月21日")
	);
	echo json_encode($arr);
?>