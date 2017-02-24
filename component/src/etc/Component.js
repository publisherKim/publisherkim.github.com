import ajax from '../util/ajax';
const $ = require('jquery');
const tplFruits = require('../templates/fruits/fruits.hbs');


/* 
	함수를 선언하고 app.js 에서 로드 했을때 어떻게 쓸수 있느냐...
	fruit btn을 클릭했을때 ajax후 조건이 false 이면 show,
	fruit btn을 클릭했을때 ajax후 조건이 true 이면 hide,
	공통 클릭에대해선 무조건 데이터를 우선 받아와야 하고 false true냐에 따라서 show 또는 hide 함수를 호출해야 한다.
	false 일때 통신하는 동작은 생략해도 된다.
*/
// 클래스 문법은 낯설다 우선 패스 생성자 함수와 프로토 타입을 사용하자.


function Component(userOptions) {

}
Component.prototype.test = function() {
    console.log(1111);
}
Component.prototype.init = function(userOptions) {
    let dftOptions = {
        url: 'https://raw.githubusercontent.com/suhokim2/suhokim2.github.com/master/data.json',
        $selector: $('[data-view="fruits"]'),
        attachTable: tplFruits
    }
    this.settings = $.extend({}, dftOptions, userOptions || {});
};
Component.prototype.jqStyleShow = function(userOptions) {
    this.init(userOptions);
    let options = this.settings;
    if (options.$selector.hasClass('fruits')) {
        ajax(options.url, data => {
            options.$selector.html(options.attachTable({
                fruits: data.fruits,
                total: data.fruits.map(v => {
                    return v.price * v.quantity;
                }).reduce((prev, curr) => prev + curr, 0)
            }));
            options.$selector.toggle();
        });
        return 'merong';
    }
    ajax(options.url, response => {
        let data = response.list;
        data = data.map(function(item) {
            return { date: new Date(item.dt), temp: item.temp.day }
        });
        options.$selector.html(options.attachTable({
            weather: data
        }));
        options.$selector.toggle();
    });

};
Component.prototype.show = function(userOptions) {

};
Component.prototype.hide = function(userOptions) {

};
Component.prototype.toggle = function(userOptions) {

};

let tableDrawer = new Component();





export default tableDrawer;