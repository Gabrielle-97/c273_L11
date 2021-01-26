/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    reload_table();
    $("#btnAdd").click(function () {
        //alert("test");
        $('#add_modal').modal('show'); // show bootstrap modal

    });

//add validator 
    var add_validator = $("#add_form").validate({
        rules: {

            modulecode: {
                required: true
            },
            modulename: {
                required: true
            }
        },
        messages: {

            modulecode: {
                required: "Please enter the module code."
            },
            modulename: {
                required: "Please enter the module name."
            }
        },
        submitHandler: function (form) {
            // $('#add_modal').modal('hide'); // hide bootstrap modal

            var modulecode = $("#add_form [name=modulecode]").val();
            var modulename = $("#add_form [name=modulename]").val();

            $.ajax({
                url: "addModule.php",
                type: "POST",
                data: "modulecode=" + modulecode + "&modulename=" + modulename ,
                dataType: "JSON",
                success: function (data) {
                    $('#add_modal').modal('hide');
                    reload_table();
                },
                error: function (obj, textStatus, errorThrown) {
                    $("#addErrorMsg").html("Unable to add module");
                    console.log("Error " + textStatus + ": " + errorThrown);
                    return false;
                }
            });




        }
    });

    //Edit form
    var edit_validator = $("#edit_form").validate({
        rules: {

            modulecode: {
                required: true
            },
            modulename: {
                required: true
            }
        },
        messages: {

            modulecode: {
                required: "Please enter the new module code."
            },
            modulename: {
                required: "Please enter the new module name."
            }
        },
        submitHandler: function (form) {
            // $('#add_modal').modal('hide'); // hide bootstrap modal


            var modulecode = $("#edit_form [name=modulecode]").val();
            var modulename = $("#edit_form [name=modulename]").val();

            $.ajax({
                url: "editModule.php",
                type: "POST",
                data: "modulecode=" + modulecode + "&modulename=" + modulename ,
                dataType: "JSON",
                success: function (data) {
                    $('#edit_modal').modal('hide');
                    reload_table();
                },
                error: function (obj, textStatus, errorThrown) {
                    $("#editErrorMsg").html("Unable to edit module");
                    console.log("Error " + textStatus + ": " + errorThrown);
                    return false;
                }
            });




        }
    });
//btn for edit 
    $("#defaultTable").on("click", ".btnEdit", function () {
        //alert("text")
        var code = $(this).val();
        $.ajax({
            type: "GET",
            url: "getModuleDetails.php",
            data: "modulecode=" + code,
            cache: false,
            dataType: "JSON",

            success: function (data) {
                $("#edit_form [name=modulecode]").val(data.module_code)
                $("#edit_form [name=modulename]").val(data.module_name)
                $("#edit_modal").modal('show');
            },
            error: function (obj, textStatus, errorThrown) {
                console.log("Error " + textStatus + ": " + errorThrown);
                
            }
        });

    });
    

//btn for delete
    $("#defaultTable").on("click", ".btnDelete", function () {

        var code = $(this).val();
        if (confirm("Are you sure you want to delete?")) {
            $.ajax({
                type: "GET",
                url: "deleteModule.php",
                data: "modulecode=" + code,
                cache: false,
                dataType: "JSON",

                success: function (data) {
                    reload_table();
                    //alert("text")

                },
                error: function (obj, textStatus, errorThrown) {
                    console.log("Error " + textStatus + ": " + errorThrown);
                    //alert("error")
                }
            });
        }


    });




});

function reload_table() {

//getModule.php
    $.ajax({
        type: "GET",
        url: "getModules.php",
        cache: false,
        dataType: "JSON",

        success: function (response) {
            console.log(response.length);
            var message = "";
            for (i = 0; i < response.length; i++) {
                message += "<tr><td>" + response[i].module_code + "</td>"
                        + "<td>" + response[i].module_name + "</td>"
                        + "<td><button class='btnEdit btn btn-primary' value='" + response[i].module_code + "'><i class='fa fa-edit'></i> Edit</button>&nbsp;&nbsp;<button class='btnDelete btn btn-danger' value='" + response[i].module_code + "'>\n\
<i class='fa fa-trash'></i> Delete</button></td></tr>";
            }
            $("#defaultTable tbody").html(message);
        },
        error: function (obj, textStatus, errorThrown) {
            console.log("Error " + textStatus + ": " + errorThrown);
        }
    });



}

