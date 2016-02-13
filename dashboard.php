<?php
$title = 'Category Management';
$page = 'dashboard';
$target = 1;
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
                        <span><i class="icon-table"></i> Category Data Table
                           <button type="button" id='mws-form-dialog-mdl-btn' recid='newRec'
                         class="btn btn-success" style="float: right;">
                         <i class="icon-plus-sign"></i>Add New Category
                        </button>
                        </span>
                    </div>
                    <div class="mws-panel-body no-padding">
                        <table class="mws-datatable mws-table" id="dataTableData1">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
                                    <th>Created On</th>
                                    <th>Updated On</th>
                                    <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody id = 'dataTableData'  targetResource='1'>
                            </tbody>
                        </table>
                    </div>
                </div>
               <?php require_once('php/Modal.php'); ?>              
                
            </div>
            <!-- Inner Container End -->
                     
<?php
require_once('footer.php');
?>