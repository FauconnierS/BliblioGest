$(document).ready(function () {

    var confirmInfo = new Object();
    confirmInfo.email = getParameter('email');
    confirmInfo.token = getParameter('token');

    var data = JSON.stringify(confirmInfo);
    console.log(data);

    $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/blibliogest/register/confirm-account",
            contentType: "application/json",
            data: data,
            dataType: "json",
            success: function (response) {
            },
            timeout: 500
        });
        alert("Compte confirmé Bienvenu ! ")
        window.location.replace("http://localhost:8080/blibliogest/login.html");
        






function getParameter(p) {
    var url = window.location.search.substring(1);
    var urlSplit = url.split('&');
    for (var i = 0; i < urlSplit.length; i++) {
        var parameter = urlSplit[i].split('=');
        if (parameter[0] == p) {
            return parameter[1];
        }
    }
}
});