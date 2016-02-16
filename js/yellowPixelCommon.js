$(document).ready(function() {
    //alert('targetresource');
    pageLoad();

});
function pageLoad(){
     //modal working
    //enable disable modal components
     //get identifier for table
    var targetresource = $('tbody').attr('targetResource');
    //alert('loading records'+targetresource);
    loadRecords(targetresource);
    //enableModal(targetresource);
    $(document).on("click", "#mws-form-dialog-mdl-btn", function(event) {
        validator = $("form#mws-validate").validate();
        var temp = $(this).attr('recid');
        if (temp == 'newRec') {
            // $("#catId").val("");
            $("#mws-form-dialog").dialog("option", {
                modal: true,
                title: "Add Category",
                buttons: [{
                    text: "Submit",
                    id: "btnSubmit",
                    click: function() {
                        // $(this).find('form#mws-validate');
                        var isValid = $(this).find('form#mws-validate').valid();
                        if (isValid) {
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
                buttons: [{
                    text: "Update",
                    id: "btnUpdate",
                    click: function() {
                        //$(this).addClass('btn btn-success');
                        var validator = $("form#mws-validate").validate();
                        var isValid = $(this).find('form#mws-validate').valid();
                        if (isValid)
                            updateRecords(temp, targetresource);
                    }
                }, {
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
            populateModal(temp,targetresource);
        }

    });
    //end of modal working

//delete records
    $(document).on("click", "#btnDelete", function() {
        var result = confirm("Are u sure want to delete this category");
        if (!result) {
            return false;
        } else {
            var temp = $(this).attr('recid');
            //alert(temp);
            deleteRecords(temp, targetresource);
        }
    });

}


function loadRecords(targetresource) {
    //alert('loading records'+targetresource);
    $.ajax({
        url: "php/DAO.php",
        method: "get",
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
                        }
                    } else {
                        alert("no data");
                    }
                }
            });
}


function addNewRecord(targetresource) {
    //alert('clicked new');
    //enableSubmit();
    alert(targetresource);
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
            alert(temp[1]);
        break;
    }
    
    //$("#catId").val("");
    // alert(temp);
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
           // alert(data);
            console.log(data);
            if(data == "1"){
                alert('New record created successfully');
                loadRecords(targetresource);    
            }
            else if(data.indexOf('duplicate')>-1){
                alert('Category value already present, please enter different value');
            }
            
            // $("#catId").val("");
        }
    });
}

function updateRecords(getCmp, targetresource) {
    // alert('update');
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
            alert(temp[1]);
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
                if (data == "true") {
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