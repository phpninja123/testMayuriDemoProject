<?php
   $title = 'Portfolio Management';
   $page  = 'portfolio';
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
            <span><i class="icon-picassa"></i>Portfolio
            <button type="button" id='mws-form-dialog-mdl-btn' recid='newRec'
               class="btn btn-success" style="float: right;">
            <i class="icon-plus-sign"></i>Add New Project
            </button>
            </span>
         </div>
         <div class="mws-panel-body no-padding">
            <table class="mws-datatable mws-table" id="dataTableData1">
               <thead>
                  <tr>
                     <th>Category</th>
                     <th>Image</th>
                     <th>Image caption</th>
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
               <form id="mws-validate" class="mws-form" action="upload.php" enctype="multipart/form-data" method="post">
                  <input type="hidden" name='table' id="table" value='2'> 
                  <input type="hidden" name='id' id="id" value=''> 
                  <div id="mws-validate-error" class="mws-form-message error" style="display:none;"></div>
                  <div class="mws-form-inline">
                     <div class="mws-form-row">
                        <label class="mws-form-label" id='lblImgName'>Image Name</label>
                        <div class="mws-form-item">
                           <input type="text" name="txtImgName" class="required" id="txtImgName" >
                        </div>
                     </div>
                     <div class="mws-form-row">
                        <label class="mws-form-label" id='lblImgCaption'>Image Caption</label>
                        <div class="mws-form-item">
                           <input type="text" name="txtImgCaption" class="required" id="txtImgCaption" >
                        </div>
                     </div>
                     <div class="mws-form-row">
                        <label class="mws-form-label" id='lblImgCat'>Category</label>
                        <div class="mws-form-item" id='txtImgCat'>
                           <select class="required" name="ddselectBox" id="ddselectBox">
                           <?php require_once("php/GetDropDown.php"); ?>
                           </select>
                        </div>
                     </div>
                     <div class="mws-form-row">
                        <label class="mws-form-label">Choose File</label>
                        <div class="mws-form-item">
                           <input type="file" name="fileToUpload" id="fileToUpload" class="required">
                           <label for="picture" class="error" generated="true" style="display:none"></label>
                        </div>
                        <div class="mws-form-item">
                           <img id="fileImg" src="" height="100" width= "100">
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
<?php
   require_once('portfolio_slider.php');
   ?>
<script type="text/javascript" src="js/portfolio_slider.js"></script>