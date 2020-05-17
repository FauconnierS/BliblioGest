$(document).ready(function () {
    const HOST = "http://127.0.0.1:8080/blibliogest/book/";

    $.getJSON(HOST,
        function (data, textStatus, jqXHR) {
            var res;
            $.each(data, function (key, val) {
                res += "<tr>";
                res += "<td data-arraykey ='" + key + "'>" + val.title + "</td>";
                res += "<td data-arraykey ='" + key + "'>" + val.author + "</td>";
                res += "<td data-arraykey ='" + key + "'>" + val.year + "</td>";
                res += "<td data-arraykey ='" + key + "'>" + jsUcfirst(val.genre) + "</td>";
                res += "<td data-arraykey ='" + key + "'>";
                res += "<button type='button' data-arraykey ='" + key + "' data-bookid='" + val.id + "' class='btn btn-warning btn-sm rounded m-0 py-1 px-2'> <i class='fas fa-pencil-alt    '></i> </button>";
                res += " <button type='button' data-arraykey ='" + key + "' data-bookid='" + val.id + "' class='btn btn-danger btn-sm rounded m-0 py-1 px-2'> <i class='fas fa-trash-alt'></i> </button>";
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
                $('#genre').attr('value', data[tabId].genre);
                $('#bookid').attr('value', data[tabId].id);
                $('#bookid').attr('name', 'update');
            });

        }
    );

    $('#search').keydown(function () {

        $.getJSON(HOST,
            function (data, textStatus, jqXHR) {
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
                        output += " <button type='button' data-arraykey = '" + key + "' data-bookId='" + val.id + "' class='btn btn-danger btn-sm rounded m-0 py-1 px-2'> <i class='fas fa-trash-alt'></i> </button>";
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
                    $('#genre').attr('value', data[tabId].genre);
                    $('#bookid').attr('value', data[tabId].id);
                    $('#bookid').attr('name', 'update');
                });
            }
        );
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
            msgMethod = 'modifié'
        } else {
            method = 'create'
            msgMethod = 'crée'
        }

        data = JSON.stringify(form);

        $.ajax({
            type: "POST",
            url: HOST + method,
            contentType: "application/json",
            dataType: "json",
            data: data,
            sucess: function (msg) {},
        });
        $('#modal-text-sucess').append("<strong>Votre livre à bien été " + msgMethod + " </strong>" );
        
        /* 

        $('#conexionBook').load("book.html #conexionBook");
         $('main').prepend("<div class='alert alert-success'> Votre livre à bien été " + msgMethod + " </div>");
        alert("Votre livre à bien été " + msgMethod + ". ");
        setTimeout(function(){
            location.reload(true);
        },100);
        
        */
        
        
    });

    $('#modal-sucess').click(function (e) { 
        e.preventDefault();
        location.reload();
        
    });


});

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}