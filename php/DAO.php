<?php
require_once("FetchRecords.php");
function callDB()
{
    $option = $_REQUEST['operation'];
    $table  = $_REQUEST['target'];
    $selectSQL = '';
    $loadSql = '';
    $newSql = '';
    $updateSql = '';
    $name = '';
    $id = '';
    $param = '';
    switch ($table) {
        case 2:
            $tableName = 'project_info';
            if ($option == 'read') {
                $loadSql = "select p.ID, p.IMAGE,p.IMAGE_PATH, c.Name, p.CAPTION,p.CREATED, p.UPDATED from project_info p inner join category c on p.IMAGE_CATEGORY = c.ID where p.DELETED=0 and c.DELETED=0";
            }
            if ($option == 'select') {
                $id        = $_REQUEST['RecId'];
                $selectSQL = "select p.ID,p.IMAGE,p.IMAGE_PATH, c.NAME, p.CAPTION from project_info p inner join category c on p.IMAGE_CATEGORY = c.ID where p.ID = $id";
            }
            if ($option == 'new') {
                $param  = $_REQUEST['name'];
                $newSql = "insert into project_info (IMAGE, IMAGE_CATEGORY, CAPTION, IMAGE_PATH) VALUES ('$param[0]',(select ID from category where NAME= '$param[1]' and DELETED = 0),'$param[2]', '$param[3]')";
            }
            if ($option == 'update') {
                $param = $_REQUEST['name'];
                $id    = $_REQUEST['id'];
                if (empty($param[3])) {
                    $updateSql = "update project_info set IMAGE='$param[0]',IMAGE_CATEGORY = (select ID from category where Name='$param[1]'), CAPTION ='$param[2]', UPDATED = now() where ID = $id and DELETED=0";
                } else {
                    $updateSql = "update project_info set IMAGE='$param[0]',IMAGE_CATEGORY = (select ID from category where Name='$param[1]'), CAPTION ='$param[2]', IMAGE_PATH = '$param[3]', UPDATED = now() where ID = $id and DELETED=0";
                }
            }
            break;
        case 4:
            $tableName = 'slider';
            if ($option == 'read') {
                $loadSql = "select * from slider where DELETED = 0";
            }
            if ($option == 'select') {
                $id        = $_REQUEST['RecId'];
                $selectSQL = "select * from slider where ID=$id";
            }
            if ($option == 'new') {
                $param  = $_REQUEST['name'];
                $newSql = "insert into slider (IMAGE, HEAD_CAPTION, SUB_CAPTION, IMAGE_PATH) VALUES ('$param[0]','$param[1]','$param[2]', '$param[3]')";
                //print_r($newSql); 		
            }
            if ($option == 'update') {
                $param = $_REQUEST['name'];
                $id    = $_REQUEST['id'];
                if (empty($param[3])) {
                    $updateSql = "update slider set IMAGE = '$param[0]', HEAD_CAPTION = '$param[1]' , SUB_CAPTION = '$param[2]' , UPDATED = now() where  ID = $id and DELETED= 0 ";
                } else {
                    $updateSql = "update slider set IMAGE = '$param[0]', HEAD_CAPTION = '$param[1]' , SUB_CAPTION = '$param[2]', IMAGE_PATH = '$param[3]' , UPDATED = now() where  ID = $id and DELETED= 0 ";
                }
            }
            break;
    }
    switch ($option) {
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
            updateRecords($updateSql);
            if ($table == 2) {
                echo "<script>window.location = 'portfolio.php';</script>";
            } else if ($table == 4) {
                echo "<script>window.location = 'slider.php';</script>";
            }
            break;
        case "delete":
            $id  = $_REQUEST['RecId'];
            $sql = "update $tableName set DELETED = 1 where ID=$id ";
            echo deleteRecords($sql);
            break;
        case "new":
            WriteRecords($newSql);
            if ($table == 2) {
                echo "<script>window.location = 'portfolio.php';</script>";
            } else if ($table == 4) {
                echo "<script>window.location = 'slider.php';</script>";
            }
            break;
    }
}
callDB();
?>