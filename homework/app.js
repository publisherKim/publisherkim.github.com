var $ = require('jquery');

var $$ = {
    ajax: ajax
};

var htmlAction = require('./htmltable');

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
    htmlAction.init();
    tableData = data.fruits;
    var html = htmlAction.show(tableData);
    
});

$('#filter').on('click', function(e){
    var price = $('input').val();
    htmlAction.init();
    tableData = data.fruits.filter( function(fruit){
        return fruit.price >= price;
    });
    htmlAction.show(tableData);
});
