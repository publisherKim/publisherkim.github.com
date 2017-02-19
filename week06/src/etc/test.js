ajax('/data.json', function(data){
    return data + 1;
});
ajax('/data.json', data => data + 1);

[].map(v => v + 1);
[{price: 300}].filter(v => v.price > 200);
[{price: 300}].filter((v,i,a) => {
    console.log(i);
    console.log(a);
    return v.price > 200
});