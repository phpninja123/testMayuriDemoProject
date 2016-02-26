<?php

$target_dir = "uploads/";   
    $uploadOk = 1;
    // Check if image file is a actual image or fake image
    if(isset($_POST["Submit"])) {   
    $target_file = $target_dir . basename($_FILES["picture"]["name"]); 
    echo $target_file;    
            if (move_uploaded_file($_FILES["picture"]["tmp_name"], $target_file)) {
                require_once("php/DAO.php");
                echo "The file ". basename( $_FILES["picture"]["name"]). " has been uploaded.";
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
    }
?>