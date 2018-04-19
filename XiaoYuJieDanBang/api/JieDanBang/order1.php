<?php 
	$arr=array();
  $type=$_REQEST["type"];

    $arr["orderCount"]=array(
			'xdd'=>8699,
			'ylf'=>1926,
			'ysj'=>1542,
			'yqy'=>6669,
			'ysx'=>1926
		);
  if($type=="orderall"){
    $arr["list"]=array(
			array("id"=>1,"time"=>"04-10 15:00","username"=>"余先生1","phone"=>18559160001,"address"=>"万科0001万科","isNew"=>1),
			array("id"=>2,"time"=>"04-10 15:00","username"=>"余先生2","phone"=>18559160002,"address"=>"万科0002万科","isNew"=>2),
			array("id"=>3,"time"=>"04-10 15:00","username"=>"余先生3","phone"=>18559160003,"address"=>"万科0003万科","isNew"=>3),
			array("id"=>4,"time"=>"04-10 15:00","username"=>"余先生4","phone"=>18559160004,"address"=>"万科0004万科"),
			array("id"=>5,"time"=>"04-10 15:00","username"=>"余先生5","phone"=>18559160005,"address"=>"万科0005万科"),
			array("id"=>6,"time"=>"04-10 15:00","username"=>"余先生6","phone"=>18559160006,"address"=>"万科0006万科"),
			array("id"=>7,"time"=>"04-10 15:00","username"=>"余先生7","phone"=>18559160007,"address"=>"万科0007万科"),
			array("id"=>8,"time"=>"04-10 15:00","username"=>"余先生8","phone"=>18559160008,"address"=>"万科0008万科")
		)
  }else if($type=="orderxdd"){
    $arr["list"]=array(
			array("id"=>1,"time"=>"04-10 15:00","username"=>"余先生1","phone"=>18559160001,"address"=>"万科0001万科","isNew"=>1),
			array("id"=>2,"time"=>"04-10 15:00","username"=>"余先生2","phone"=>18559160002,"address"=>"万科0002万科","isNew"=>2),
			array("id"=>3,"time"=>"04-10 15:00","username"=>"余先生3","phone"=>18559160003,"address"=>"万科0003万科","isNew"=>3)
		)
  }else if($type=="orderylf"){
    $arr["list"]=array(
			array("id"=>1,"time"=>"04-10 15:00","username"=>"量房先生1","phone"=>18559160001,"address"=>"万科0001万科","isNew"=>0),
			array("id"=>2,"time"=>"04-10 15:00","username"=>"量房先生2","phone"=>18559160002,"address"=>"万科0002万科","isNew"=>0),
			array("id"=>3,"time"=>"04-10 15:00","username"=>"量房先生3","phone"=>18559160003,"address"=>"万科0003万科","isNew"=>0)
		)
  }else if($type=="orderysj"){
    $arr["list"]=array(
			array("id"=>1,"time"=>"04-10 15:00","username"=>"已设计先生1","phone"=>18559160001,"address"=>"万科0001万科","isNew"=>0),
			array("id"=>2,"time"=>"04-10 15:00","username"=>"已设计先生2","phone"=>18559160002,"address"=>"万科0002万科","isNew"=>0),
			array("id"=>3,"time"=>"04-10 15:00","username"=>"已设计先生3","phone"=>18559160003,"address"=>"万科0003万科","isNew"=>0)
		)
  }else if($type=="orderyqy"){
    $arr["list"]=array(
			array("id"=>1,"time"=>"04-10 15:00","username"=>"已签约先生1","phone"=>18559160001,"address"=>"万科0001万科","isNew"=>0),
			array("id"=>2,"time"=>"04-10 15:00","username"=>"已签约先生2","phone"=>18559160002,"address"=>"万科0002万科","isNew"=>0),
			array("id"=>3,"time"=>"04-10 15:00","username"=>"已签约先生3","phone"=>18559160003,"address"=>"万科0003万科","isNew"=>0)
		)
  }else if($type=="orderysx"){
    $arr["list"]=array(
			array("id"=>1,"time"=>"04-10 15:00","username"=>"已失效先生1","phone"=>18559160001,"address"=>"万科0001万科","isNew"=>0),
			array("id"=>2,"time"=>"04-10 15:00","username"=>"已失效先生2","phone"=>18559160002,"address"=>"万科0002万科","isNew"=>0),
			array("id"=>3,"time"=>"04-10 15:00","username"=>"已失效先生3","phone"=>18559160003,"address"=>"万科0003万科","isNew"=>0)
		)
  }
	

	echo json_encode($arr);
?>