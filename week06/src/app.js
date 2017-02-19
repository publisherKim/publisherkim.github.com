//const tplList = require('./list.hbs');
import tplList from './templates/list.hbs';
//const tplMain = require('./main.hbs');
import tplMain from './templates/main.hbs';
import ajax from './util/ajax';
const $ = require('jquery');
const list = require('./json/drawer-list.json');
const tplFruits = require('./templates/fruits/fruits.hbs');
const tplWeather = require('./templates/weather/weather.hbs');

const DOM = {
    fruitBtn: '[data-btn="fruit"]',
    weatherBtn: '[data-btn="weather"]',
    drawerList: '[data-view="list"]'
};

$('#root').html(tplMain({}));
$(DOM.drawerList).html(tplList({
    list: list
}));


const fruitComponent = {
    isShow: false,
    show() {
        /**
         * 1. ajax통신을 해서 데이터를 가지고 온다
         * 2. 그 후에 데이터를 템플릿에 바인딩한다
         * 3. 템플릿을 뿌린다
         */

        ajax('https://raw.githubusercontent.com/suhokim2/suhokim2.github.com/master/data.json', data => {
            this.isShow = true;
            $('[data-view="fruits"]').html(tplFruits({
                fruits: data.fruits,
                total: data.fruits.map(v => {
                    return v.price * v.quantity;
                }).reduce((prev, curr) => prev + curr, 0)
            }));
        });
    },
    hide() {
        this.isShow = false;
        $('[data-view="fruits"]').html('');
    },
    toggle() {
        /*if(!this.isShow) {
            this.show();
        }else{
            this.hide();
        }*/
        //!this.isShow ? this.show() : this.hide();
        this[!this.isShow ? 'show' : 'hide']();
    }
}

const weatherComponent = {
    isShow : false,
    show(){
        /**
         * 1. ajax통신을 해서 데이터를 가지고 온다
         * 2. 그 후에 데이터를 템플릿에 바인딩한다
         * 3. 템플릿을 뿌린다
         */

        ajax('http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257', data => {
            this.isShow = true;
            console.log(data);

            $('[data-view="weather"]').html(tplWeather({
                weather: data.list.map(v => {
                    return {
                        date: new Date(v.dt * 1000),
                        temp: v.temp.day
                    };
                })
            }));
        });
    },
    hide(){
        this.isShow = false;
        $('[data-view="weather"]').html('');
    },
    toggle(){
        this[!this.isShow ? 'show' : 'hide']();
    }
}
$(DOM.fruitBtn).on('click', function(){
    fruitComponent.toggle();
});
$(DOM.weatherBtn).on('click', function(){
    weatherComponent.toggle();
});

navigator.geolocation.getCurrentPosition(function(pos){
    var latitude = pos.coords.latitude;
    var longitude = pos.coords.longitude;

    var map = new naver.maps.Map('map', {center: new naver.maps.LatLng(latitude, longitude)});
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(latitude, longitude),
        map: map
    });
})




