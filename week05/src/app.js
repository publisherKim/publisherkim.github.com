import weatherList from './weatherlist.hbs';
import tdList from './tdlist.hbs';
import tplList from './list.hbs';
import tplMain from './main.hbs';
import ajax from './ajax.js';

const $ = require('jquery');

//showTable;
$('#root').html(tplMain({}));

const list = [{
    href: 'http://www.naver.com',
    name: 'naver'
}, {
    href: 'http://www.daum.net',
    name: 'daum'
}];

$('[data-view="list"]').html(tplList({
    list: list
}));

/* 
    1.단위랑 무엇인가? 
    2.책임에 따른 분리란 ? 
    3.역활에는 책임이 따른다.
        - 판사의 역활은 판단에 따른 책임
        - 증인은 증언할 의무(책임?)
        - 소환관은 증인을 소환할 책임
        
    
    그럼 이렇게 짜놓은 함수를 정리하려면 ?
    
    모듈은 각각 ajax 함수엔 ajax함수선언만 되어져있다. 즉 그 모델안에는 하나의 ajax선언 만이 존재.
    
    내가 하려는것 무의적으로 했던것 말고 결과를 만들고 놓고 난 뒤에 역분석 해보자.
    todo list(템플릿의 분리는 제외 로직적인것만 고려)
    ajax.
    fruit table toggle.
    반복된 데이터의 처리 html 그리기.
    합계를 구해서 변수에 저장. 
    합계 함수 돔에 그리기.
    
    그렇게 따지면 각각의 함수를 하나의 클릭했을때 어차피 따로 선언된 함수가 없으니까 이게 그냥 하나의 알고리즘 같은데 이문제에 해당하는... 이결론이 맞나 ?
*/

ajax('../data.json', function(response){
    let data = response.fruits;
    // 내부적으로 선언된 함수를 썼다 분리가 따로 필요한가 ?
    $('#btn_table_show').on('click', function(){
        $('#weather_table').css('display','none');
        $('#fruit_table').toggle();

        $('[data-view="tdlist"]').html(tdList({
            tdList: data
        }));

        let price = data.map(function(item){
            return item.price;
        }).reduce(function(preV, nextV){
            return preV + nextV;
        });
        // 자바스크립트로 회귀한다.
        
        $('tfoot').html('<tr><td>합계</td><td colspan="2">'+ price +'</td></tr>');
    });
});

var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=seoul&mode=json&units=metric&cnt=7&apikey=8d554a626fc5d01d77812b612a6de257';

document.getElementById('btn_weather_show').addEventListener('click', () => {
    ajax(weatherUrl, response => {
        let data = response.list;
        data = data.map(function(item){
            return {dt : new Date(item.dt), temp : item.temp.day};
        });
        $('#fruit_table').css('display','none');
        $('#weather_table').toggle();

        $('[data-view="weatherlist"]').html(weatherList({
            weatherList: data
        }));
    });
});






