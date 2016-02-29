<?php 
$title = 'File Management';
$page = 'file';
require_once('header.php'); 
require_once('sidebar.php'); ?>

  <!-- Main Container Start -->
        <div id="mws-container" class="clearfix">
        
        	<!-- Inner Container Start -->
            <div class="container">
            
            	
                <!-- Panels Start -->
                
            	<div class="mws-panel grid_8">
                	<div class="mws-panel-header">
                    	<span><i class="icon-archive"></i> File Manager</span>
                    </div>
                    <div class="mws-panel-body no-padding no-border">
                        <div id="elfinder"></div>
                    </div>
				</div>
                
            	<div class="mws-panel grid_8">
                	<div class="mws-panel-header">
                    	<span><i class="icon-upload"></i> File Uploader</span>
                    </div>
                    <div class="mws-panel-body no-padding">
                        <div id="uploader">
                            <p>You browser doesn't have Flash, Silverlight, Gears, BrowserPlus or HTML5 support.</p>
                        </div>
                    </div>
				</div>
                
                <!-- Panels End -->
            </div>
            <!-- Inner Container End -->
<?php require_once("footer1.php")?>  
