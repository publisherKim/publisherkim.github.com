//module.exports = function(){};
export default (url, callback) => {
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            callback(JSON.parse(xhr.responseText));
        }
    };

    xhr.open('get', url, true);
    xhr.send();
};

