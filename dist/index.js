'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var extend = require('zhf.extend');
var getDomArray = require('zhf.get-dom-array');
var createElement = require('zhf.create-element');

// 底层构造函数

var Super = function () {
    function Super(opts) {
        _classCallCheck(this, Super);

        // 函数外部传来的参数
        this.opts = extend({
            // 父级
            wrap: 'body', // 这个仅支持传入选择器和原生dom节点
            // 回调
            callback: {
                // 内部模块创建之前
                moduleDomCreateBefore: function moduleDomCreateBefore(self) {
                    // 内部模块创建之前的回调
                },
                // 内部模块创建之后
                moduleDomCreateAfter: function moduleDomCreateAfter(self) {
                    // 内部模块创建之后的回调
                },
                // 内部模块渲染之前
                moduleDomRenderBefore: function moduleDomRenderBefore(self) {
                    // 内部模块渲染之前的回调
                },
                // 内部模块渲染之后
                moduleDomRenderAfter: function moduleDomRenderAfter(self) {
                    // 内部模块渲染之后的回调
                },
                // 内部模块移除之前
                moduleDomRemoveBefore: function moduleDomRemoveBefore(self) {
                    // 内部模块移除之前的回调
                },
                // 内部模块移除之后
                moduleDomRemoveAfter: function moduleDomRemoveAfter(self) {
                    // 内部模块移除之后的回调
                },
                // 内部模块显示之前
                moduleDomShowBefore: function moduleDomShowBefore(self) {
                    // 内部模块显示之前的回调
                },
                // 内部模块显示之后
                moduleDomShowAfter: function moduleDomShowAfter(self) {
                    // 内部模块显示之后的回调
                },
                // 内部模块隐藏之前
                moduleDomHideBefore: function moduleDomHideBefore(self) {
                    // 内部模块隐藏之前的回调
                },
                // 内部模块隐藏之后
                moduleDomHideAfter: function moduleDomHideAfter(self) {
                    // 内部模块隐藏之后的回调
                },
                // 外部容器获取之前
                wrapDomGetBefore: function wrapDomGetBefore(self) {
                    // 外部容器获取之前的回调
                },
                // 外部容器获取之后
                wrapDomGetAfter: function wrapDomGetAfter(self) {
                    // 外部容器获取之后的回调
                },
                // 外部容器移除之前
                wrapDomRemoveBefore: function wrapDomRemoveBefore(self) {
                    // 外部容器移除之前的回调
                },
                // 外部容器移除之后
                wrapDomRemoveAfter: function wrapDomRemoveAfter(self) {
                    // 外部容器移除之后的回调
                }
            },
            // 配置
            config: {
                // 内部模块的属性
                moduleDomAttribute: {},
                // 内部模块的自定义属性
                moduleDomCustomAttribute: {},
                // 内部模块插入到外部容器的方式
                moduleDomRenderMethod: {
                    method: 'appendChild', // 'appendChild','insertBefore'
                    child: null
                },
                moduleDomStyle: {}, // 内部模块的样式
                moduleDomIsRender: true, // 内部模块是否渲染
                moduleDomIsClearTimer: true // 内部模块是否清除所有定时器(默认清除)
            }
        }, opts);
        // 函数内部自带的属性
        this.moduleDom = null; // 内部的模块
        this.wrapDom = null; // 内部模块的外部承载容器,如果没有也没关系,不过不往里面append罢了
        this.moduleDomTimer = {}; // 内部模块的定时器存储(假设内部模块有定时器)
        this.init();
    }

    // 初始化


    _createClass(Super, [{
        key: 'init',
        value: function init() {
            this.render();
            this.power();
        }

        // 渲染

    }, {
        key: 'render',
        value: function render() {
            this.wrapDomGet(); // 外部容器的获取
            this.moduleDomRemove(); // 内部模块的移除(重新初始化的时候要移除掉以前有的内部模块)
            var callback = this.opts.callback;
            callback.moduleDomCreateBefore(this);
            this.moduleDomCreate(); // 内部模块的创建
            callback.moduleDomCreateAfter(this);
            this.moduleDomRender(); // 内部模块的渲染(如果外部容器存在,就把内部模块填充到外部容器里)
        }

        // 功能(这个方法需要在子类型里被覆盖掉)

    }, {
        key: 'power',
        value: function power() {}
        // 功能


        // 内部模块的创建(这个方法需要在子类型里被覆盖掉)

    }, {
        key: 'moduleDomCreate',
        value: function moduleDomCreate() {
            var config = this.opts.config;
            this.moduleDom = createElement({
                style: config.moduleDomStyle,
                customAttribute: config.moduleDomCustomAttribute,
                attribute: extend({}, config.moduleDomAttribute)
            });
        }

        // 内部模块的渲染

    }, {
        key: 'moduleDomRender',
        value: function moduleDomRender() {
            var callback = this.opts.callback;
            var config = this.opts.config;
            if (config.moduleDomIsRender && this.wrapDom && this.moduleDom) {
                callback.moduleDomRenderBefore(this);
                var renderMethod = config.moduleDomRenderMethod;
                if (renderMethod.method === 'insertBefore') {
                    var dom = getDomArray(renderMethod.child)[0];
                    if (dom) {
                        this.wrapDom.insertBefore(this.moduleDom, dom);
                    } else {
                        this.wrapDom.insertBefore(this.moduleDom, this.wrapDom.children[0]);
                    }
                }
                if (renderMethod.method === 'appendChild') {
                    this.wrapDom.appendChild(this.moduleDom);
                }
                callback.moduleDomRenderAfter(this);
            }
        }

        // 内部模块的移除

    }, {
        key: 'moduleDomRemove',
        value: function moduleDomRemove() {
            var callback = this.opts.callback;
            if (this.moduleDom && this.moduleDom.parentNode) {
                callback.moduleDomRemoveBefore(this);
                this.moduleDom.parentNode.removeChild(this.moduleDom);
                callback.moduleDomRemoveAfter(this);
            }
            this.moduleDomClearTimer();
        }

        // 内部模块的定时器清除(假设内部模块有定时器)

    }, {
        key: 'moduleDomClearTimer',
        value: function moduleDomClearTimer() {
            var self = this;
            if (self.opts.config.moduleDomIsClearTimer) {
                Object.keys(self.moduleDomTimer).forEach(function (attr) {
                    clearInterval(self.moduleDomTimer[attr]);
                    clearTimeout(self.moduleDomTimer[attr]);
                });
            }
        }

        // 内部模块的隐藏(显示隐藏和是否清除定时器无关)

    }, {
        key: 'moduleDomHide',
        value: function moduleDomHide() {
            var callback = this.opts.callback;
            if (this.moduleDom && this.moduleDom.parentNode) {
                this.opts.config.moduleDomIsRender = false;
                callback.moduleDomHideBefore(this);
                this.moduleDom.parentNode.removeChild(this.moduleDom);
                callback.moduleDomHideAfter(this);
            }
        }

        // 内部模块的显示(显示隐藏和是否清除定时器无关)

    }, {
        key: 'moduleDomShow',
        value: function moduleDomShow() {
            var callback = this.opts.callback;
            callback.moduleDomShowBefore(this);
            if (this.wrapDom) {
                this.opts.config.moduleDomIsRender = true;
                this.moduleDomRender();
            }
            callback.moduleDomShowAfter(this);
        }

        // 外部容器的获取

    }, {
        key: 'wrapDomGet',
        value: function wrapDomGet() {
            var callback = this.opts.callback;
            callback.wrapDomGetBefore(this);
            this.wrapDom = getDomArray(this.opts.wrap)[0];
            callback.wrapDomGetAfter(this);
        }

        // 外部容器的移除

    }, {
        key: 'wrapDomRemove',
        value: function wrapDomRemove() {
            var callback = this.opts.callback;
            // 先移除内部的模块
            this.moduleDomRemove();
            // 再移除外部的容器
            if (this.wrapDom && this.wrapDom.parentNode) {
                callback.wrapDomRemoveBefore(this);
                this.wrapDom.parentNode.removeChild(this.wrapDom);
                callback.wrapDomRemoveAfter(this);
            }
        }

        // 获取内部模块的整体html结构

    }, {
        key: 'getModuleDomHtml',
        value: function getModuleDomHtml() {
            return this.moduleDom ? this.moduleDom.outerHTML : '';
        }
    }]);

    return Super;
}();

module.exports = Super;
