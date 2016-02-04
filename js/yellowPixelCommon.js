$(document).ready(function(){
	//alert('in yellow pixel common');
	loadRecords();
	$("#mws-form-dialog").on("click",$("#btnUpdate"),function(event){
                        	alert('update');
	});
	$(document).on("click","#mws-form-dialog-mdl-btn", function(event){
		var getCmp=$(this).attr("recid");
			$.ajax({
								url: "php/DAO.php",
								method : "get",
								data: {RecId: getCmp, operation : "select"},
								success: function(data){
									//alert(data);
									if(data){
										var displayData=JSON.parse(data);
										console.log(displayData[0].NAME);
										//$("#catId").val(getCmp);
										//alert("data delete successfully");
										/*var tempData="";
										$.each(displayData,function(k,v){
											console.log(k);
											tempData=v.NAME;
											
										});*/
										$("#catId").val(displayData[0].NAME);	
									}
									else{
										alert("no data");
									}
								}
		});
			
		$("#mws-form-dialog").dialog("option", {
                    modal: true,
                    buttons: [{
                    text: "Close Dialog",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Update",
                    id : "btnUpdate",
                    click: function(){
                    	alert('update');
                    	var recname=$("#catId").val();
                    	$.ajax({
                    		
								url: "php/DAO.php",
								method : "get",
								data: {RecId: getCmp, operation : "update", name: recname },
								success: function(data){
									alert(data);
									if(data=="true"){
										//$("#catId").val(getCmp);
										//alert("data updated successfully");
										loadRecords();
									}
									else{
										alert("no data");
									}
								}
							});
                    	loadRecords();
                    }
                 },
                {
                    text: "delete",
                    id : "btnDelete",
                    click: function () {
                        $(document).on("click",$(this),function(event){
                        	//alert('delete');
                        	$.ajax({
								url: "php/DAO.php",
								method : "get",
								data: {RecId: getCmp, operation : "delete"},
								success: function(data){
									alert(data);
									if(data=="true"){
										//$("#catId").val(getCmp);
										alert("data delete successfully");
										loadRecords();
									}
									else{
										alert("no data");
									}
								}
							});
                        });
                    }
                }
                ]
                }).dialog("open");
		

			
        event.preventDefault();
		//alert('modal clicked');
	});

	$("#btnAdd").click(
		function(){
			alert('clicked new');
			$.ajax({
			url : "php/DAO.php",
			method : "get",
			data : {operation : "new"},
			datatype: JSON,
			success : function(data){
				
			}
		});
		});

/*	
$("#lnkDelete").click(function(){
		alert('clicked delete');
		$.ajax({
		url : "php/DAO.php",
		method : "get",
		data : {operation : "update"},
		datatype: JSON,
		success : function(data){
			
		}
	});

	});*/


});

function loadRecords(){
	//alert('loading records');
	$.ajax({
		url : "php/DAO.php",
		method : "get",
		data : {operation : "read"},
		datatype: JSON,
		success : function(data){
			console.log(data);
			if(data){
				var displayData=JSON.parse(data);
				console.log(displayData);
				var displayHtml="";
				$.each(displayData,function(k,v){
					//console.log(k.Name);
					displayHtml+="<tr><td>"+v.ID+"</td><td>"+v.NAME+"</td><td>"+v.CREATED+"</td><td>"+v.UPDATED+"</td><td><input type='button' id='mws-form-dialog-mdl-btn' recid='"+v.ID+"' class='btn btn-success' value='Update/Delete'></td></tr>";
				});
				$("#tdata").html(displayHtml);
			}
			else{
				alert("error");
			}
		}
	});
}