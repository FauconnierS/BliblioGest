$(document).ready(function () {

    const HOST = "http://127.0.0.1:8080/blibliogest/";

    $.ajaxSetup({
        contentType: "application/json"
    });


    $('#register').submit(function (e) {
        e.preventDefault();

        var data;
        var formRegister = new Object();
        formRegister.username = $('#username').val();
        formRegister.email = $('#email').val();
        formRegister.password = $('#password').val();
        var confirm = $('#confirm').val();

        if (confirm == formRegister.password) {

            data = JSON.stringify(formRegister);
            console.log(data);
            $.post(HOST + "register/", data)
                .done(function (data, textStatus, jqXHR) {
                    alert("Veuillez verifier votre boite mail pour confirmer le compte ");
                })
                .fail(function (jqXHR) {
                alert("L'envoi à echouer veuillez contacter l'administrateur du site");
                })
                .always(function () {
                    window.location.replace(HOST + "login.html");
                });
        }else {
            alert("Vos mot de passe ne sont pas les mêmes !");
            $('#pass').load("registration.html #pass");
        }

    });

});