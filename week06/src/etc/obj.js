function a(){
    //console.log(arguments)
    /*Array.prototype.slice.call(arguments).map(function (v) {
        console.log(v);
    });*/

    Array.from(arguments).map(v=>console.log(v));


}
a(1,2,3,5,67,234,6);

var arguments = {
    0: 1,
    1: 2,
    key: 3,
    3: 5,
    4: 67
}

