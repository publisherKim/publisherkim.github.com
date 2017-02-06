var $ = require('jquery');

var tableData = '';
var a = {
    init : function(){
        $('table').remove();
    },
    show : function(tableData){
        $('input').val('');
        console.log(tableData);
        var html = tableData.map( function(fruit){
        var rows = ['<tr>'];
        for(var key in fruit){
            if(fruit.hasOwnProperty(key)){
                rows.push('<td>' + fruit[key] + '</td>')
            }
        }
        rows.push('</tr>');

        return rows.join('');
    }).join('');
    $(document.body).append('<table>'+ html +'</table>');
    }
}

module.exports = a;
