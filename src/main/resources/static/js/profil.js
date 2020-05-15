$(document).ready(function () {
    var res = "";
    $.getJSON("http://localhost:8080/blibliogest/note/",
        function (data, textStatus, jqXHR) {
            $.each(data, function (key, val) {
                res += "<div class='col-md-4'>";
                res += "<div class='card text-center m-2' style='width : 18rem;'>" ;
                res += "<div class='card-body'>";
                res += "<h5 class='card-title'>" + val.book + "</h5>";
                res += "<h6 class='card-subtitle mb-2 text-muted'> Chapitre(s) <span class='b'>" + val.chapter + "</span> </h6>"
                res += "<h6 class='card-subtitle mb-2 text-muted'> Page(s) <span class='b'>" + val.page + "</span> </h6>"
                res += "<p class='card-text'> " + val.commentary + " </p>";
                res += "</div>";
                res += "</div>";
                res += "</div>";
            });
           $('#profil-content').append(res); 

        });
});