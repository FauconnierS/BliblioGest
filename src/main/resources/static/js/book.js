$(document).ready(function () {

    const HOST = "http://127.0.0.1:8080/blibliogest/book/";

    $.ajaxSetup({
        contentType: "application/json"
    });

    $.getJSON(HOST)
        .done(function (data, textStatus, jqXHR) {
            var res;
            $.each(data, function (key, val) {
                res += "<tr>";
                res += "<td data-arraykey ='" + key + "'>" + val.title + "</td>";
                res += "<td data-arraykey ='" + key + "'>" + val.author + "</td>";
                res += "<td data-arraykey ='" + key + "'>" + val.year + "</td>";
                res += "<td data-arraykey ='" + key + "'>" + jsUcfirst(val.genre) + "</td>";
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
                $('#nav-books-tab').removeClass('active');
                $('#nav-books').removeClass('active show');
                $('#nav-new-tab').addClass('active');
                $('#nav-new').addClass('active show');

                $('#title').attr('value', data[tabId].title);
                $('#author').attr('value', data[tabId].author);
                $('#year').attr('value', data[tabId].year);
                $("#genre option[value='" + data[tabId].genre.toUpperCase() + "']").prop('selected', true);
                $('#bookid').attr('value', data[tabId].id);
                $('#bookid').attr('name', 'update');
            });

            $('button#delete').click(function (e) {
                e.preventDefault();
                var tabId = $(this).data('arraykey');
                var bookDelete;
                var formDelete = new Object();
                formDelete.id = data[tabId].id;
                formDelete.tilte = data[tabId].title;
                formDelete.author = data[tabId].author;
                formDelete.year = data[tabId].year;
                formDelete.genre = data[tabId].genre;
                bookDelete = JSON.stringify(formDelete);

                $.post(HOST + "delete", bookDelete)
                    .done(function (data, textStatus, jqXHR) {
                        $('#modal-text').append("<span class=' font-weight-bolder font-italic'> Votre livre à bien été supprimé </span>");
                    })
                    .fail(function (jqXHR) {
                        var response = jqXHR.responseJSON;
                        $('#modal-body').toggleClass('alert-success alert-danger');
                        $('#modal-success').toggleClass('alert-success alert-danger');

                        $('#modal-text').append("<span class= 'font-weight-bold' > ERROR " + response.status + " </span> <span class='font-weight-bolder font-italic '>: Impossible de supprimé le livre </span>");
                    });


            });

        })
        .fail(function (jqXHR, textStatus, error) {
            var response = jqXHR.responseJSON;
            console.log(response)
            alert("ERROR : " + response.status + " : Url " + response.error);
        })

    $('#search').keydown(function () {

        $.getJSON(HOST)
            .done(function (data, textStatus, jqXHR) {
                var search = $('#search').val();
                var regex = new RegExp(search, 'i');
                var output;

                $.each(data, function (key, val) {
                    if ((val.title.search(regex) != -1) || (val.author.search(regex) != -1) || (val.year.search(regex) != -1) || (val.genre.search(regex) != -1)) {
                        output += "<tr>";
                        output += "<td data-arraykey = '" + key + "'>" + val.title + "</td>";
                        output += "<td data-arraykey = '" + key + "'>" + val.author + "</td>";
                        output += "<td data-arraykey = '" + key + "'>" + val.year + "</td>";
                        output += "<td data-arraykey = '" + key + "'>" + jsUcfirst(val.genre) + "</td>";
                        output += "<td data-arraykey = '" + key + "'>";

                        output += "<button type='button' data-arraykey = '" + key + "' data-bookId='" + val.id + "' class='btn btn-warning btn-sm rounded m-0 py-1 px-2'> <i class='fas fa-pencil-alt'></i> </button>";

                        output += " <button type='button' id='delete' data-toggle='modal' data-target='#frameModalSuccess' data-arraykey = '" + key + "' class='btn btn-danger btn-sm rounded m-0 py-1 px-2'> <i class='fas fa-trash-alt'></i> </button>";

                        output += "</td>";
                        output += "</tr>";
                    }

                });
                $('tbody').html(output);
                $('button.btn-warning').click(function (e) {
                    e.preventDefault();
                    var tabId = $(this).data('arraykey');
                    $('#nav-books-tab').removeClass('active');
                    $('#nav-books').removeClass('active show');
                    $('#nav-new-tab').addClass('active');
                    $('#nav-new').addClass('active show');

                    $('#title').attr('value', data[tabId].title);
                    $('#author').attr('value', data[tabId].author);
                    $('#year').attr('value', data[tabId].year);
                    $("#genre option[value='" + data[tabId].genre.toUpperCase() + "']").prop('selected', true);
                    $('#bookid').attr('value', data[tabId].id);
                    $('#bookid').attr('name', 'update');
                });

                $('button#delete').click(function (e) {
                    e.preventDefault();
                    var tabId = $(this).data('arraykey');
                    var bookDelete;
                    var formDelete = new Object();
                    formDelete.id = data[tabId].id;
                    formDelete.tilte = data[tabId].title;
                    formDelete.author = data[tabId].author;
                    formDelete.year = data[tabId].year;
                    formDelete.genre = data[tabId].genre;
                    bookDelete = JSON.stringify(formDelete);
                    console.log(bookDelete);

                    $.post(HOST + "delete", bookDelete)
                        .done(function (data, textstatus, jqXHR) {
                            $('#modal-text').append("<strong> Votre livre à bien été supprimé </strong>");
                        })
                        .fail(function (jqXHR) {
                            var response = jqXHR.responseJSON;
                            $('#modal-body').toggleClass('alert-success alert-danger');
                            $('#modal-success').toggleClass('alert-success alert-danger');

                            $('#modal-text').append("<span class= 'font-weight-bold' > ERROR " + response.status + " </span> <span class='font-weight-bolder font-italic '>: Impossible de supprimé le livre </span>");
                        });

                });


            })
            .fail(function (jqXHR, textStatus, error) {
                var response = jqXHR.responseJSON;
                alert("ERROR : " + response.status + " : URL " + response.error);
            });
    });

    $('#conexionBook').submit(function (e) {
        e.preventDefault();
        var method = $('#bookid').attr('name');
        var msgMethod;
        var data;
        var form = new Object();

        form.title = $('#title').val();
        form.author = $('#author').val();
        form.year = $('#year').val();
        form.genre = $('#genre').val();
        if (method === 'update') {
            form.id = $('#bookid').val();
            msgMethod = 'modifié';
        } else {
            method = 'create';
            msgMethod = 'crée';
        }

        data = JSON.stringify(form);


        $.post(HOST + method, data)
            .done(function () {
                $('#modal-text').append("<span class='font-weight-bolder font-italic'> Votre livre à bien été " + msgMethod + " </span>");
            })
            .fail(function (jqXHR, status) {
                var response = jqXHR.responseJSON;
                var res = "";
                $('#modal-body').toggleClass('alert-success alert-danger');
                $('#modal-success').toggleClass('alert-success alert-danger');

                for (let i = 0; i < response.errors.length; i++) {

                    res += "<li>";
                    res += response.errors[i].defaultMessage ;
                    res += "</li>";
                }
                console.log(res);
                $('#modal-text').append("<div class='font-weight-bold text-center' > ERROR " + response.status + " : </div> <ul class='font-weight-bolder font-italic '>  " + res + "</ul>");
            })
            .always(function () {
                $('#conexionBook').load("book.html #conexionBook");
            });


    });

    $('#frameModalSuccess').click(function (e) {
        e.preventDefault();
        if (e.target.id == 'frameModalSuccess') {
            location.reload();
        }
    })

    $('#modal-success').click(function (e) {
        e.preventDefault();
        location.reload();
    });

    $('#nav-books-tab').click(function (e) {
        e.preventDefault();
        $('#conexionBook').load("book.html #conexionBook");
    });

});

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}