<!--<!DOCTYPE html>
<html>
<body>

<form action="upload.php" method="post" enctype="multipart/form-data">
    Select image to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload Image" name="submit">
</form>

</body>
</html>-->

<?php
$title = 'Slider';
$page = 'slider';
require_once('header.php'); 
require_once('sidebar.php');
?>

 <!-- Main Container Start -->
        <div id="mws-container" class="clearfix">
        <!-- Inner Container Start -->
            <div class="container">     
                
                <!-- data table-->
                <div class="mws-panel grid_8">
                     
                    <div class="mws-panel-header">
                        <span><i class="icon-table"></i> Slider Data Table
                           <button type="button" id='mws-form-dialog-mdl-btn' recid='newRec'
                         class="btn btn-success" style="float: right;">
                         <i class="icon-plus-sign"></i>Add New Slider Image
                        </button>
                        </span>
                    </div>
                    <div class="mws-panel-body no-padding">
                        <table class="mws-datatable mws-table" id="dataTableData1">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Image Name</th>
                                    <th>Image Path</th>
                                    <th>Head Caption</th>
                                    <th>Sub caption</th>
                                    <th>Created On</th>
                                    <th>Updated On</th>
                                    <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody id = 'sliderDataTable' targetResource='4'>

                            </tbody>
                        </table>
                       
                    </div>
                </div>
            </div>
            <?php require_once('testDialog.php'); ?>

            <!-- Inner Container End -->
     

<?php require_once('footer.php');?>
<script type="text/javascript" src="js/common.js"></script>