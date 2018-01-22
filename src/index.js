const extend = require('zhf.extend');
const getDomArray = require('zhf.get-dom-array');
const domCreate = require('zhf.dom-create');
const domRemove = require('zhf.dom-remove');

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
        this.init();
    }

    // 初始化
    init() {
        this.wrapDomGet();
        this.moduleDomCreate();
        this.power();
        this.moduleDomRender();
    }

    // 功能(这个方法需要在子类型里被覆盖掉)
    power() {
    }

    // 外部容器的获取
    wrapDomGet() {
        this.wrapDom = getDomArray(this.opts.wrap)[0];
    }

    // 内部模块的创建(这个方法需要在子类型里被覆盖掉)
    moduleDomCreate() {
        this.moduleDom = domCreate(`<div>moduleDomCreate</div>`);
    }

    // 内部模块的渲染
    moduleDomRender() {
        if (this.moduleDom) {
            this.wrapDom.appendChild(this.moduleDom);
        }
    }

    // 内部模块的移除
    moduleDomRemove() {
        domRemove(this.moduleDom);
    }
}

module.exports = Super;
