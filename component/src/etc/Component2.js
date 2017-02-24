import ajax from '../util/ajax';
const $ = require('jquery');
const tplFruits = require('../templates/fruits/fruits.hbs');
const tplWeather = require('../templates/weather/weather.hbs');

class Component2 {
    constructor() {
        this.isShow = false;
    }
    show() {
        ajax('https://raw.githubusercontent.com/suhokim2/suhokim2.github.com/master/data.json', data => {
            this.isShow = true;
            $('[data-view="fruits"]').html(tplFruits({
                fruits: data.fruits,
                total: data.fruits.map(v => {
                    return v.price * v.quantity;
                }).reduce((prev, curr) => prev + curr, 0)
            }));
        });
        ajax('http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257', data => {
            this.isShow = true;
            $('[data-view="weather"]').html(tplWeather({
                weather: data.list.map(v => {
                    return {
                        date: new Date(v.dt * 1000),
                        temp: v.temp.day
                    };
                })
            }));
        });
    }
    hide() {
        this.isShow = false;
        $('[data-view="fruits"]').html('');
        $('[data-view="weather"]').html('');
    }
    drawer() {
        this[!this.isShow ? 'show' : 'hide']();
    }
}
export default Component2;