import tdList from './tdlist.hbs';
import tplList from './list.hbs';
import tplMain from './main.hbs';
import ajax from './ajax.js';

const $ = require('jquery');

//showTable;
$('#root').html(tplMain({}));

const list = [{
    href: 'http://www.naver.com',
    name: 'naver'
}, {
    href: 'http://www.daum.net',
    name: 'daum'
}];

$('[data-view="list"]').html(tplList({
    list: list
}));

// data ajax
ajax('./data.json', function(response){

    $('#btn_table_show').on('click', function(){
        $('table').toggle();
        console.log(response);
        $('[data-view="tdlist"]').html(tdList({
            tdList: response.fruits
        }));
    });
});


