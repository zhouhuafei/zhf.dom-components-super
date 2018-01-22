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
        const opt = this.opts;
        this.wrapDom = getDomArray(opt.wrap)[0];
        this.moduleDom = null;
        this.init();
    }

    init() {
        this.render();
        this.power();
        if (this.moduleDom) {
            this.wrapDom.appendChild(this.moduleDom);
        }
    }

    render() {

    }

    power() {

    }
}

module.exports = Super;
