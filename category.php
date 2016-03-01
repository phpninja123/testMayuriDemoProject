<?php
   $title = 'Category Management';
   $page = 'category';
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
            <span><i class="icon-camera"></i> Category
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
                     <th>Category</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody id = 'dataTableData'  targetResource='1'>
               </tbody>
            </table>
         </div>
      </div>
      <!-- modal start-->
      <div class="mws-panel grid_4" style = "display: none;">
         <div class="mws-panel-content">
            <div id="mws-form-dialog">
               <form id="mws-validate" class="mws-form" action="">
                  <div id="mws-validate-error" class="mws-form-message error" style="display:none;"></div>
                  <div class="mws-form-inline">
                     <div class="mws-form-row">
                        <label class="mws-form-label" id='lblCat'>Category Name</label>
                        <div class="mws-form-item">
                           <input type="text" name="reqField" class="required" id="catId">
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
   require_once('about_category.php');
   ?>
<script src="js/about_category.js"></script>