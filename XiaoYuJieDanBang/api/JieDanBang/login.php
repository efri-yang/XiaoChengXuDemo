<?php


	include("conn.php");

  if($_POST["id"]){
      $id=$_POST["id"];
      $sql="select id,username,nickname,avatar from test_user where id='$id'";
  }else{
      $username=$_POST["username"];
	    $password=md5($_POST["password"]);
      $sql="select id,username,nickname,avatar from test_user where username='$username' and password='$password'";
  }

	
	


	// $resData["username"]=$username;
	// $resData["password"]=$password;

	// $username="yyh1";
	// $password="96e79218965eb72c92a549dd5a330112";
	// $sql="select id,username,nickname,avatar from test_user where username='yyh1' and password='96e79218965eb72c92a549dd5a330112'";
	
	$result=mysql_query($sql,$conn);

	$dataArr=mysql_fetch_assoc($result);
	$resData=array();

	if($dataArr){
		$resData=["error"=>0,"XyUserInfo"=>$dataArr];
	}else{
		$resData=["error"=>1,"msg"=>"请输入正确的账户和密码！"];
	}


	echo json_encode($resData);

?>