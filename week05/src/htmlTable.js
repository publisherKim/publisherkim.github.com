import ajax from './ajax';

const data = ajax('../data.json', function(response){
    return response;
});