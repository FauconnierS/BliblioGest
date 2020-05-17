$(document).ready(function () {
    const HOST = "http://127.0.0.1:8080/blibliogest/citation/"

    $.getJSON(HOST,
        function (data, textStatus, jqXHR) {
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

                $.ajax({
                    type: "POST",
                    url: HOST + "delete",
                    data: citationDelete,
                    contentType: "application/json",
                    dataType: "json",
                    success: function (response) {}
                });
                $('#modal-text').append("<strong> Votre livre à bien été supprimé </strong>");
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

                    $.ajax({
                        type: "POST",
                        url: HOST + "delete",
                        data: citationDelete,
                        contentType: "application/json",
                        dataType: "json",
                        success: function (response) {}
                    });
                    $('#modal-text').append("<strong> Votre livre à bien été supprimé </strong>");
                });
            }
        );
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

        $.ajax({
            type: "POST",
            url: HOST + method,
            contentType: "application/json",
            dataType: "json",
            data: data,
            success: function (response) {}

        });
        $('#modal-text').append("<strong>Votre livre à été " + msgMethod + "</strong");

        $('#conexionCitation').load("book.html #conexionCitation");

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