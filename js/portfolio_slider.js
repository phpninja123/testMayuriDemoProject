$(document).ready(function() {
    pageLoad();

});
function pageLoad(){
    //get identifier for table
    var targetresource = $('tbody').attr('targetResource');
    //alert('loading records'+targetresource);
    loadRecords(targetresource);
    //enableModal(targetresource);
    
    $(document).on("click", "#mws-form-dialog-mdl-btn", function(event) {
        $(".ui-icon").remove();
        $(".ui-dialog-titlebar-close").remove();
        var titleDisplay = '';
       if(targetresource == 2){
            titleDisplay = ' Project';
       }
       else if(targetresource == 4){
            titleDisplay = ' Slider Image';
       }
        //('ui-icon ui-icon-closethick');
        //$(".ui-dialog-titlebar-close").removeClass('ui-dialog-titlebar-close-ui-corner-all');
        validator = $("#form#mws-validate").validate();
        var temp = $(this).attr('recid');
        if (temp == 'newRec') {
            // $("#catId").val("");
            //alert(temp);
            $("#mws-form-dialog").dialog("option", {
                modal: true,
                title: "Add"+ titleDisplay,
                buttons: [{
                    text: "Submit",
                    name: "submit",
                    //id: "btnSubmit",
                    click: function() 
                    {
                        
                        if(($("#table").val() == 4) || ($("#table").val() == 2))
                        {
                            //alert('adding records...');
                            var isValid = $(this).find('form#mws-validate').valid();
                            if (isValid) {
                                $("#mws-validate").submit();
                                loadRecords();
                            }

                        }
                    }

                }, {
                    text: "Close Dialog",
                    click: function() {
                        $(this).dialog("close");
                        $("#mws-validate")[0].reset();
                        $("#mws-validate-error").hide();
                        $("#fileImg").attr("src","");
                        validator.resetForm();
                    }
                }]
            }).dialog("open");
        } 
        else 
        {
            $("#mws-form-dialog").dialog("option", {
                modal: true,
                title: "Edit " + titleDisplay,
                buttons: [{
                    text: "Update",
                    id: "btnUpdate",
                    click: function() 
                    {
                        //var validator = $("form#mws-validate").validate();
                        var isValid = $(this).find('form#mws-validate').valid();
                        if(($("#table").val() == 4) || ($("#table").val() == 2))
                        {
                            //alert('hi...');
                            if (isValid) {
                                $("#mws-validate").submit();
                            }
                        }
                    }
                        
                }, {
                    text: "Close Dialog",
                    click: function() {
                        $(this).dialog("close");
                        $("#mws-validate")[0].reset();
                        validator.resetForm();
                        $("#fileImg").attr("src","");
                    }
                }]
            }).dialog("open");
            //code for select
            populateModal(temp,targetresource);
        }

    });

//delete records
    $(document).on("click", "#btnDelete", function() {
        var result = confirm("Are u sure want to delete this record?");
        if (!result) {
            return false;
        } else {
            var temp = $(this).attr('recid');
            deleteRecords(temp, targetresource);
            $("#mws-validate")[0].reset();
            validator.resetForm();
        }
    });

}


function loadRecords(targetresource) {
   // alert(targetresource);
    $.ajax({
        url: "php/DAO.php",
        method: "post",
        data: {
            operation: "read",
            target: targetresource
        },
        datatype: JSON,
        success: function(data) {
            console.log(data);
            if (data) {
                var displayData = JSON.parse(data);
                console.log(displayData);
                var displayHtml = "";

                switch (targetresource) {
                    case '2':
                        $.each(displayData, function(k, v) {
                            //console.log(k.Name);
                            console.log(v.IMAGE_PATH);
                            displayHtml += "<tr><td>" + v.Name + "</td><td><img src=ProjectImage/"+ v.IMAGE_PATH +" width='30' height='30'></td><td>" + v.CAPTION + "</td><td><center><button id='mws-form-dialog-mdl-btn' recid='" + v.ID + "' class='btn btn-success'><i class='icon-pencil'></i></button>&nbsp;<button  class='btn btn-danger' id='btnDelete' recid='" + v.ID + "'><i class='icon-remove-sign'></i></button></center></td></tr>";
                        });
                        $("#imageDataTable").html(displayHtml);
                        break;
                    case '4':
                        $.each(displayData, function(k, v) {
                            //console.log(k.Name);
                            displayHtml += "<tr><td><center><img src=uploads/" + v.IMAGE_PATH + " width='30' height='30'></center></td><td>" + v.HEAD_CAPTION + "</td><td>" + v.SUB_CAPTION + "</td><td><center><button id='mws-form-dialog-mdl-btn' recid='" + v.ID + "' class='btn btn-success'><i class='icon-pencil'></i></button>&nbsp;<button  class='btn btn-danger' id='btnDelete' recid='" + v.ID + "'><i class='icon-remove-sign'></i></button></center></td></tr>";
                        });
                        $("#sliderDataTable").html(displayHtml);
                    break;

                }
            
                if ($.fn.dataTable) {
                    $(".mws-datatable").dataTable();
                    $(".mws-datatable-fn").dataTable({
                        sPaginationType: "full_numbers"
                    });
                } else {
                    alert("error");
                }
            }
        }
    });
}

function populateModal(temp, targetresource){
                $.ajax({
                url: "php/DAO.php",
                method: "get",
                data: {
                    RecId: temp,
                    operation: "select",
                    target: targetresource
                },
                success: function(data) {
                    //Salert(data);
                    if (data) {
                       // alert(data);
                        //alert($(this).attr('newRec'));
                        var displayData = JSON.parse(data);
                        //console.log(displayData[0].NAME);
                        switch(targetresource){
                            case '2':
                                $('#txtImgName').val(displayData[0].IMAGE);
                                $('#id').val(displayData[0].ID);
                                $('#txtImgCat option:selected').text(displayData[0].NAME);
                                $('#txtImgCaption').val(displayData[0].CAPTION);
                                $("#fileImg").attr("src",'ProjectImage/'+displayData[0].IMAGE_PATH);
                                $("#fileToUpload").removeClass("required");
                                break;
                            case '4':
                                $('#txtImgName').val(displayData[0].IMAGE);
                                $('#id').val(displayData[0].ID);
                                $('#txtHeadCaption').val(displayData[0].HEAD_CAPTION);
                                $('#txtSubCaption').val(displayData[0].SUB_CAPTION);
                                $("#fileImg").attr("src",'uploads/'+displayData[0].IMAGE_PATH);
                                $("#fileToUpload").removeClass("required");
                                break;
                        }
                    } else {
                        alert("no data");
                    }
                }
            });
}


function deleteRecords(getCmp, targetresource) {
    $.ajax({
        url: "php/DAO.php",
        method: "get",
        data: {
            RecId: getCmp,
            operation: "delete",
            target: targetresource
        },
        success: function(data) {
            //alert(data);
            //console.log(data);
            if (data.indexOf("true") > -1) {
                //$("#catId").val(getCmp);
                alert("Data deleted successfully");
                loadRecords(targetresource);
            } else {
                alert("Error in data deletion");
                loadRecords(targetresource);
            }
        }
    });
}