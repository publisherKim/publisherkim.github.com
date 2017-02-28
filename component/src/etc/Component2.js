import ajax from '../util/ajax';
const $ = require('jquery');
const tplFruits = require('../templates/fruits/fruits.hbs');
const tplWeather = require('../templates/weather/weather.hbs');

class Component2 {
    constructor(context, url) {
        this.context = context;
        this.isShow = false;
        this.$fruitSelector = $('[data-view="fruits"]');
        this.$weatherSelector = $('[data-view="weather"]');
        this.repeatFruits = tplFruits;
        this.repeatWeather = tplWeather;
        this.url = {
            fruitUrl: '../data.json',
            weahtherUrl: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257'
        }
    }
    fruit() {
        this.$fruitSelector.html(tplFruits({
            fruits: data.fruits,
            total: data.fruits.map(v => {
                return v.price * v.quantity;
            }).reduce((prev, curr) => prev + curr, 0)
        }));
    }
    weather() {
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
        this.context === 'fruit' ? this.url = this.url.fruitUrl : this.url = this.weatherUrl;
        ajax(this.url, data => {
            this.isShow = true;
            this.context === 'fruit' ? this.fruit() : this.weather();;
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