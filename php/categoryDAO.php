<?php
require_once("fetchRecords1.php");

function callDB(){
	$option=$_REQUEST['operation'];
	//echo('option choosed'.$option);
	//$option="update";
	//$tableName=$_GET['table'];
	//$tableName='category';
	$table=$_REQUEST['target'];
	$selectSQL;
	$loadSql;
	$newSql;
	$updateSql;
	$name;
	$id;
	$param;
	switch($table){
		case 1: $tableName = 'category';
				//echo ' '.$tableName.' '.$option;
				if($option == 'read'){
					$loadSql="select * from category where DELETED = 0";
				}
				if($option == 'select'){
					$id=$_REQUEST['RecId'];
					$selectSQL="select * from category where ID=$id";
				}
				if($option=='update')
				{
					$name = $_REQUEST['name'] ;
					//check same name for current record
					$match = "select NAME from category where NAME= '$name' and DELETED= 0 ";
					$result= readRecords($match); 
					if($result){
						echo 'duplicate';
						return;
					}
					else
					{
						$id = $_REQUEST['RecId'];
						$match = "select NAME from category where NAME = '$name' and ID != $id and DELETED = 0 ";
						$result= readRecords($match);
						//print_r($result);
						if($result){
							//echo('in second update');
							echo 'duplicate'; 
							return;
						}
						else
						{
							//print_r('in update');
							$updateSql="update category set NAME='$name', UPDATED = now() where ID = $id and deleted=0";		
							//print_r($updateSql); 
						}
					}
				}
				if($option == "new"){
					$name = $_REQUEST['name'] ;
					//check same name for current record
					$match = "select NAME from category where NAME= '$name' and DELETED= 0 ";
					$result= readRecords($match); 
					if($result){
						echo 'duplicate';
						return;
					}
					else{
						$newSql="insert into category(NAME) values('$name')";
					}
				}
		break;
		
		case 3: 
			$tableName = 'footer_info';
				//echo ' '.$tableName.' '.$option;
				if($option == 'read'){
					$loadSql="select * from footer_info where DELETED = 0";
				}
				if($option == 'select'){
					$id=$_REQUEST['RecId'];
					$selectSQL="select * from footer_info where ID=$id";
				}
				if($option=='new'){
					$name = $_REQUEST['name'];
					//echo($name);
					$newSql="insert into footer_info(ABOUT) values('$name')";
				}
				if($option=='update'){
					$name = $_REQUEST['name'];
					$id = $_REQUEST['RecId'];
					$updateSql="update footer_info set ABOUT='$name', UPDATED = now() where ID = $id and deleted=0";
				}
		break;
		
	}
	//echo($table);
	switch($option){
		case "read":
			//callread();
			echo json_encode(readRecords($loadSql));
			break;
		case "select":
			echo json_encode(readRecords($selectSQL));
			break;
		case "update":
			//$date = now();
			//echo($date);
			//echo('in update'); die();
			echo updateRecords($updateSql);
			//echo "<script>window.location = 'fileUpload.php';</script>";
			break;
		case "delete":
			$id=$_REQUEST['RecId'];
			$sql="update $tableName set DELETED = 1 where ID=$id ";
			echo deleteRecords($sql);
			break;
		case "new":
			echo json_encode(WriteRecords($newSql));
			break;
	}

}
callDB();
//callImageUpload();
?>