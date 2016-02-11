  <?php
$title = 'Home Management';
require_once('header.php'); 
require_once('sidebar.php'); ?>

<div id="mws-container" class="clearfix">
        
            <!-- Inner Container Start -->
            <div class="container">

                 <!-- data table-->
               
                <div class="mws-panel grid_8">
                    <div class="mws-panel-header">
                        <span><i class="icon-table"></i> Image Data Table</span>
                    </div>
                    <div class="mws-panel-body no-padding">
                        <button type="button" id='mws-form-dialog-mdl-btn' recid='newRec'
                         class="btn  btn-success btn-large" style="float: right;">
                         <i class="icon-plus-sign"></i>
                        </button> 
                        <table class="mws-datatable mws-table" id="dataTableData1">
                            <thead>
                                <tr>
                                   <th>ID</th>
                                    <th>About</th>
                                    <th>Image Category</th>
                                    <th>Image Caption</th>
                                    <th>Created On</th>
                                     <th>Updated On</th>
                                    <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody id = 'ImageTable' >
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
                                            <label class="mws-form-label">Category Name</label>
                                            <div class="mws-form-item">
                                                <input type="text" name="reqField" class="required" id="catId">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                 
                </div>


             <!-- Panels Start -->
                    <div class="mws-panel grid_8">
                    <div class="mws-panel-header">
                        <span><i class="icon-table"></i>Footer table</span>
                    </div>

                    <div class="mws-panel-body no-padding">
                        <table class="mws-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>About</th>
                                    <th>Created On</th>
                                    <th>Updated On</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="tdata">
                               
                            </tbody>
                        </table>
                    </div>      
                </div>
                <!-- Panels Start -->
                   
            <!-- modal end-->
               
                
            </div>
            <!-- Inner Container End -->

<?php require_once('footer.php');?>