<?php
@session_start();
@require_once("DBConnection.php");
function WriteRecords($sql){
	$result=prepareDB($sql);
	if($result){
		return 1;
	}
	else{
		return 0;
	}
}
function updateRecords($sql){
	$result=prepareDB($sql);
	if($result){
		//$_SESSION['success_message'] = 'Your record is updated successfully !!!';
		return "true";
	}
	else{
		//$_SESSION['error_message'] = 'Sorry, we cannot delete this record right now, pls try later.';
		return "false";
	}
}

function deleteRecords($sql){
	$result=prepareDB($sql);
	if($result){
		return "true";
	}
	else
		return "false";
	
}

//reading all database records
function readRecords($sql){
	$result=prepareDB($sql);
	$returnResult=array();
	while($temp=mysqli_fetch_assoc($result)){
		$returnResult[]=$temp;
	}
	//echo "in read";
	return $returnResult;
	//print_r($returnResult);
}
function getCatId($sql){
	$result=prepareDB($sql);
	if($row = mysqli_fetch_array($result)){
		return $row['ID'];
	}
	else{
		return 0;
	}
}
function getDD(){
	//$conn=getDBConnection();
	//$sql="select IMAGE_CATEGORY from project_info where IMAGE_CATEGORY in(select ID from category)";
	$sql="select NAME from category where DELETED= 0";
	$result=prepareDB($sql);
	while ($row = mysqli_fetch_array($result)){
		echo "<option>" . $row['NAME'] . "</option>";
	}
}
function prepareDB($sql){
	$conn=getDBConnection();
	$result=mysqli_query($conn,$sql) or die("error in fetching records");
	//printf(mysqli_error,$conn);
	/*
	if (!mysqli_query($conn, $sql)) {
    printf("Errormessage: %s\n", mysqli_error($conn));
	}*/
	$conn=null;
	return $result;
}
//getDD();
?>