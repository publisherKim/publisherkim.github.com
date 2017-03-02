const $ = require('jquery');
const tplWeather = require('../templates/weather/weather.hbs');
//module.exports = function(){};
export default (data) => {
    $('[data-view="weather"]').html(tplWeather({
        weather: data.list.map(v => {
            return {
                date: new Date(v.dt * 1000),
                temp: v.temp.day
            };
        })
    }));
}