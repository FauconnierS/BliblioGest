$(document).ready(function () {
    
    $('#search').keydown(function () { 
        
        $.getJSON("http://127.0.0.1:8080/blibliogest/book/",
            function (data, textStatus, jqXHR) {

                var search = $('#search').val();
                var regex = new RegExp(search, 'i');
                var output ;

                $.each(data, function (key, val) {
                    if((val.title.search(regex) != -1 ) || (val.author.search(regex) != -1) || (val.year.search(regex) != -1) || (val.genre.search(regex)!= -1)){
                        output += "<tr>";
                        output += "<td id = '" + key + "'>" + val.title + "</td>";
                        output += "<td id = '" + key + "'>" + val.author + "</td>";
                        output += "<td id = '" + key + "'>" + val.year + "</td>";
                        output += "<td id = '" + key + "'>" + jsUcfirst(val.genre) + "</td>";
                        output += "</td>";
                    }
                     
                });
                $('tbody').html(output);
            }
        );
    });
});
function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}