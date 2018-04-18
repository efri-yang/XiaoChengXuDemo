<?php  
	$conn=mysql_connect("bdm300375458.my3w.com","bdm300375458","mysql3862749");
	if(!$conn){
		die('Could not connect: ' . mysql_error());
	}else{
	  mysql_select_db("bdm300375458_db",$conn);
	  mysql_query("set names utf8");
   }


	// $conn=@mysql_connect("localhost","root","yyh");
	// if(!$conn){
	// 	die('Could not connect: ' . mysql_error());
	// }else{
	//   mysql_select_db("test",$conn);
	//   mysql_query("set names utf8");
 //   }
?>

