$(document).ready(function() {
    //alert('in yellow pixel common');
    loadRecords();
    $(document).on("click", "#btnDelete", function() {
        var temp = $(this).attr('recid');
        alert(temp);
        deleteRecords(temp);
    });

    $(document).on("click", "#mws-form-dialog-mdl-btn", function(event) {
        var temp = $(this).attr('recid');
        if (temp == 'newRec') {
            $("#catId").val("");
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
                          addNewRecord();
                        }
                       // else{  event.preventDefault();}
                    }
                    //$(this).find('form#mws-validate').submit();
                }, {
                    text: "Close Dialog",
                    click: function() {
                        $(this).dialog("close");
                        $("#catId").val("");
                    }
                }]
            }).dialog("open");
        } else {
            //alert('in modal');

            $("#mws-form-dialog").dialog("option", {
                modal: true,
                title: "Edit Category",
                buttons: [{
                    text: "Close Dialog",
                    click: function() {
                        $(this).dialog("close");
                        $("#catId").val("");
                    }
                }, {
                    text: "Update",
                    id: "btnUpdate",
                    click : function(){updateRecords(temp);}
                }]
            }).dialog("open");

            //var getCmp = $("#catId").val();
            alert(temp);
            $.ajax({
                url: "php/DAO.php",
                method: "get",
                data: {
                    RecId: temp,
                    operation: "select"
                },
                success: function(data) {
                    alert(data);
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
  /*  $(document).on("click", "#btnUpdate", function() {
        var temp = $("#catId").val();
        alert('in update');
        updateRecords(temp);
    });*/

});

function loadRecords() {
    //alert('loading records');
    $.ajax({
        url: "php/DAO.php",
        method: "get",
        data: {
            operation: "read"
        },
        datatype: JSON,
        success: function(data) {
            console.log(data);
            if (data) {
                var displayData = JSON.parse(data);
                console.log(displayData);
                var displayHtml = "";
                $.each(displayData, function(k, v) {
                    //console.log(k.Name);
                    displayHtml += "<tr><td>" + v.ID + "</td><td>" + v.NAME + "</td><td>" + v.CREATED + "</td><td>" + v.UPDATED + "</td><td><button id='mws-form-dialog-mdl-btn' recid='" + v.ID + "' class='btn btn-success'><i class='icon-pencil'></i></button>&nbsp;<button  class='btn btn-danger' id='btnDelete' recid='" + v.ID + "'><i class='icon-remove-sign'></i></button></td></tr>";
                });
                $("#dataTableData").html(displayHtml);
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

function addNewRecord() {
    //alert('clicked new');
    //enableSubmit();
    var temp = $("#catId").val();
    $("#catId").val("");
    alert(temp);
    $.ajax({
        url: "php/DAO.php",
        method: "get",
        data: {
            operation: "new",
            name: temp
        },
        datatype: JSON,
        success: function(data) {
            alert(data);
            loadRecords();
            // $("#catId").val("");
        }
    });
}

function enableSubmit() {
    $("#btnUpdate").hide();
    // $("#catId").val("");
    $("#btnSubmit").show();
}

function enableUpdate() {
    $("#btnUpdate").show();
    $("#btnSubmit").hide();
}

function updateRecords(getCmp) {
   // alert('update');
   var recname = $("#catId").val();
   if(recname != ""){
    $.ajax({

        url: "php/DAO.php",
        method: "get",
        data: {
            RecId: getCmp,
            operation: "update",
            name: recname
        },
        success: function(data) {
            alert(data);
            if (data == "true") {
                //alert("data updated successfully");
                loadRecords();
            } else {
                alert("no data");
            }
        }
    });
    }
    //loadRecords();
}

function deleteRecords(getCmp) {
    $.ajax({
        url: "php/DAO.php",
        method: "get",
        data: {
            RecId: getCmp,
            operation: "delete"
        },
        success: function(data) {
            alert(data);
            if (data == "true") {
                //$("#catId").val(getCmp);
                alert("data delete successfully");
                loadRecords();
            } else {
                alert("no data");
                loadRecords();
            }
        }
    });
}

/*
var getCmp = $(this).attr("recid");
        if(getCmp=='newRec'){
           $("#btnDelete").hide();
           $("#btnUpdate").hide();
        }
          $("#mws-form-dialog").dialog("option", {
            modal: true,
            buttons: [
            {
                    text: "Submit",
                    id: "btnSubmit",
                    click: function () {
                        $(this).find('form#mws-validate').submit();
                    }
            },
            {
                text: "Close Dialog",
                click: function() {
                    $(this).dialog("close");
                     $("#catId").val("");
                }
            }, {
                text: "Update",
                id: "btnUpdate",
                click:function() {
                    alert("hi..");
                     updateRecords(getCmp);
                    }
            }, {
                text: "delete",
                id: "btnDelete",
                click: function() {
                    $(document).on("click", $(this), function(event) {
                        //alert('delete');
                        deleteRecords(getCmp);
                    });
                }
            }]
        }).dialog("open");
      
        $.ajax({
            url: "php/DAO.php",
            method: "get",
            data: {
                RecId: getCmp,
                operation: "select"
            },
            success: function(data) {
                //alert(data);
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

        event.preventDefault();
        //alert('modal clicked');
*/