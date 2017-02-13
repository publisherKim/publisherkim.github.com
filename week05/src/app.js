import weatherList from './weatherlist.hbs';
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
// ajax 순서를 클릭했을때 탔어야 했는데 잘못한것 같은데...
ajax('../data.json', function(response){
    let data = response.fruits;
    $('#btn_table_show').on('click', function(){
        $('#weather_table').css('display','none');
        $('#fruit_table').toggle();

        $('[data-view="tdlist"]').html(tdList({
            tdList: data
        }));

        let price = data.map(function(item){
            return item.price;
        }).reduce(function(preV, nextV){
            return preV + nextV;
        });
        // 자바스크립트로 회귀한다.
        $('tfoot').html('<tr><td>합계</td><td colspan="2">'+ price +'</td></tr>');
    });
});

var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257';

document.getElementById('btn_weather_show').addEventListener('click', () => {
    ajax(weatherUrl, response => {
        let data = response.list;
        console.log(data);
        data = data.map(function(item){
            return {dt : new Date(item.dt), temp : item.temp.day};
        });
        console.log(data);
        $('#fruit_table').css('display','none');
        $('#weather_table').toggle();

        $('[data-view="weatherlist"]').html(weatherList({
            weatherList: data
        }));
    });
});






