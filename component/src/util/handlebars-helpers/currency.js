module.exports = function(val) {
    let unit = {
        'kor' : ' won',
        'usa' : ' dollar',
        'jpn' : ' yen'
    }
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + unit.kor;
}