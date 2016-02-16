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
                                                <input type="text" name="reqField" class="required" id="txtImgName" >
                                            </div>
                                        </div>
                                    
                                        <div class="mws-form-row">
                                            <label class="mws-form-label" id='lblImgCaption'>Image Caption</label>
                                            <div class="mws-form-item">
                                                <input type="text" name="reqField" class="required" id="txtImgCaption" >
                                            </div>
                                        </div>
                                        <div class="mws-form-row">
                                            <label class="mws-form-label" id='lblImgCat'>Image Category</label>
                                            <div class="mws-form-item" id='txtImgCat'>
                                                <select class="required" name="selectBox">
                                                   <?php require_once("GetDropDown.php"); ?>
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