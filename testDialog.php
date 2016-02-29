   <?php require_once('php/DAODummy.php'); ?>
   <!-- modal start-->
                <div class="mws-panel grid_4" style = "display: none;">
                        <div class="mws-panel-content">                           
                            <div id="mws-form-dialog">
                                <form id="getSliderImage" class="mws-form" operation="" action="<?php echo $_SERVER['PHP_SELF']; ?>" enctype="multipart/form-data" method="post" onsubmit="">
                                    <div id="mws-validate-error" class="mws-form-message error" style="display:none;"></div>
                                    <div class="mws-form-inline">

                                         <div class="mws-form-row">
                                             <label class="mws-form-label" id='lblImgName'>Image Name</label>
                                            <div class="mws-form-item">
                                                <input type="text" name="reqField" class="required" id="txtImgName" name = "txtImgName" >
                                            </div>
                                        </div>

                                        <div class="mws-form-row">
                                            <label class="mws-form-label" id='lblImgCaption'>Head Caption</label>
                                            <div class="mws-form-item">
                                                <input type="text" name="txtHeadCaption" class="required" id="txtHeadCaption" >
                                            </div>
                                        </div>

                                         <div class="mws-form-row">
                                            <label class="mws-form-label" id='lblImgCat'>Sub Caption</label>
                                            <div class="mws-form-item">
                                               <input type="text" name="txtSubCaption" class="required" id="txtSubCaption">
                                            </div>
                                        </div>

                                         <div class="mws-form-row">
                                            <label class="mws-form-label">File Input Validation</label>
                                            <div class="mws-form-item">
                                                <input type="file" name="fileToUpload" id="fileToUpload" class="required">
                                                <label for="picture" class="error" generated="true" style="display:none"></label>
                                            </div>
                                        </div>

                                    </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                </div>
                
            <!-- modal end-->
