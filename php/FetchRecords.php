<?php
require_once("DBConnection.php");
function WriteRecords($tableName, $sql){
	$result=prepareDB($sql);
	if($result){
		return "true";
	}
	else{
		return "false";
	}
}
function updateRecords($tableName,$sql){
	$result=prepareDB($sql);
	if($result){
		return "true";
	}
	else{
		return "false";
	}
}

function deleteRecords($tableName,$sql){
	$result=prepareDB($sql);
	if($result){
		return "true";
	}
	else
		return "false";
	
}

//reading all database records
function readRecords($tableName,$sql){
	$result=prepareDB($sql);
	$returnResult=array();
	while($temp=mysqli_fetch_assoc($result)){
		$returnResult[]=$temp;
	}
	//echo "in read";
	return $returnResult;
	//print_r($returnResult);
}
function prepareDB($sql){
	$conn=getDBConnection();
	$result=mysqli_query($conn,$sql) or die("error in fetching records");
	$conn=null;
	return $result;
}

?>