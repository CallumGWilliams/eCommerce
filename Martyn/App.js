$(function () {


$("#submitMessage").click(function () {

    var name = ($("#name").val());
    var number = ($("#number").val());
    var email = ($("#email").val());
    var message = ($("#message").val());

    console.log("Name: " + name);
    console.log("Number: " + number);
    console.log("Email: " + email);
    console.log("Message: " + message);

    $("input[type=text]").each(function () {
        $(this).val("");
    });

    $("#message").val("");

$("#submitResponse").append("Thank you for your message " + name + ", we will reply shortly!");


})



});