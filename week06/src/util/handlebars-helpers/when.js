var OPERATORS = {
    equals : function (left, right){
        return left === right;
    },
    notEquals : function (left, right){
        return left !== right;
    },
    identical : function (left, right){
        return left === right;
    },
    equalsAsString : function (left, right){
        return this.identical('' + left, '' + right);
    },
    lessThan : function (left, right){
        return left < right;
    },
    lessThanOrEquals : function (left, right){
        return left <= right;
    },
    greaterThan : function (left, right){
        return left > right;
    },
    greaterThanOrEquals : function (left, right){
        return left >= right;
    },
    and : function (left, right){
        return !!(left && right);
    },
    or : function (left, right){
        return !!(left || right);
    }
};

module.exports = function (left, operator, right, options) {
    var O = OPERATORS[operator];
    if (!O) {
        throw new TypeError(' "when" operator is undefined');
    }
    var content = (O(left, right)) ? options.fn(this) : options.inverse(this);
    return content;
};