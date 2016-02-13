$(document).ready(function() {
    var targetresource = $('tbody').attr('targetResource');
   // alert(targetresource);
    loadRecords(targetresource);

    $(document).on("click", "#btnDelete", function() {
        var result = confirm("Are u sure want to delete this category");
    if(!result){
     return false;
    }else{
        var temp = $(this).attr('recid');
        //alert(temp);
        deleteRecords(temp,targetresource);
    }
    });
    
    $(document).on("click", "#mws-form-dialog-mdl-btn", function(event) {
       validator = $( "form#mws-validate" ).validate();
        var temp = $(this).attr('recid');
        if (temp == 'newRec') {
           // $("#catId").val("");
            $("#mws-form-dialog").dialog("option", {
                modal: true,
                title : "Add Category",
                buttons: [{
                    text: "Submit",
                    id: "btnSubmit",
                    click: function(){
                       // $(this).find('form#mws-validate');
                        var isValid = $(this).find('form#mws-validate').valid();
                        if(isValid){
                          addNewRecord(targetresource);
                        }
                    }
                    
                }, {
                    text: "Close Dialog",
                    click: function() {
                       // alert('close');
                        $(this).dialog("close");
                        $("#mws-validate")[0].reset();
                        $("#mws-validate-error").hide();
                        validator.resetForm();
                        //$("#mws-validate-error").removeClass('error');
                    }
                }]
            }).dialog("open");
        } else {
            //alert('in modal');
            $("#mws-form-dialog").dialog("option", {
                modal: true,
                title: "Edit Category",
                buttons: [
                {
                    text: "Update",
                    id: "btnUpdate",
                    click : function(){
                        //$(this).addClass('btn btn-success');
                        var validator = $( "form#mws-validate" ).validate();
                        var isValid = $(this).find('form#mws-validate').valid();
                        if(isValid)
                        updateRecords(temp,targetresource);
                    }
                },
                {
                    text: "Close Dialog",
                    click: function() {
                        $(this).dialog("close");
                        //$("#catId").val("");
                         $("#mws-validate")[0].reset();
                        validator.resetForm();  
                    }
                }]
            }).dialog("open");
            //code for select
            $.ajax({
                url: "php/DAO.php",
                method: "get",
                data: {
                    RecId: temp,
                    operation: "select",
                    target : targetresource
                },
                success: function(data) {
                    //Salert(data);
                    if (data) {
                        //alert($(this).attr('newRec'));
                        var displayData = JSON.parse(data);
                        //console.log(displayData[0].NAME);
                        $("#catId").val(displayData[0].NAME);
                        $("#btnSubmit").hide();

                    } else {
                        alert("no data");
                    }
                }
            });
        }

    });
});

function loadRecords(targetresource) {
    //alert('loading records');
    $.ajax({
        url: "php/DAO.php",
        method: "get",
        data: {
            operation: "read",
            target : targetresource
        },
        datatype: JSON,
        success: function(data) {
            console.log(data);
            if (data) {
                var displayData = JSON.parse(data);
                console.log(displayData);
                var displayHtml = "";
                
                switch(targetresource){
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
                    displayHtml += "<tr><td>" + v.ID + "</td><td>" + v.IMAGE + "</td><td>"+v.IMAGE_CATEGORY+"</td><td>"+v.CAPTION+"</td><td>" + v.CREATED + "</td><td>" + v.UPDATED + "</td><td><button id='mws-form-dialog-mdl-btn' recid='" + v.ID + "' class='btn btn-success'><i class='icon-pencil'></i></button>&nbsp;<button  class='btn btn-danger' id='btnDelete' recid='" + v.ID + "'><i class='icon-remove-sign'></i></button></td></tr>";
                    });
                    $("#imageDataTable").html(displayHtml);
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

function addNewRecord(targetresource) {
    //alert('clicked new');
    //enableSubmit();
    alert(targetresource);
    var temp = $("#catId").val();
    $("#catId").val("");
   // alert(temp);
    $.ajax({
        url: "php/DAO.php",
        method: "get",
        data: {
            operation: "new",
            name: temp,
            target : targetresource
        },
        datatype: JSON,
        success: function(data) {
            //alert(data);
            loadRecords(targetresource);
            // $("#catId").val("");
        }
    });
}

function updateRecords(getCmp,targetresource) {
   // alert('update');
   var recname = $("#catId").val();
   if(recname != ""){
    $.ajax({

        url: "php/DAO.php",
        method: "get",
        data: {
            RecId: getCmp,
            operation: "update",
            name: recname,
            target : targetresource
        },
        success: function(data) {
            //alert(data);
            if (data == "true") {
                alert("data updated successfully");
                loadRecords(targetresource);
            } else {
                alert("No data found for update");
            }
        }
    });
    }
    //loadRecords();
}

function deleteRecords(getCmp,targetresource) {
    $.ajax({
        url: "php/DAO.php",
        method: "get",
        data: {
            RecId: getCmp,
            operation: "delete",
            target : targetresource
        },
        success: function(data) {
           // alert(data);
           console.log(data);
            if (data == "true") {
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
