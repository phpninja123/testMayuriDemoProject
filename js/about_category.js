var targetresource = $('tbody').attr('targetResource');
$(document).ready(function() {
    pageLoad();

});
function pageLoad(){
    //get identifier for table
    //var targetresource = $('tbody').attr('targetResource');
    //alert(targetresource);
    //alert('loading records'+targetresource);
    loadRecords(targetresource);
    $(document).on("click", "#mws-form-dialog-mdl-btn", function(event) {
        $(".ui-icon").remove();
        $(".ui-dialog-titlebar-close").remove();
       validator = $("#form#mws-validate").validate();
       var titleDisplay = '';
       if(targetresource == 1){
            titleDisplay = ' Category';
       }
       else if(targetresource == 3){
            titleDisplay = ' About';
       }
       //check if new record else get record id
        var temp = $(this).attr('recid');
        if (temp == 'newRec') {
            // $("#catId").val("");
            $("#mws-form-dialog").dialog("option", {
                modal: true,
                title: "Add"+titleDisplay,
                buttons: [{
                    text: "Submit",
                    name: "submit",
                    //id: "btnSubmit",
                    click: function() {
                        //$("#getImage").submit();
                        //$("#mws-validate").submit();
                         //$(this).find('form#mws-validate');
                        //$(this).find('form#mws-validate').submit();
                        var isValid = $(this).find('form#mws-validate').valid();
                        if (isValid) {
                            addNewRecord(targetresource);
                        }
                    }

                }, {
                    text: "Close Dialog",
                    click: function() {
                        $("#mws-form-dialog").dialog("close");
                        $(this).dialog("close");
                        $("#mws-validate")[0].reset();
                        $("#mws-validate-error").hide();
                        validator.resetForm();
                    }
                }]
            }).dialog("open");
        } else {
            $("#mws-form-dialog").dialog("option", {
                modal: true,
                title: "Edit"+titleDisplay,
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
        var result = confirm("Are u sure want to delete this record?");
        if (!result) {
            return false;
        } else {
            var temp = $(this).attr('recid');
            deleteRecords(temp, targetresource);
            validator = $("#form#mws-validate").validate();
            $("#mws-validate")[0].reset();
            validator.resetForm();
        }
    });

}


function loadRecords(targetresource) {
    $.ajax({
        url: "php/categoryDAO.php",
        method: "post",
        data: {
            operation: "read",
            target: targetresource
        },
        datatype: JSON,
        success: function(data) {
            //console.log(data);
            if (data) {
                var displayData = JSON.parse(data);
                //console.log(displayData);
                var displayHtml = "";

                switch (targetresource) {
                    case '1':
                        $.each(displayData, function(k, v) {
                            //console.log(k.Name);
                            displayHtml += "<tr><td><center>" + v.NAME +  "</center></td><td><center><button id='mws-form-dialog-mdl-btn' recid='" + v.ID + "' class='btn btn-success'><i class='icon-pencil'></i></button>&nbsp;<button  class='btn btn-danger' id='btnDelete' recid='" + v.ID + "'><i class='icon-remove-sign'></i></button></center></td></tr>";
                        });
                        $("#dataTableData").html(displayHtml);
                        break;
                    case '3':
                        $.each(displayData, function(k, v) {
                            //console.log(k.Name);
                            displayHtml += "<tr><td>" + v.ABOUT + "</td><td><center><button id='mws-form-dialog-mdl-btn' recid='" + v.ID + "' class='btn btn-success'><i class='icon-pencil'></i></button>&nbsp;<button  class='btn btn-danger' id='btnDelete' recid='" + v.ID + "'><i class='icon-remove-sign'></i></button></center></td></tr>";
                        });
                        $("#footerDataTable").html(displayHtml);
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
                url: "php/categoryDAO.php",
                method: "get",
                data: {
                    RecId: temp,
                    operation: "select",
                    target: targetresource
                },
                success: function(data) {
                    //Salert(data);
                    if (data) {
                        //alert(data);
                        //alert($(this).attr('newRec'));
                        var displayData = JSON.parse(data);
                        //console.log(displayData[0].NAME);
                        switch(targetresource){
                            case '1':
                                 $("#catId").val(displayData[0].NAME);
                                    break;
                            case '3':
                                $('#txtAbout').val(displayData[0].ABOUT);
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
    var temp;
    switch(targetresource){
        case '1':
            temp= $("#catId").val();
        break;
        case '3':
            temp = $("#txtAbout").val();
        break;
    }

    //alert('before submit'+$("form#mws-validate").val());
     $.ajax({
        url: "php/categoryDAO.php",
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
                $("#mws-form-dialog").dialog("close");
                $("#mws-validate")[0].reset();
                $("#mws-validate-error").hide();
                validator.resetForm();
            }
            else if(data.indexOf('duplicate')>-1){
                alert('Category value already present, please enter different value');
            }
        }
    });
}

function updateRecords(getCmp, targetresource) {
    //alert('update'+getCmp);
    //var recname = $("#catId").val();

    var temp;
    switch(targetresource){
        case '1':
            temp = $("#catId").val();
        break;
        case '3':
             temp = $('#txtAbout').val();
        break;
    }
    //if (recname != "") {
        $.ajax({

            url: "php/categoryDAO.php",
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
                    $("#mws-form-dialog").dialog("close");
                    $("#mws-validate")[0].reset();
                    $("#mws-validate-error").hide();
                    validator.resetForm();
                } 
                else if(data.indexOf('duplicate')>-1){
                alert('Oppsss...Category value already present.');
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
        url: "php/categoryDAO.php",
        method: "get",
        data: {
            RecId: getCmp,
            operation: "delete",
            target: targetresource
        },
        success: function(data) {
            //alert(data);
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