$(document).ready(function () {
    
   $.getJSON("http://127.0.0.1:8080/blibliogest/book/",
       function (data, textStatus, jqXHR) {
           var res ; 
           $.each(data, function (key, val) { 
            res += "<tr>";
            res += "<td>" + val.title + "</td>";
            res += "<td>" + val.author + "</td>";
            res += "<td>" + val.year + "</td>";
            res += "<td>" + jsUcfirst(val.genre) + "</td>";
            res += "</tr>";
           });
           $('tbody').html(res);
           
       }
   );

    $('#search').keydown(function () {

        $.getJSON("http://127.0.0.1:8080/blibliogest/book/",
            function (data, textStatus, jqXHR) {
                var search = $('#search').val();
                var regex = new RegExp(search, 'i');
                var output;

                $.each(data, function (key, val) {
                    if ((val.title.search(regex) != -1) || (val.author.search(regex) != -1) || (val.year.search(regex) != -1) || (val.genre.search(regex) != -1)) {
                        output += "<tr>";
                        output += "<td id = '" + key + "'>" + val.title + "</td>";
                        output += "<td id = '" + key + "'>" + val.author + "</td>";
                        output += "<td id = '" + key + "'>" + val.year + "</td>";
                        output += "<td id = '" + key + "'>" + jsUcfirst(val.genre) + "</td>";
                        output += "</tr>";
                    }

                });
                $('tbody').html(output);
            }
        );
    });

    $('#conexionBook').submit(function (e) {
        e.preventDefault();

        var data;
        var form = new Object();
        form.title = $('#title').val();
        form.author = $('#author').val();
        form.year = $('#year').val();
        form.genre = $('#genre').val();
        data = JSON.stringify(form);
        console.log(data);

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:8080/blibliogest/book/create",
            contentType: "application/json",
            dataType: "json",
            data: data,
            sucess: function (msg) {}
        });
        $('#conexionBook').load("book.html #conexionBook");
        $('main').prepend('<div class="alert alert-success"> Votre livre à vien été ajouté </div>');
    });

});

function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}