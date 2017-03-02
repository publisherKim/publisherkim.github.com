const $ = require('jquery');
const tplFruits = require('../templates/fruits/fruits.hbs');
//module.exports = function(){};
export default (data) => {
    $('[data-view="fruits"]').html(tplFruits({
        fruits: data.fruits,
        total: data.fruits.map(v => {
            return v.price * v.quantity;
        }).reduce((prev, curr) => prev + curr, 0)
    }));
}