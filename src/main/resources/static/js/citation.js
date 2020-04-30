$(document).ready(function () {

    $.getJSON("http://127.0.0.1:8080/blibliogest/citation/",
        function (data, textStatus, jqXHR) {
            var res;
            $.each(data, function (key, val) {
                res += "<tr>";
                res += "<td>" + val.text + "</td>";
                res += "<td>" + val.author + "</td>";
                res += "</tr>";

            });
            $('tbody').html(res);

        }
    );

    $('#search').keydown(function () {

        $.getJSON("http://127.0.0.1:8080/blibliogest/citation/",
            function (data, textStatus, jqXHR) {
                var search = $('#search').val();
                var regex = new RegExp(search, 'i');
                var output;

                $.each(data, function (key, val) {
                    if ((val.text.search(regex) != -1) || (val.author.search(regex) != -1)) {

                        output += "<tr>";
                        output += "<td id ='" + key + "'>" + val.text + "</td>"
                        output += "<td id ='" + key + "'>" + val.author + "</td>"
                        output += "</tr>";
                    }

                });
                $('tbody').html(output);
            }
        );
    })

    $('#conexionCitation').submit(function (e) {
        e.preventDefault();

        var data;
        var form = new Object();
        form.text = $('#text').val();
        form.author = $('#author').val();
        data = JSON.stringify(form);
        console.log(data);

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/blibliogest/citation/create",
            contentType: "application/json",
            dataType: "json",
            data: data,
            success: function (response) {}

        });
        $('#conexionCitation').load("citation.html #conexionCitation");
        $('main').prepend('<div class="alert alert-success"> Votre Citation à bien été ajoutée </div>');

    });

});