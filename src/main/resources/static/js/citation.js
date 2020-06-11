$(document).ready(function () {
    const HOST = "http://127.0.0.1:8080/blibliogest/citation/"

    $.ajaxSetup({
        contentType: "application/json"
    });

    $.getJSON(HOST)
        .done(function (data, textStatus, jqXHR) {
            var res;
            $.each(data, function (key, val) {
                res += "<tr>";
                res += "<td data-arraykey='" + key + "'>" + val.text + "</td>";
                res += "<td data-arraykey='" + key + "'>" + val.author + "</td>";
                res += "<td data-arraykey ='" + key + "'>";

                res += "<button type='button' data-arraykey ='" + key + "' data-bookid='" + val.id + "' class='btn btn-warning btn-sm rounded m-0 py-1 px-2'> <i class='fas fa-pencil-alt    '></i> </button>";

                res += " <button id='delete' type='button'  data-toggle='modal' data-target='#frameModalSuccess' data-arraykey ='" + key + "' class='btn btn-danger  btn-sm rounded m-0 py-1 px-2'> <i class='fas fa-trash-alt'></i> </button>";

                res += "</td>";
                res += "</tr>";

            });
            $('tbody').html(res);

            $('button.btn-warning').click(function (e) {
                e.preventDefault();
                var tabId = $(this).data('arraykey');
                $('#nav-citations-tab').removeClass("active");
                $('#nav-citations').removeClass("active show");
                $('#nav-new-tab').addClass("active");
                $('#nav-new').addClass("active show");

                $('#text').attr('value', data[tabId].text);
                $('#author').attr('value', data[tabId].author);
                $('#citationid').attr('value', data[tabId].id);
                $('#citationid').attr('name', 'update');
            });

            $('button#delete').click(function (e) {
                e.preventDefault();
                var tabId = $(this).data('arraykey');
                var citationDelete;
                var formDelete = new Object();
                formDelete.id = data[tabId].id;
                formDelete.text = data[tabId].text;
                formDelete.author = data[tabId].author;
                citationDelete = JSON.stringify(formDelete);

                $.post(HOST + "delete", citationDelete)
                    .done(function () {
                        $('#modal-text').append("<strong> Votre livre à bien été supprimé </strong>");
                    })
                    .fail(function (jqXHR, status) {
                        var response = jqXHR.responseJSON;
                        $('#modal-body').toggleClass('alert-success alert-danger');
                        $('#modal-success').toggleClass('alert-success alert-danger');

                        $('#modal-text').append("<span class= 'font-weight-bold' > ERROR " + response.status + " </span> <span class='font-weight-bolder font-italic '>: Impossible de supprimer cette citation </span>");
                    })
            });

        })
        .fail(function (jqXHR, textStatus) {
            var response = jqXHR.responseJSON;
            alert("ERROR : " + response.status + " : Url " + response.error);
        });

    $('#search').keydown(function () {

        $.getJSON(HOST)
            .done(function (data, textStatus, jqXHR) {
                var search = $('#search').val();
                var regex = new RegExp(search, 'i');
                var output;

                $.each(data, function (key, val) {
                    if ((val.text.search(regex) != -1) || (val.author.search(regex) != -1)) {

                        output += "<tr>";
                        output += "<td id ='" + key + "'>" + val.text + "</td>"
                        output += "<td id ='" + key + "'>" + val.author + "</td>"
                        output += "<td data-arraykey ='" + key + "'>";

                        output += "<button type='button' data-arraykey ='" + key + "' data-bookid='" + val.id + "' class='btn btn-warning btn-sm rounded m-0 py-1 px-2'> <i class='fas fa-pencil-alt    '></i> </button>";

                        output += " <button id='delete' type='button'  data-toggle='modal' data-target='#frameModalSuccess' data-arraykey ='" + key + "' class='btn btn-danger  btn-sm rounded m-0 py-1 px-2'> <i class='fas fa-trash-alt'></i> </button>";

                        output += "</td>";
                        output += "</tr>";
                    }

                });
                $('tbody').html(output);
                $('button.btn-warning').click(function (e) {
                    e.preventDefault();
                    var tabId = $(this).data('arraykey');
                    $('#nav-citations-tab').removeClass("active");
                    $('#nav-citations').removeClass("active show");
                    $('#nav-new-tab').addClass("active");
                    $('#nav-new').addClass("active show");

                    $('#text').attr('value', data[tabId].text);
                    $('#author').attr('value', data[tabId].author);
                    $('#citationid').attr('value', data[tabId].id);
                    $('#citationid').attr('name', 'update');
                });

                $('button#delete').click(function (e) {
                    e.preventDefault();
                    var tabId = $(this).data('arraykey');
                    var citationDelete;
                    var formDelete = new Object();
                    formDelete.id = data[tabId].id;
                    formDelete.text = data[tabId].text;
                    formDelete.author = data[tabId].author;
                    citationDelete = JSON.stringify(formDelete);

                    $.post(HOST + "delete", citationDelete)
                        .done(function (data, textStatus, jqXHR) {
                            $('#modal-text').append("<strong> Votre Citationà bien été supprimé </strong>");
                        })
                        .fail(function (jqXHR, status) {
                            var response = jqXHR.responseJSON;
                            $('#modal-body').toggleClass('alert-success alert-danger');
                            $('#modal-success').toggleClass('alert-success alert-danger');

                            $('#modal-text').append("<span class= 'font-weight-bold' > ERROR " + response.status + " </span> <span class='font-weight-bolder font-italic '>: Impossible de supprimer cette citation </span>");
                        })
                });
            })
            .fail(function (jqXHR, textStatus) {
                var response = jqXHR.responseJSON;
                alert("ERROR : " + response.status + " : Url " + response.error);
            });
    })

    $('#conexionCitation').submit(function (e) {
        e.preventDefault();

        var method = $('#citationid').attr('name');
        console.log(method);
        var msgMethod;
        var data;
        var form = new Object();
        form.text = $('#text').val();
        form.author = $('#author').val();
        if (method === 'update') {
            form.id = $('#citationid').val();
            msgMethod = 'modifié';
        } else {
            method = 'create';
            msgMethod = 'crée';
        }
        data = JSON.stringify(form);

        $.post(HOST + method, data)
            .done(function () {
                $('#modal-text').append("<strong>Votre livre à été " + msgMethod + "</strong");
            })
            .fail(function (jqXHR) {
                var response = jqXHR.responseJSON;
                var res = "";
                $('#modal-body').toogleClass('alert-success alert-danger');
                $('#modal-success').toogleClass('alert-success alert-danger');

                for(let i = 0 ; i < response.errors.length; i++) {
                    res += "<li>";
                    res += response.errors[i].defaultMessage; 
                    res += "</li>";
                }

                $('#modal-text').append("<div class= 'font-weight-bold' > ERROR " + response.status + " </div> <ul class='font-weight-bolder font-italic '> : " + res + "</ul>");
            })
            .always(function () {
                $('#conexionCitation').load("book.html #conexionCitation");
            })

    });

    $('#frameModalSuccess').click(function (e) {
        e.preventDefault();
        if (e.target.id == 'frameModalSuccess') {
            location.reload();
        }
    });

    $('#modal-success').click(function (e) {
        e.preventDefault();
        location.reload();
    });

});