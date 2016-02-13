<?php
require_once("FetchRecords.php");

function callDB(){
	$option=$_GET['operation'];
	//echo('option choosed'.$option);
	//$option="update";
	//$tableName=$_GET['table'];
	//$tableName='category';
	$table=$_GET['target'];
	$newSql;
	$updateSql;
	$name;
	$id;
	switch($table){
		case 1: $tableName = 'category';
				if($option=='update' || $option=='new'){
				$name = $_GET['name'];
				$newSql="insert into $tableName(NAME) values('$name')";
				}
				if($option=='update'){
				$id = $_GET['RecId'];
				$updateSql="update $tableName set NAME='$name', UPDATED = now() where ID = $id";
				}
				
				
		break;
		case 2: $tableName = 'project_info';
				//INSERT INTO `project_info`(`IMAGE`, `IMAGE_CATEGORY`, `CAPTION`) VALUES ('test','2','test image')
		break;
		case 3: $tableName = 'footer_info';
		break;
	}
	//echo($table);
	switch($option){
		case "read":
			$sql="select * from $tableName where DELETED = 0";
			echo json_encode(readRecords($tableName,$sql));
			break;
		case "update":
			//$date = now();
			//echo($date);
			echo updateRecords($tableName,$updateSql);
			break;
		case "delete":
			$id=$_GET['RecId'];
			//$id=1;
			$sql="update $tableName set DELETED = 1 where ID=$id ";
			echo deleteRecords($tableName,$sql);
			break;
		case "select":
			$id=$_GET['RecId'];
			$sql="select * from $tableName where ID=$id";
			echo json_encode(readRecords($tableName,$Sql));
			break;
		case "new":
			echo json_encode(WriteRecords($tableName,$newSql));
			break;
	}
}
callDB();
?>