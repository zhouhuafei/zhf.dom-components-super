'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('zhf.extend');
var getDomArray = require('zhf.get-dom-array');
var domCreate = require('zhf.dom-create');
var domRemove = require('zhf.dom-remove');

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
            this.wrapDomGet();
            this.moduleDomCreate();
            this.power();
            this.moduleDomRender();
        }

        // 功能(这个方法需要在子类型里被覆盖掉)

    }, {
        key: 'power',
        value: function power() {}

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
            this.moduleDom = domCreate('<div>moduleDomCreate</div>');
        }

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
    }]);

    return Super;
}();

module.exports = Super;