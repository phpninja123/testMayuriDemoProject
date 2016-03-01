<?php
   $title = 'About';
   $page  = 'about';
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
            <span><i class="icon-user"></i> About
            <button type="button" id='mws-form-dialog-mdl-btn' recid='newRec'
               class="btn btn-success" style="float: right;">
            <i class="icon-plus-sign"></i>Add About
            </button>
            </span>
         </div>
         <div class="mws-panel-body no-padding">
            <table class="mws-datatable mws-table" id="dataTableData1">
               <thead>
                  <tr>
                     <th>About</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody id = 'footerDataTable' targetResource='3'>
               </tbody>
            </table>
         </div>
      </div>
      <div class="mws-panel grid_8">
         <div class="mws-panel-header">
            <span><i class="icon-pencil-2"></i> WYSIWYG Editor</span>
         </div>
         <div class="mws-panel-body no-padding">
            <form class="mws-form" action="form_elements.html">
               <div class="mws-form-row">
                  <label class="mws-form-label">WYSIWYG</label>
                  <div class="mws-form-item">
                     <textarea id="cleditor" class="large"></textarea>
                  </div>
               </div>
               <div class="mws-button-row">
                  <input type="submit" value="Submit" class="btn btn-danger">
               </div>
            </form>
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
                        <label class="mws-form-label">About</label>
                        <div class="mws-form-item">
                           <textarea rows="" cols="" class="large autosize" id="txtAbout"></textarea>
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
