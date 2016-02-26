<?php
require_once("FetchRecords.php");
/*
function callImageUpload(){
	$selectSQL;
	//$loadSql;
	$newSql;
	//$updateSql;
	$name;
	$id;
	$param;
			$tableName = 'slider';
			$id=8;
			$selectSQL="select * from slider where ID=$id";
			//$name = implode(' ',$_POST['txtImgName']);
			//$param= explode(' ', $name);
			$name = $_POST['txtImgName'];
			//$newSql="insert into slider (IMAGE, IMAGE_PATH, HEAD_CAPTION, SUB_CAPTION) VALUES ('$param[0]','$param[1]','$param[2]')";
			$newSql="insert into slider (IMAGE) VALUES ('$name')";
			print_r($newSql);
			echo((WriteRecords($newSql));
}*/
function callDB(){
	$option=$_GET['operation'];
	//echo('option choosed'.$option);
	//$option="update";
	//$tableName=$_GET['table'];
	//$tableName='category';
	$table=$_GET['target'];
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
					$id=$_GET['RecId'];
					$selectSQL="select * from category where ID=$id";
				}
				if($option=='update' || $option=='new'){
					$name = implode('',$_GET['name']);
					$match = "select NAME from category where NAME= '$name' and DELETED= 0 ";
					//echo($match);
					$result= readRecords($match);
					//print_r($result);
					if($result){
						echo 'duplicate';
						return;
					}
					$newSql="insert into category(NAME) values('$name')";
				}
				if($option=='update'){
				$id = $_GET['RecId'];
				$match = "select NAME from category where NAME= '$name' and ID != $id DELETED= 0 ";
					//echo($match);
					$result= readRecords($match);
					//print_r($result);
					if($result){
						echo 'duplicate';
						return;
					}
				$updateSql="update category set NAME='$name', UPDATED = now() where ID = $id and deleted=0";
				}				
		break;
		case 2: $tableName = 'project_info';
				if($option == 'read'){
					$loadSql="select p.ID, p.IMAGE, c.Name, p.CAPTION,p.CREATED, p.UPDATED from project_info p inner join category c on p.IMAGE_CATEGORY = c.ID where p.DELETED=0 and c.DELETED=0";
				}
				if($option== 'select'){
					$id=$_GET['RecId'];
					$selectSQL ="select p.IMAGE, c.NAME, p.CAPTION from project_info p inner join category c on p.IMAGE_CATEGORY = c.ID where p.ID = $id";
				}
				if($option=='update' || $option=='new'){
				$name = implode(' ',$_GET['name']);
				$param= explode(' ', $name);				
				$newSql="insert into project_info (IMAGE, IMAGE_CATEGORY, CAPTION) VALUES ('$param[0]',(select ID from category where NAME= '$param[1]' and DELETED = 0),'$param[2]')";
				}
				if($option=='update'){
				$id = $_GET['RecId'];
				$updateSql="update project_info set IMAGE='$param[0]',IMAGE_CATEGORY = (select ID from category where Name='$param[1]'), CAPTION ='$param[2]', UPDATED = now() where ID = $id and DELETED=0";
				}
		break;
		case 3: 
			$tableName = 'footer_info';
				//echo ' '.$tableName.' '.$option;
				if($option == 'read'){
					$loadSql="select * from footer_info where DELETED = 0";
				}
				if($option == 'select'){
					$id=$_GET['RecId'];
					$selectSQL="select * from footer_info where ID=$id";
				}
				if($option=='update' || $option=='new'){
					$name = implode('',$_GET['name']);
					/*$match = "select NAME from category where NAME= '$name' and ID= DELETED= 0 ";
					//echo($match);
					$result= readRecords($match);
					//print_r($result);
					if($result){
						echo 'duplicate';
						return;
					}*/
					$newSql="insert into footer_info(ABOUT) values('$name')";
				}
				if($option=='update'){
				$id = $_GET['RecId'];/*
				$match = "select NAME from category where NAME= '$name' and ID != $id DELETED= 0 ";
					//echo($match);
					$result= readRecords($match);
					//print_r($result);
					if($result){
						echo 'duplicate';
						return;
					}*/
				$updateSql="update footer_info set ABOUT='$name', UPDATED = now() where ID = $id and deleted=0";
				}
		break;
		case 4:
			$tableName = 'slider';
			if($option == 'read'){
					$loadSql="select * from slider where DELETED = 0";
				}
			if($option == 'select'){
					$id=$_GET['RecId'];
					$selectSQL="select * from slider where ID=$id";
				}
			if($option=='update' || $option=='new'){
					$name = implode(' ',$_GET['name']);
					$param= explode(' ', $name);
					//print_r($param);
					/*$match = "select NAME from footer_info where NAME= '$name' and ID= DELETED= 0 ";
					//echo($match);
					$result= readRecords($match);
					//print_r($result);
					if($result){
						echo 'duplicate';
						return;
					}*/
					$newSql="insert into slider (IMAGE, HEAD_CAPTION, SUB_CAPTION) VALUES ('$param[0]','$param[1]','$param[2]')";
					
			}
			if($option=='update'){
				$id = $_GET['RecId'];
				//print_r($id);
				$updateSql="update slider set IMAGE = '$param[0]', HEAD_CAPTION = '$param[1]' , SUB_CAPTION = '$param[2]' , UPDATED = now() where  ID = $id and DELETED= 0 ";
				print_r($updateSql);
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
			echo updateRecords($updateSql);
			break;
		case "delete":
			$id=$_GET['RecId'];
			//$id=1;
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