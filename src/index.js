const extend = require('zhf.extend');
const getDomArray = require('zhf.get-dom-array');
const createDom = require('zhf.create-dom');

class Super {
    constructor(opts) {
        this.opts = extend({
            // 容器
            wrap: 'body',
            // 回调
            callback: {},
            // 配置
            config: {},
            // 数据
            data: {},
        }, opts);
        this.wrapDom = getDomArray(this.wrap)[0];
        this.init();
    }

    init() {
        this.render();
        this.power();
    }

    render() {

    }

    power() {

    }
}

module.exports = Super;
