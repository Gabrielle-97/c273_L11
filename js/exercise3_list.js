$(document).ready(function () {
    
    console.log('test');

    var personArray = JSON.parse(localStorage.getItem("personArray"));
    if (personArray == null) {
        personArray = [];
    }
    
    console.log('test');

    var message = "";
    console.log('test');
    for (var i = 0; i < personArray.length; i++) {
        console.log('test');
        var person = personArray[i];
        message += "Name: " + person.name + "<br/>";
        message += "Email: " + person.email + "<br/>";
        message += "Postal Code: " + person.postalCode + "<br/><br/>";
        
    }
    console.log('test');
    $("#results").html(message);
    console.log('test');



    $("#btnSubmit").click(function () {
        var person = {};
        person.name = $("[name=name]").val();
        person.email = $("[name=email]").val();
        person.postalCode = $("[name=postalCode]").val();

        personArray[personArray.length] = person;
        localStorage.setItem("personArray", JSON.stringify(personArray));
    });
    
    console.log('test');

});

