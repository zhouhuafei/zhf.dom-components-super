'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('zhf.extend');
var domCreate = require('zhf.dom-create');
var domRemove = require('zhf.dom-remove');
var getDomArray = require('zhf.get-dom-array');

var Super = function () {
    function Super(opts) {
        _classCallCheck(this, Super);

        this.opts = extend({
            // 容器
            wrap: 'body',
            // 回调
            callback: {},
            // 配置
            config: {},
            // 数据
            data: {}
        }, opts);
        this.init();
    }

    // 初始化


    _createClass(Super, [{
        key: 'init',
        value: function init() {
            this.require();
            this.wrapDomGet();
            this.moduleDomCreate();
            this.power();
            this.moduleDomRender();
        }

        // 绑定方法

    }, {
        key: 'require',
        value: function require() {
            var prototype = this.constructor.prototype;
            prototype.extend = extend;
            prototype.getDomArray = getDomArray;
            prototype.domCreate = domCreate;
            prototype.domRemove = domRemove;
        }

        // 外部容器的获取

    }, {
        key: 'wrapDomGet',
        value: function wrapDomGet() {
            this.wrapDom = getDomArray(this.opts.wrap)[0];
        }

        // 内部模块的创建(这个方法需要在子类型里被覆盖掉)

    }, {
        key: 'moduleDomCreate',
        value: function moduleDomCreate() {
            this.moduleDom = domCreate('<div></div>');
        }

        // 功能(这个方法需要在子类型里被覆盖掉)

    }, {
        key: 'power',
        value: function power() {}

        // 内部模块的渲染

    }, {
        key: 'moduleDomRender',
        value: function moduleDomRender() {
            if (this.moduleDom) {
                this.wrapDom.appendChild(this.moduleDom);
            }
        }

        // 内部模块的移除

    }, {
        key: 'moduleDomRemove',
        value: function moduleDomRemove() {
            domRemove(this.moduleDom);
        }

        // 内部模块的隐藏

    }, {
        key: 'moduleDomShow',
        value: function moduleDomShow() {
            var moduleDom = this.moduleDom;
            moduleDom && (moduleDom.style.display = '');
        }

        // 内部模块的显示

    }, {
        key: 'moduleDomHide',
        value: function moduleDomHide() {
            var moduleDom = this.moduleDom;
            moduleDom && (moduleDom.style.display = 'none');
        }
    }]);

    return Super;
}();

module.exports = Super;