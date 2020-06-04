$(document).ready(function () {

    $('#register').submit(function (e) {
        e.preventDefault();
        
        $('#btn-submit').prop("disabled",true)

        var data;
        var formRegister = new Object();
        formRegister.username = $('#username').val();
        formRegister.email = $('#email').val();
        formRegister.password = $('#password').val();
        data = JSON.stringify(formRegister);

        $.ajax({
            type: "post",
            url: "http://127.0.0.1:8080/blibliogest/register/",
            contentType: "application/json",
            data: data,
            dataType: "json",
            success: function (response) {
                console.log(response);
            },
            timeout:500
        });
        window.location.replace("http://localhost:8080/blibliogest/login.html");
            

        

    });
});