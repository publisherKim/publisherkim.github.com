import ajax from '../util/ajax';
import fruits from './fruits';
import weather from './weather';
const $ = require('jquery');

class Component2 {
    constructor(context, tableSelector) {
        this.context = context;
        this.isShow = false;
        this.$fruitSelector = $('[data-view="fruits"]');
        this.$weatherSelector = $('[data-view="weather"]');
        this.tableSelector = tableSelector;
        this.ApiUrl = {
            fruit: '../data.json',
            weather: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257'
        }
    }
    show() {
        let url = this.context === 'fruit' ? this.ApiUrl.fruit : this.ApiUrl.weather;
        ajax(url, data => {
            this.isShow = true;
            this.context === 'fruit' ? fruits(data) : weather(data);
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