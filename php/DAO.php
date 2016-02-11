<?php
require_once("FetchRecords.php");

function callDB(){
	$option=$_GET['operation'];
	//echo('option choosed'.$option);
	//$option="update";
	//$tableName=$_GET['table'];
	$tableName='category';

	switch($option){
		case "read":
			$sql="select * from $tableName where DELETED = 0";
			echo json_encode(readRecords($tableName,$sql));
			break;
		case "update":
			//$date = now();
			//echo($date);
			$name=$_GET['name'];
			$id=$_GET['RecId'];
			$sql="update category set NAME='$name', UPDATED = now() where ID = $id";
			echo updateRecords($tableName,$sql);
			break;
		case "delete":
			$id=$_GET['RecId'];
			//$id=1;
			$sql="update category set DELETED = 1 where ID=$id ";
			echo deleteRecords($tableName,$sql);
			break;
		case "select":
			$id=$_GET['RecId'];
			$sql="select * from category where ID=$id";
			echo json_encode(readRecords($tableName,$sql));
			break;
		case "new":
			$name = $_GET['name'];
			$sql="insert into category(NAME) values('$name')";
			echo json_encode(WriteRecords($tableName,$sql));
			break;
	}
}
callDB();
?>