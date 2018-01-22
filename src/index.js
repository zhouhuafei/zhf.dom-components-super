const extend = require('zhf.extend');
const domCreate = require('zhf.dom-create');
const domRemove = require('zhf.dom-remove');
const getDomArray = require('zhf.get-dom-array');

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
        this.require();
        this.wrapDomGet();
        this.moduleDomCreate();
        this.power();
        this.moduleDomRender();
    }

    // 绑定方法
    require() {
        const prototype = this.constructor.prototype;
        prototype.extend = extend;
        prototype.getDomArray = getDomArray;
        prototype.domCreate = domCreate;
        prototype.domRemove = domRemove;
    }

    // 外部容器的获取
    wrapDomGet() {
        this.wrapDom = getDomArray(this.opts.wrap)[0];
    }

    // 内部模块的创建(这个方法需要在子类型里被覆盖掉)
    moduleDomCreate() {
        this.moduleDom = domCreate(`<div></div>`);
    }

    // 功能(这个方法需要在子类型里被覆盖掉)
    power() {
    }

    // 内部模块的渲染
    moduleDomRender() {
        if (this.moduleDom && this.wrapDom) {
            this.wrapDom.appendChild(this.moduleDom);
        }
    }

    // 内部模块的移除
    moduleDomRemove() {
        domRemove(this.moduleDom);
    }

    // 内部模块的隐藏
    moduleDomShow() {
        const moduleDom = this.moduleDom;
        moduleDom && (moduleDom.style.display = '');
    }

    // 内部模块的显示
    moduleDomHide() {
        const moduleDom = this.moduleDom;
        moduleDom && (moduleDom.style.display = 'none');
    }
}

module.exports = Super;
