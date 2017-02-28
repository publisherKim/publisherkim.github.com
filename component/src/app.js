import tplList from './templates/list.hbs';
import tplMain from './templates/main.hbs';
import ajax from './util/ajax';
import tableDrawer from './etc/Component';
import Component2 from './etc/Component2';
const $ = require('jquery');
const list = require('./json/drawer-list.json');
const tplFruits = require('./templates/fruits/fruits.hbs');
const tplWeather = require('./templates/weather/weather.hbs');

//showTable;
$('#root').html(tplMain({}));

$('[data-view="list"]').html(tplList({
    list: list
}));
const fruitComponent = new Component2('fruit');
const weatherComponent = new Component2('weather');
$('[data-btn="fruit"]').on('click', function() {
    fruitComponent.drawer();
});
var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257';
$('[data-btn="weather"]').on('click', () => {
    weatherComponent.drawer();
});