var $ = require('jquery');

var $$ = {
    ajax: ajax
};

function ajax(url, callback){
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200){
            callback(xhr.responseText);
        }
    };

    xhr.open('get', url, true);
    xhr.send();
}
var data = '';
$$.ajax('https://raw.githubusercontent.com/suhokim2/suhokim2.github.com/master/data.json', function(response){
    data = JSON.parse(response);
    return data;
});


$('#btn').on('click', function(e){
    console.log(typeof data, data, data.fruits);
    var html = data.fruits.map( function(fruit){
        var rows = ['<tr>'];
        for(var key in fruit){
            if(fruit.hasOwnProperty(key)){
                rows.push('<td>' + fruit[key] + '</td>')
            }
        }
        rows.push('</tr>');

        return rows.join('');
    }).join('');
    $(document.body).append('<table>'+ html +'</table>');
});

