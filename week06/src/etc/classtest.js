class Component {
    constructor(context) {
        this.context = context;
        this.isShow = false;
    }
    show() {
        this.context.html();
    }
    hide() {
        this.context.html();
    }
    toggle() {
        this.context.html();
    }
}

export default Component;
/*
function Component(context) {
    this.context = context;
}
Component.prototype.show = function() {}
Component.prototype.hide = function() {}
Component.prototype.toggle = function() {}


new Component($('[data-view="fruits"]'));*/
