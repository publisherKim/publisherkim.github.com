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
        this.ApiUrl = {
            fruit: '../data.json',
            weather: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257'
        }
    }
    fruit(data) {
        this.$fruitSelector.html(tplFruits({
            fruits: data.fruits,
            total: data.fruits.map(v => {
                return v.price * v.quantity;
            }).reduce((prev, curr) => prev + curr, 0)
        }));
    }
    weather(data) {
        this.$weatherSelector.html(tplWeather({
            weather: data.list.map(v => {
                return {
                    date: new Date(v.dt * 1000),
                    temp: v.temp.day
                };
            })
        }));
    }
    show() {
        let url = this.context === 'fruit' ? this.ApiUrl.fruit : this.ApiUrl.weather;
        ajax(url, data => {
            this.isShow = true;
            this.context === 'fruit' ? this.fruit(data) : this.weather(data);
        });

    }
    hide() {
        this.isShow = false;
        (this.context === 'fruit' ? this.$fruitSelector : this.$weatherSelector)['html']('');
    }
    drawer() {
        this[!this.isShow ? 'show' : 'hide']();
    }
}
export default Component2;