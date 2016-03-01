<?php
// Check if image file is a actual image or fake image
     $_REQUEST['target'] = $_REQUEST['table'];
     $uniqueFileName = uploadFile();
     if( $uniqueFileName || !empty($_POST['id']))
     {
        // echo "The file ". basename( $uniqueFileName). " has been uploaded.";
        //echo('ID passed: '.$_REQUEST['id']);
        //echo .$_REQUEST['table'];
        $name = array();
       //echo($_REQUEST['target']); die();
        switch($_REQUEST['target'])
        {
            case 2:
                $name[0] = $_REQUEST["txtImgName"];
                //$temp = $_REQUEST["#txtImgCat option:selected"];
                $name[1] = $_REQUEST["ddselectBox"];
                $name[2] = $_REQUEST["txtImgCaption"];
                $name[3] = ( $uniqueFileName != 1 ) ? $uniqueFileName : '';
                $name[4]= $_REQUEST['id'];
                $_REQUEST['name'] = $name;
                 if(!empty($_REQUEST['id']))
                {
                    $_REQUEST['operation'] = 'update';            
                }
                else
                {
                    $_REQUEST['operation'] = "new";
                }
                
                //print_r($name);
                break;
            case 4:
                $name[0]= $_REQUEST['txtImgName'];
                $name[1] = $_REQUEST['txtHeadCaption'];
                $name[2] = $_REQUEST['txtSubCaption'];
                $name[3] = ( $uniqueFileName != 1 ) ? $uniqueFileName : '';
                $name[4]= $_REQUEST['id'];
                //print_r($name);
                
                $_REQUEST['name'] = $name;
                if(!empty($_REQUEST['id']))
                {
                    $_REQUEST['operation'] = 'update';            
                }
                else{
                     $_REQUEST['operation'] = "new";
                }
                //echo ($_REQUEST['operation']);
                break;
        }
        
        require_once('php/DAO.php');

    } 
    else 
    {
        //echo "Sorry, there was an error uploading your file.";
        $_SESSION['error_message'] = 'Sorry, we cannot create this record right now, pls try later.';
        echo "<script>window.location = 'table.php';</script>"; 
    }
        


function uploadFile()
{
    // echo '---'.($_FILES["fileToUpload"]["name"]).'----'; die();
    if(!empty($_FILES["fileToUpload"]["name"]))
    {
        $target_dir = '';
        $target_file = '';
        $string = str_replace(' ', '', $_FILES["fileToUpload"]["name"]);
        $originalFileName = $string;
        $fileNameData = explode(".", $originalFileName);
        $uniqueFileName = $fileNameData[0].mt_rand(1111111, 999999999).date("Y-m-d_h-i-s").'.'.$fileNameData[1]; 
        
        switch($_REQUEST['target'])
        {
            case 2:
                $target_dir = "ProjectImage/";
                $target_file = $target_dir . $uniqueFileName;
                //print_r('file name: '.$uniqueFileName); 
            break;
            case 4:
                $target_dir = "uploads/";
                $target_file = $target_dir . $uniqueFileName;
            break;

        }
        
        $uploadOk = 1;
        $imageFileType = pathinfo($target_dir.$originalFileName,PATHINFO_EXTENSION);
        // print_r($imageFileType); die();
        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) 
        {
            //echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
        
        $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
        
        if($check !== false) 
        {
            //echo "<p>File is an image - " . $check["mime"] . ".</p>";
            $uploadOk = 1;
        } 
        else 
        {
            //echo "<p>File is not an image.</p>";
            $uploadOk = 0;
        }

        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) 
        {
            //echo "Sorry, your file was not uploaded.";    
            return false;
            //echo "<button>back</button>";
        } 
        else // if everything is ok, try to upload file
        {
            // print_r($_FILES["fileToUpload"]["tmp_name"]);
            if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) 
            {
                return $uniqueFileName;
            }
        }
    }
    else
    {
        return true; // For Update case
    }
}

?>