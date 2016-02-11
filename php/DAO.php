<?php
require_once("FetchRecords.php");

function callDB(){
	$option=$_GET['operation'];
	//echo('option choosed'.$option);
	//$option="read";
	//$tableName=$_GET['table'];
	$tableName='category';

	switch($option){
		case "read":
			$sql="select * from $tableName";
			echo json_encode(readRecords($tableName,$sql));
			break;
		case "update":
			$name=$_GET['name'];
			$id=$_GET['RecId'];
			$sql="update category set NAME='$name' where ID=$id";
			echo updateRecords($tableName,$sql);
			break;
		case "delete":
			$id=$_GET['RecId'];
			//$id=1;
			$sql="delete from category where ID=$id ";
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