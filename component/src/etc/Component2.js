import ajax from '../util/ajax';
const $ = require('jquery');
const tplFruits = require('../templates/fruits/fruits.hbs');
const tplWeather = require('../templates/weather/weather.hbs');

class Component2 {
    constructor(context) {
        this.context = context;
        this.isShow = false;
        this.$fruitSelector = $('[data-view="fruits"]');
        this.$weatherSelector = $('[data-view="weather"]');
        this.repeatFruits = tplFruits;
        this.repeatWeather = tplWeather;
    }
    fruit() {
        ajax('https://raw.githubusercontent.com/suhokim2/suhokim2.github.com/master/data.json', data => {
            this.isShow = true;
            $('[data-view="fruits"]').html(tplFruits({
                fruits: data.fruits,
                total: data.fruits.map(v => {
                    return v.price * v.quantity;
                }).reduce((prev, curr) => prev + curr, 0)
            }));
        });
    }
    weather() {
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
    show() {
        this.context === 'fruit' ? this.fruit() : this.weather();
        // if (this.context === 'fruit') {
        //     return this.fruit();
        // }
        // this.weather();
    }
    hide() {
        this.isShow = false;
        (this.context === 'fruit' ? this.$fruitSelector : this.$weatherSelector)['html']('');
        //this.context === 'fruit' ? $('[data-view="fruits"]').html('') : $('[data-view="weather"]').html('');
        // if (this.context === 'fruit') {
        //     $('[data-view="fruits"]').html('');
        //     return 'merong';
        // }
        // $('[data-view="weather"]').html('');
    }
    drawer() {
        this[!this.isShow ? 'show' : 'hide']();
    }
}
export default Component2;