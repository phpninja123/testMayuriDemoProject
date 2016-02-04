<?php require_once('header.php'); 
require_once('sidebar.php'); ?>
        
        <!-- Main Container Start -->
        <div id="mws-container" class="clearfix">
        
            <!-- Inner Container Start -->
            <div class="container">
             <!-- Panels Start -->
                    <div class="mws-panel grid_8">
                    <div class="mws-panel-header">
                        <span><i class="icon-table"></i> Category table</span>
                    </div>

                    <div class="mws-panel-body no-padding">
                        <table class="mws-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Category Name</th>
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
                <!-- modal start-->
                <div class="mws-panel grid_4">
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
                
            <!-- modal end-->
               
                
            </div>
            <!-- Inner Container End -->
                     
<?php require_once('footer.php');?>