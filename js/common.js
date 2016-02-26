$(document).ready(function() {
    pageLoad();

});
function pageLoad(){
    //get identifier for table
    var targetresource = $('tbody').attr('targetResource');
    //alert('loading records'+targetresource);
    loadRecords(targetresource);
    //enableModal(targetresource);
    /*$("#getSliderImage").submit(function(){
        var isValid = $('#getSliderImage').valid();
        if (isValid) {
            alert('in submit');
          // addNewRecord(targetresource);
          return true;
        }
        else{
            return false;
        }
        
    });*/
    $(document).on("click", "#mws-form-dialog-mdl-btn", function(event) {
        validator = $("#getImage").validate();
        var temp = $(this).attr('recid');
        if (temp == 'newRec') {
            // $("#catId").val("");
            $("#mws-form-dialog").dialog("option", {
                modal: true,
                title: "Add Category",
                buttons: [{
                    text: "Submit",
                    name: "Submit",
                    //id: "btnSubmit",
                    click: function() {
                        var isValid = $('#getSliderImage').valid();
                        if (isValid) {
                            //addNewRecord(targetresource);
                            $("#getSliderImage").submit();
                        }
                        
                        // $(this).find('form#mws-validate');
                        //$(this).find('form#mws-validate').submit();
                       // var isValid = $(this).find('form#mws-validate').valid();
                        /*if (isValid) {
                            addNewRecord(targetresource);
                        }*/
                    }

                }, {
                    text: "Close Dialog",
                    click: function() {
                        $(this).dialog("close");
                        $("#getSliderImage")[0].reset();
                        $("#mws-validate-error").hide();
                        validator.resetForm();
                    }
                }]
            }).dialog("open");
        } else {
            $("#mws-form-dialog").dialog("option", {
                modal: true,
                title: "Edit Category",
                buttons: [{
                    text: "Update",
                    id: "btnUpdate",
                    click: function() {
                        var validator = $("form#mws-validate").validate();
                        var isValid = $(this).find('form#mws-validate').valid();
                        if (isValid)
                            updateRecords(temp, targetresource);
                    }
                }, {
                    text: "Close Dialog",
                    click: function() {
                        $(this).dialog("close");
                        $("#mws-validate")[0].reset();
                        validator.resetForm();
                    }
                }]
            }).dialog("open");
            //code for select
            populateModal(temp,targetresource);
        }

    });

//delete records
    $(document).on("click", "#btnDelete", function() {
        var result = confirm("Are u sure want to delete this category");
        if (!result) {
            return false;
        } else {
            var temp = $(this).attr('recid');
            deleteRecords(temp, targetresource);
        }
    });

}


function loadRecords(targetresource) {
    $.ajax({
        url: "php/DAO.php",
        method: "get",
        data: {
            operation: "read",
            target: targetresource
        },
        datatype: JSON,
        success: function(data) {
            //console.log(data);
            if (data) {
                var displayData = JSON.parse(data);
                console.log(displayData);
                var displayHtml = "";

                switch (targetresource) {
                    case '1':
                        $.each(displayData, function(k, v) {
                            //console.log(k.Name);
                            displayHtml += "<tr><td>" + v.ID + "</td><td>" + v.NAME + "</td><td>" + v.CREATED + "</td><td>" + v.UPDATED + "</td><td><button id='mws-form-dialog-mdl-btn' recid='" + v.ID + "' class='btn btn-success'><i class='icon-pencil'></i></button>&nbsp;<button  class='btn btn-danger' id='btnDelete' recid='" + v.ID + "'><i class='icon-remove-sign'></i></button></td></tr>";
                        });
                        $("#dataTableData").html(displayHtml);
                        break;
                    case '2':
                        $.each(displayData, function(k, v) {
                            //console.log(k.Name);
                            displayHtml += "<tr><td>" + v.ID + "</td><td>" + v.IMAGE + "</td><td>" + v.Name + "</td><td>" + v.CAPTION + "</td><td>" + v.CREATED + "</td><td>" + v.UPDATED + "</td><td><button id='mws-form-dialog-mdl-btn' recid='" + v.ID + "' class='btn btn-success'><i class='icon-pencil'></i></button>&nbsp;<button  class='btn btn-danger' id='btnDelete' recid='" + v.ID + "'><i class='icon-remove-sign'></i></button></td></tr>";
                        });
                        $("#imageDataTable").html(displayHtml);
                        break;
                    case '3':
                        $.each(displayData, function(k, v) {
                            //console.log(k.Name);
                            displayHtml += "<tr><td>" + v.ID + "</td><td>" + v.ABOUT + "</td><td>" + v.CREATED + "</td><td>" + v.UPDATED + "</td><td><button id='mws-form-dialog-mdl-btn' recid='" + v.ID + "' class='btn btn-success'><i class='icon-pencil'></i></button>&nbsp;<button  class='btn btn-danger' id='btnDelete' recid='" + v.ID + "'><i class='icon-remove-sign'></i></button></td></tr>";
                        });
                        $("#footerDataTable").html(displayHtml);
                    break;
                    case '4':
                        $.each(displayData, function(k, v) {
                            //console.log(k.Name);
                            displayHtml += "<tr><td>" + v.ID + "</td><td>" + v.IMAGE + "</td><td>" +v.IMAGE_PATH+ "<td></td>" + v.HEAD_CAPTION + "</td><td>" + v.SUB_CAPTION + "</td><td>" + v.CREATED + "</td><td>" + v.UPDATED + "</td><td><button id='mws-form-dialog-mdl-btn' recid='" + v.ID + "' class='btn btn-success'><i class='icon-pencil'></i></button>&nbsp;<button  class='btn btn-danger' id='btnDelete' recid='" + v.ID + "'><i class='icon-remove-sign'></i></button></td></tr>";
                        });
                        $("#sliderDataTable").html(displayHtml);
                    break;

                }
                //$('tbody').attr('targetresource').append(displayHtml);
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
                        //alert($(this).attr('newRec'));
                        var displayData = JSON.parse(data);
                        //console.log(displayData[0].NAME);
                        switch(targetresource){
                            case '1':
                                 $("#catId").val(displayData[0].NAME);
                                    break;
                            case '2':
                                $('#txtImgName').val(displayData[0].IMAGE);
                                $('#txtImgCat').val(displayData[0].IMAGE_CATEGORY);
                                $('#txtImgCaption').val(displayData[0].CAPTION);
                                break;
                            case '3':
                                $('#txtAbout').val(displayData[0].ABOUT);
                                break;                               
                            case '4':
                                $('#txtImgName').val(displayData[0].IMAGE);
                                $('#txtHeadCaption').val(displayData[0].HEAD_CAPTION);
                                $('#txtSubCaption').val(displayData[0].SUB_CAPTION);
                                break;
                        }
                    } else {
                        alert("no data");
                    }
                }
            });
}


function addNewRecord(targetresource) {
    //passing value for new
    var temp = [];
    switch(targetresource){
        case '1':
            temp[0] = $("#catId").val();
        break;
        case '2' :
            temp[0] =  $('#txtImgName').val();
            temp[1] =  $('#txtImgCat option:selected').text();
            temp[2] = $('#txtImgCaption').val();
            //alert(temp[1]);
        break;
        case '3':
        break;
         case '4' :
            temp[0] = $('#txtImgName').val();
            temp[1] = $('#txtHeadCaption').val();
            temp[2] = $('#txtSubCaption').val();
            //alert(temp[0]+ ' '+temp[1]+' '+temp[1]);
        break;
    }

    /*
     $.ajax({
        url: "php/DAO.php",
        method: "get",
        data: {
            operation: "new",
            name: temp,
            target: targetresource
        },
        datatype: JSON,
        success: function(data) {
            console.log(data);
            if(data.indexOf("1")> -1){
                alert('New record created successfully');
                loadRecords(targetresource);    
            }
            else if(data.indexOf('duplicate')>-1){
                alert('Category value already present, please enter different value');
            }
        }
    });*/
}

function updateRecords(getCmp, targetresource) {
    //alert('update'+getCmp);
    //var recname = $("#catId").val();

    var temp = [];
    switch(targetresource){
        case '1':
            temp[0] = $("#catId").val();
        break;
        case '2' :
            temp[0] =  $('#txtImgName').val();
            temp[1] =  $('#txtImgCat option:selected').text();
            temp[2] = $('#txtImgCaption').val();
            //alert(temp[1]);
        break;
        case '3':
             temp[0] = $('#txtAbout').val();
        break;
        case '4':
             temp[0] = $('#txtImgName').val();
             temp[1] = $('#txtHeadCaption').val();
             temp[2] = $('#txtSubCaption').val();
        break;

    }
    //if (recname != "") {
        $.ajax({

            url: "php/DAO.php",
            method: "get",
            data: {
                RecId: getCmp,
                operation: "update",
                name: temp,
                target: targetresource
            },
            success: function(data) {
                //alert(data);
                if (data.indexOf("true") > -1) {
                    alert("data updated successfully");
                    loadRecords(targetresource);
                } 
                else if(data.indexOf('duplicate')>-1){
                alert('Category value already present, please enter different value');
                }
                else {
                    alert("No data found for update");
                }
            }
        });
    //}
    //loadRecords();
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
            // alert(data);
            console.log(data);
            if (data.indexOf("true") > -1) {
                //$("#catId").val(getCmp);
                alert("Data delete successfully");
                loadRecords(targetresource);
            } else {
                alert("Error in data deletion");
                loadRecords(targetresource);
            }
        }
    });
}