import tplList from './templates/list.hbs';
import tplMain from './templates/main.hbs';
import ajax from './util/ajax';
import tableDrawer from './etc/Component';
const $ = require('jquery');
const list = require('./json/drawer-list.json');
const tplFruits = require('./templates/fruits/fruits.hbs');
const tplWeather = require('./templates/weather/weather.hbs');

//showTable;
$('#root').html(tplMain({}));

$('[data-view="list"]').html(tplList({
    list: list
}));

console.log(tableDrawer);
$('[data-btn="fruit"]').on('click', function() {
    tableDrawer.test();
    tableDrawer.show({
        url: '../../data.json'
    });
});
// $('[data-btn="fruit"]').on('click', function() {
//     ajax('../data.json', function(response) {
//         let data = response.fruits;
//         $('[data-view="fruits"]').toggle();
//         $('[data-view="fruits"]').html(tplFruits({
//             fruits: data,
//             total: data.map(v => {
//                 return v.price * v.quantity;
//             }).reduce((prev, curr) => prev + curr, 0)
//         }));
//     });
// });

var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257';
$('[data-btn="weather"]').on('click', () => {
    tableDrawer.show({
        $selector: $('[data-view="weather"]')
    });
});
// $('[data-btn="weather"]').on('click', () => {
//     ajax(weatherUrl, response => {
//         let data = response.list;
//         data = data.map(function(item) {
//             return { date: new Date(item.dt), temp: item.temp.day };
//         });
//         $('[data-view="weather"]').toggle();

//         $('[data-view="weather"]').html(tplWeather({
//             weather: data
//         }));
//     });
// });