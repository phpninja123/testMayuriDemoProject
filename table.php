  <?php
$title = 'Home Management';
$page = 'table';
require_once('header.php'); 
require_once('sidebar.php'); ?>

 <!-- Main Container Start -->
        <div id="mws-container" class="clearfix">
        <!-- Inner Container Start -->
            <div class="container">     
                  
                <!-- data table-->
                <div class="mws-panel grid_8">
                     
                    <div class="mws-panel-header">
                        <span><i class="icon-table"></i> Image Data Table
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
                                    <th>Image Name</th>
                                    <th>Image category</th>
                                    <th>Image caption</th>
                                    <th>Created On</th>
                                    <th>Updated On</th>
                                    <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody id = 'imageDataTable' targetResource='2'>
                            </tbody>
                        </table>
                       
                    </div>
                </div>

                <!-- modal start-->
                <div class="mws-panel grid_4" style = "display: none;">
                        <div class="mws-panel-content">                           
                            <div id="mws-form-dialog">
                                <form id="mws-validate" class="mws-form" action="form_elements.html">
                                    <div id="mws-validate-error" class="mws-form-message error" style="display:none;"></div>
                                    <div class="mws-form-inline">
                                        

                                         <div class="mws-form-row">
                                             <label class="mws-form-label" id='lblImgName'>Image Name</label>
                                            <div class="mws-form-item">
                                                <input type="text" name="reqField" class="required" id="txtImgName" value='test'>
                                            </div>
                                        </div>

                                        <div class="mws-form-row">
                                            <label class="mws-form-label" id='lblImgCaption'>Image Caption</label>
                                            <div class="mws-form-item">
                                                <input type="text" name="reqField" class="required" id="txtImgCaption" value='test'>
                                            </div>
                                        </div>

                                         <div class="mws-form-row">
                                            <label class="mws-form-label" id='lblImgCat'>Image Category</label>
                                            <div class="mws-form-item" id='txtImgCat'>
                                                <select class="required" name="selectBox">
                                                   <?php require_once("php/GetDropDown.php"); ?>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
                
            <!-- modal end-->
 

            </div>

            <!-- Inner Container End -->
     

<?php require_once('footer.php');?>