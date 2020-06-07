$(document).ready(function () {

    const HOST = "http://localhost:8080/blibliogest/note/";

    $.ajaxSetup({
        contentType: "application/json",
        timeout: 2000
    })

    var res = "";
    $.getJSON(HOST)
        .done(function (data, textStatus, jqXHR) {
            $.each(data, function (key, val) {
                res += "<div class='col-md-4'>";
                res += "<div class='card m-2' style='width : 18rem;'>";
                res += "<div class='card-body text-right pt-1 px-2 '>";
                res += "<button type='button' data-arraykey='" + key + "' class='delete-note j'>";
                res += "<i class='fas fa-times'></i>";
                res += "</button>";
                res += "<div class='text-center'>";
                res += "<h5 data-arraykey='" + key + "' class='card-title'>" + val.book + "</h5>";
                res += "<h6 data-arraykey='" + key + "' class='card-subtitle mb-2 text-muted'> Chapitre(s) <span class='b'>" + val.chapter + "</span> </h6>"
                res += "<h6 data-arraykey='" + key + "' class='card-subtitle mb-2 text-muted'> Page(s) <span class='b'>" + val.page + "</span> </h6>"
                res += "<p  data-arraykey='" + key + "' class='card-text'> " + val.commentary + " </p>";
                res += "</div>";
                res += "</div>";
                res += "</div>";
                res += "</div>";
            });
            $('#profil-content').append(res);

            $('button.delete-note').click(function (e) {
                e.preventDefault();
                var tabId = $(this).data('arraykey');
                var formDelete = new Object();
                var noteDelete;
                formDelete.id = data[tabId].id;
                formDelete.book = data[tabId].book;
                formDelete.chapter = data[tabId].chapter;
                formDelete.page = data[tabId].page;
                formDelete.commentary = data[tabId].commentary;
                noteDelete = JSON.stringify(formDelete);

                $.post(HOST + "delete", noteDelete)
                    .done(function (data, textStatus, jqXHR) {
                        alert("Votre Note à bien été Supprimé");
                    })
                    .fail(function (jqXHR) {
                        var response = jqXHR.responseJSON;
                        alert("ERROR " + response.status + " : Un problème est survenu lors de la supression ");
                    })
                    .always(function () {
                        setTimeout(location.reload(true), 1000);
                    })
            });
        })
        .fail(function (jqXHR) {
            var response = jqXHR.responseJSON;
            alert("ERROR " + response.status + ": Url " + response.error);
        });

    $('#add-note').submit(function (e) {
        e.preventDefault();
        var data;
        var formNew = new Object();
        formNew.book = $('#form-title').val();
        formNew.chapter = $('#form-chapter').val();
        formNew.page = $('#form-page').val();
        formNew.commentary = $('#form-content').val();

        data = JSON.stringify(formNew);

        $.post(HOST + "create", data)
            .done(function (data, textStatus, jqXHR) {
                alert("Votre note à bien été ajouté");
            })
            .fail(function (jqXHR) {
                var response = jqXHR.responseJSON;
                alert("ERROR " + response.status + " : Problème lors de l'ajout de la note");
            })
            .always(function () {
                setTimeout(location.reload(true), 1000);
            });
    });
});