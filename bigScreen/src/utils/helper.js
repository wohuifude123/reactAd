/**
 *  作者: Abbott.liu
 *  创建日期: 2017年11月8
 *  功能：辅助函数库
 */

(function() {

    // 使浏览器支持:scope选择器

    var container = document.createElement('div');

    // 检测浏览器是否支持:scope选择器
    try {

        container.querySelectorAll(':scope *');

    } catch (e) {

        // :scope正则
        var scopeReg = /^\s*:scope/gi;

        function overrideSelector(method) {
            var prototype = Element.prototype;

            var oldMethod = prototype[method];

            prototype[method] = function(selector) {

                var nodeList;
                var tempId = false;
                var tempContainer = false;

                if (!selector.match(scopeReg)) {
                    // 没有使用:scope选择器
                    return oldMethod.call(this, selector);
                }

                selector = selector.replace(scopeReg, '');

                // 没有父级元素,给它临时生成一个
                if (!this.parentNode) {

                    container.appendChild(this);
                    tempContainer = true;
                }

                var parentNode = this.parentNode;

                // 没有ID, 临时给一个
                if (!this.id) {
                    this.id = 'scopeQuerySelectorTempId' + (new Date()).getTime();
                    tempId = true;
                }

                // 用原生方法查找元素
                nodeList = oldMethod.call(parentNode, '#' + this.id + ' ' + selector);

                // 删掉临时ID
                if (tempId) {
                    this.id = '';
                }

                // 从临时的父级节点中删除
                if (tempContainer) {
                    container.removeChild(this);
                }

                // 返回匹配结果
                return nodeList;
            }
        }

        // 重写querySelector和querySelectorAll方法
        overrideSelector('querySelector');
        overrideSelector('querySelectorAll');

    }
})();

define(function() {

    /**
     * 判断是不是一个DOM对象
     *
     * @param {*} obj 要判断的对象
     * @return {boolean} 是否是DOM对象
     */
    function isDom(obj) {
        return obj instanceof HTMLElement || obj instanceof Text;
    }

    /**
     * 判断是否是数组
     *
     * @param {*} obj 要判断的对象
     * @return {boolean} 是否是数组
     */
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    /**
     * 判断是否是对象
     *
     * @param {*} obj 要判断的对象
     * @return {boolean} 是否是对象
     */
    function isObject(obj) {
        return !(Object.prototype.toString.call(obj) !== '[object Object]' || isDom(obj) || obj instanceof Window);
    }

    /**
     * 判断是否是字符串
     *
     * @param {*} obj 要判断的对象
     * @return {boolean} 是否是字符串
     */
    function isString(obj) {
        return typeof obj === 'string';
    }

    /**
     * 判断是否是函数
     *
     * @param {*} obj 要判断的对象
     * @return {boolean} 是否是函数
     */
    function isFunction(obj) {
        return typeof obj === 'function';
    }


    /**
     * 判断是否是数字
     *
     * @param {*} obj 要判断的对象
     * @return {boolean} 是否是数字
     */
    function isNumeric(obj) {
        return !isArray(obj) && (obj - parseFloat(obj) + 1) >= 0;
    }

    /**
     * 判断是否是空对象或空数组
     *
     * @param {Object|Array} obj 要判断的对象或数组
     * @return {boolean} 是否是空对象或空数组
     */
    function isEmptyObject(obj) {
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                return false;
            }

        }

        return true;
    }

    /**
     * 判断元素是否在数组中
     *
     * @param {*} ele 要检索的元素
     * @param {Array} arr 被检索的数组
     * @return {boolean} 被检索的元素是否在该数组中
     */
    function inArray(ele, arr) {
        return arr.indexOf(ele) !== -1;
    }


    /**
     * 转数组,数组则直接返回,空对象返回空数组,其他当做新数组元素,返回新数组
     *
     * @param {*} obj 要转换的对象
     * @return {Array} 转换后的数组
     */
    function toArray(obj) {
        if (isArray(obj)) {
            return obj;
        }

        if (isObject(obj) && isEmptyObject(obj)) {
            return [];
        }

        return [
            obj
        ];
    }

    /**
     * 遍历一个对象或数组
     *
     * @param {Array|Object} obj 对象或数组
     * @param {Function} fn  回调函数
     */
    function each(obj, fn) {
        if (!(obj && fn)) {
            return;
        }

        // 优先使用forEach,针对数组
        if (obj.forEach && isFunction(obj.forEach)) {
            obj.forEach(function(item, i) {
                caller(fn, item, i, item);
            });
        } else if (obj.length === +obj.length) {
            for (var i = 0, len = obj.length; i < len; i++) {
                var item = obj[i];

                caller(fn, item, i, item);
            }
        } else {
            // 遍历对象
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    caller(fn, obj[key], key, obj[key]);
                }

            }
        }
    }

    /**
     * 遍历对象或数组,回调的第一个参数是元素名
     *
     * @param {Array|Object} obj 要遍历的对象或数组
     * @param {Function} fn 遍历函数
     */
    function kEach(obj, fn) {
        each(obj, function(key, value) {
            caller(fn, key, value);
        });
    }

    /**
     * 深度克隆一个变量
     *
     * @param {*} source 要克隆的变量
     * @return {*} 返回克隆后的新值
     */
    function clone(source) {
        if (isObject(source)) {
            var result = source;
            if (isArray(source)) {
                result = [];
                for (var i = 0, len = source.length; i < len; i++) {
                    result[i] = clone(source[i]);
                }
            } else {
                result = {};
                for (var key in source) {
                    if (source.hasOwnProperty(key)) {
                        result[key] = clone(source[key]);
                    }

                }
            }

            return result;
        }

        return source;
    }

    /**
     * 深度合并多个对象
     *
     * @return {*|{}}
     */
    function extend() {
        var src;
        var copyIsArray;
        var copy;
        var name;
        var options;
        var clone;
        var target = arguments[0] || {};
        var i = 1;
        var length = arguments.length;
        var deep = false;

        if (typeof target === 'boolean') {
            deep = target;

            target = arguments[i] || {};
            i++;
        }

        if (typeof target !== 'object' && !isFunction(target)) {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {

                    src = target[name];
                    copy = options[name];

                    if (target === copy) {
                        continue;
                    }

                    if (deep && copy && (isObject(copy) || (copyIsArray = isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        } else {
                            clone = src && isObject(src) ? src : {};
                        }

                        target[name] = extend(deep, clone, copy);
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }


                }
            }

        }

        return target;
    }


    /**
     * 获取两个对象的差值
     * @param defaultObj
     * @param newObj
     * @returns {{}}
     */
    function deepDiff(defaultObj, newObj) {

        function _deepDiff(a, b, r) {
            each(a, function(v, k) {

                if (r.hasOwnProperty(k) || b[k] === v) return;

                r[k] = isObject(v) ? deepDiff(v, b[k]) : v;
            });
        }

        var diff = {};
        _deepDiff(newObj, defaultObj, diff);
        return diff;
    }

    /**
     * 回调一个函数,最后一个参数为context
     *
     * @param {Function} callback 回调函数
     * @return {*} 返回回调函数返回的结果
     */
    function caller(callback) {
        var args = arguments;
        var context = args.length === 1 ? null : args[args.length - 1];
        var params = Array.prototype.slice.call(args, 1, args.length);

        if (isFunction(callback)) {
            return callback.apply(context, params);
        }
    }

    /**
     * 从列表中挑选一个可用值(非undefined和null)
     *
     * @return {*} 返回有值的参数
     */
    function pick() {
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            if (obj !== undefined && obj !== null) {
                return obj;
            }

        }
    }

    /**
     * 代理函数
     *
     * @param {Function} fn 函数
     * @param {*=} context context
     * @return {Function|undefined} 返回被修改context的
     */
    function proxy(fn, context) {
        var args;

        if (!isFunction(fn)) {
            return undefined;
        }

        args = Array.prototype.slice.call(arguments, 2);

        return function() {
            return fn.apply(context || this, args.concat(Array.prototype.slice.call(arguments)));
        };
    }

    /**
     * 创建HTMLElement
     *
     * @param {string} tagName 标签名
     * @param {Object=} attrs 属性列表
     * @param {*...} contents
     * @return {Element} 返回创建的HTMLElement
     */
    function createElement(tagName, attrs, contents) {
        var element = document.createElement(tagName);

        if (!isEmptyObject(attrs)) {
            attr(element, attrs);
        }

        if (!isArray(contents)) {
            contents = Array.prototype.slice.call(arguments, 2);
        }

        each(contents, function(content) {
            if (isDom(content)) {
                element.appendChild(content);
            } else if (isString(content)) {
                element.innerHTML = content;
            }
        });

        return element;
    }

    /**
     * 在一个DOM后插入一个DOM
     *
     * @param {HTMLElement} ele 在哪个DOM后插入
     * @param {HTMLElement} newEle 新DOM
     */
    function afterAppend(ele, newEle) {
        ele.parentNode.insertBefore(newEle, ele.nextSibling);
    }

    /**
     * 在一个DOM前插入一个DOM
     *
     * @param {HTMLElement} ele 在哪个DOM前插入
     * @param {HTMLElement} newEle 新DOM
     */
    function beforeAppend(ele, newEle) {
        ele.parentNode.insertBefore(newEle, ele);
    }

    /**
     * DOM选择器,选择匹配的第一个DOM
     *
     * @param {string|HTMLElement} selector 选择器
     * @param {HTMLElement=} parent   父级DOM
     * @return {Element} 返回匹配到的DOM
     */
    function select(selector, parent) {
        return selectAll(selector, parent)[0];
    }

    /**
     * DOM选择器,选择所有符合条件的DOM
     *
     * @param {string|HTMLElement} selector 选择器
     * @param {HTMLElement=} parent   父级DOM
     * @return {Array.<HTMLElement>} 返回匹配到的所有DOM
     */
    function selectAll(selector, parent) {
        return isDom(selector) ? [
            selector
        ] : Array.prototype.slice.call((parent || document).querySelectorAll(selector), 0);
    }

    /**
     * 获取同级DOM
     * @param dom
     * @param selector
     * @returns {*}
     */
    function siblings(dom, selector) {

        var domSiblings = selectAll(':scope > ' + (selector || '*'), (dom.parentElement || document.body));

        var index = domSiblings.indexOf(dom);

        if (index > -1) {
            domSiblings.splice(index, 1);
        }

        return domSiblings;
    }

    /**
     * 设置或获取DOM属性
     *
     * @param {HTMLElement} element DOM对象
     * @param {Object|string} attribute  属性对象或属性名
     * @param {string=} value   属性值
     * @return {*} 获取属性时返回属性值
     */
    function attr(element, attribute, value) {
        if (isString(attribute)) {
            if (arguments.length === 3) {
                element.setAttribute(attribute, value);
            } else {
                return element.getAttribute(attribute);
            }
        } else if (isObject(attribute)) {
            each(attribute, function(val, key) {
                element.setAttribute(key, val);
            });
        }
    }

    /**
     * 删除属性
     *
     * @param {HTMLElement} element DOM对象
     * @param {string} attribute 要删除的属性名
     */
    function removeAttr(element, attribute) {
        element.removeAttribute(attribute);
    }

    /**
     * 给DOM设置css样式
     *
     * @param {HTMLElement} element DOM对象
     * @param {string|Object} style 样式对象或样式名
     * @param {string=} value 样式值
     * @return {*} 获取样式时返回样式值
     */
    function css(element, style, value) {
        if (isString(style)) {
            if (arguments.length === 3) {
                element.style[style] = value;
            } else {
                return element.style[style];
            }
        } else if (isObject(style)) {
            each(style, function(val, key) {
                element.style[key] = val;
            });
        }
    }

    /**
     * 用空格把字符串拆分成数组
     *
     * @param {string} cls 字符串
     * @return {Array.<string>} 字符串数组
     */
    function splitToArray(cls) {
        return (cls || '').match(/\S+/g) || [];
    }

    /**
     * 是否有class
     *
     * @param {HTMLElement} ele DOM对象
     * @param {string} cls  class名
     * @return {boolean} 是否含有该class
     */
    function hasClass(ele, cls) {
        var classes = splitToArray(cls);
        var classList = select(ele).classList;
        for (var i = 0; i < classes.length; i++) {
            if (!classList.contains(classes[i])) {
                return false;
            }

        }
        return true;
    }

    /**
     * 添加class
     *
     * @param {HTMLElement} ele DOM对象
     * @param {string} cls class名
     */
    function addClass(ele, cls) {
        var classes = splitToArray(cls);
        ele = select(ele);
        for (var i = 0; i < classes.length; i++) {
            ele.classList.add(classes[i]);
        }
    }

    /**
     * 删除class
     *
     * @param {HTMLElement} ele DOM对象
     * @param {string} cls class名
     */
    function removeClass(ele, cls) {
        var classes = splitToArray(cls);
        ele = select(ele);
        for (var i = 0; i < classes.length; i++) {
            ele.classList.remove(classes[i]);
        }
    }

    /**
     * 切换class
     *
     * @param {HTMLElement} ele DOM
     * @param {string} cls class名
     * @param {boolean=} force 是否强制添加class
     */
    function toggleClass(ele, cls, force) {
        if (force === true || (force !== false && !hasClass(ele, cls))) {
            addClass(ele, cls);
        } else {
            removeClass(ele, cls);
        }
    }

    /**
     * 给DOM绑定事件
     *
     * @param {HTMLElement} element DOM
     * @param {string} eventName 事件名
     * @param {Function} fn 回调函数
     * @param {boolean=} useCapture useCapture
     */
    function addEvent(element, eventName, fn, useCapture) {
        element.addEventListener(eventName, fn, useCapture);
    }

    /**
     * 取消DOM绑定事件
     *
     * @param {HTMLElement} element DOM
     * @param {string} eventName 事件名
     * @param {Function} fn 已绑定的回调函数
     * @param {boolean=} useCapture useCapture
     */
    function removeEvent(element, eventName, fn, useCapture) {
        element.removeEventListener(eventName, fn, useCapture);
    }

    /**
     * 字符填充
     *
     * @param {number|string} number 被填充的字符串或数值
     * @param {number=} length 需要填充的个数
     * @param {string|number=} join 用什么来填充,默认是0
     * @return {string}
     */
    function pad(number, length, join) {
        return new Array((length || 2) + 1 - String(number).length).join(join || 0) + number;
    }

    /**
     * 将JS对象urlencoded
     *
     * @param {*} param 参数
     * @param {string=} key key
     * @return {string} encode后的字符串
     */
    function serialize(param, key) {
        var paramStr = '';
        if (isString(param) || isNumeric(param) || param instanceof Boolean) {
            paramStr += '&' + key + '=' + encodeURIComponent(param);
        } else {
            each(param, function(_, i) {
                var k = key == null ? i : key + '[' + i + ']';

                paramStr += '&' + serialize(_, k);
            });
        }
        return paramStr.substr(1);
    }


    var XHRGlobalQueryString = {};

    /**
     * 设置全局请求header
     * @param name
     * @param value
     */
    function setXHRGlobalQueryString(name, value) {
        XHRGlobalQueryString[name] = value;
    }

    /**
     * 发送一个Ajax请求
     *
     * @param {Object} option 请求参数
     * @param {Function=} callback  成功请求后的回调函数
     * @return {XMLHttpRequest|ActiveXObject}
     */
    function request(option, callback) {

        /*
         *   业务运维大屏分享的特殊处理
         *   modified by authur at 2017/07/17
         *   获取父级窗口的shareToken 如果存在，则将这个token放到 请求的头部。
         *   tip：取父级窗口的分享令牌，不要用自身的，会存在过期问题.
         */
        //获取分享的token。
        var shareToken = window.top.parent.shareToken;


        var method = (option.method || 'GET').toUpperCase();
        var complete = callback || option.success;

        var url = option.url;
        var xhr = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP'));

        url += (/\?/.test(url) ? '&' : '?') + '_random=' + Math.random();

        if (XHRGlobalQueryString) {
            each(XHRGlobalQueryString, function(val, name) {
                url += '&' + name + '=' + val;
            });
        }

        if (method === 'GET') {

            var serializeData = serialize(option.data || {});
            if (serializeData) {
                url += '&' + serializeData;
            }
        }

        xhr.withCredentials = true;

        xhr.open(method, url, true);

        each(option.headers, function(value, name) {
            xhr.setRequestHeader(name, value);
        });

        //设置分享token到xhr的header当中去.
        if (shareToken && shareToken.length) {
            xhr.setRequestHeader("s-token", shareToken);
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {

                    try {
                        var response = JSON.parse(xhr.responseText);

                    } catch (e) {

                        caller(option.error, '服务器错误,请稍后重试!', xhr);

                        return;
                    }

                    if (option.headerProcess) {
                        caller(option.headerProcess, xhr);
                    }
                    if (response.code && response.code === "success") {

                        caller(complete, response.data, response.msg, xhr);

                    } else {

                        caller(option.error, response.msg, xhr, response);

                    }
                } else if (xhr.status === 401) {
                    //401的话，统一跳转到登录页面。
                    //先清空localstore
                    localStorage.clear();
                    //兼容iframe，让其parent window跳转到登录页面。
                    window.top.parent.location.href = ENV.FrontDomain + "#/login";
                } else {
                    caller(option.error, '网络出现问题,请稍后再试!', xhr);
                }

                xhr.onreadystatechange = function() {};
                xhr = null;
            }

            caller(option.readystatechange, xhr);
        };
        each([
            'abort',
            'load',
            'loadend',
            'loadstart',
            'progress',
            'timeout'
        ], function(eventName) {
            xhr['on' + eventName] = option[eventName];
        });

        if (method === 'POST') {
            xhr.send(option.data);
        } else {
            xhr.send();
        }

        return xhr;
    }

    /**
     * 定义单个属性
     *
     * @param {Object} context 给哪个对象定义属性
     * @param {string} name 属性名
     * @param {Object} desc getter和setter
     * @param {Function=} desc.get getter
     * @param {Function=} desc.set setter
     */
    function defineProperty(context, name, desc) {
        Object.defineProperty(context, name, desc);
    }

    /**
     * 定义多个属性
     *
     * @param {Object} context 给哪个对象定义属性
     * @param {Object} properties 属性列表
     */
    function defineProperties(context, properties) {
        Object.defineProperties(context, properties);
    }

    /**
     * 给对象定义选项,使其支持选项配置
     *
     * @param {Object} context 给哪个对象定义选项
     * @param {Object} properties 选项列表
     * @param {Function=} onChange 属性变化时的回调函数
     */
    function defineOptions(context, properties, onChange) {
        each(properties, function(property, name) {

            if (!isEmptyObject(property)) {
                // 定义属性
                defineProperty(context, name, {
                    // getter
                    get: function() {
                        var ret = caller(property.get, context);

                        if (property.static !== true) {
                            return pick(ret, context.options[name], property.default);
                        }

                        return ret;
                    },
                    // setter
                    set: function(value) {

                        var ret = caller(property.set, value, context);

                        if (property.static !== true) {

                            var newValue = pick(ret, value);

                            if (newValue !== context.options[name]) {

                                context.options[name] = newValue;

                                if (isFunction(onChange)) {

                                    caller(onChange, newValue, name, context);
                                }
                            }
                        }

                    }
                });
            }

        });
    }

    /**
     * 获取范围随机数
     *
     * @param {number} min 最小
     * @param {number} max 最大
     * @return {number} 随机数
     */
    function range(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

    /**
     * 限制一个数值的最小或最大值
     * @param value
     * @param min
     * @param max
     * @returns {number}
     */
    function clamp(value, min, max) {

        value = parseInt(value);

        if (isNumeric(min)) {
            value = Math.max(value, min);
        }

        if (isNumeric(max)) {
            value = Math.min(value, max);
        }

        return value;
    }

    /**
     * 限制一个选项必须是list中的一个
     * @param value
     * @param list
     * @param defaultItem
     * @returns {*}
     */
    function oneOf(value, list, defaultItem) {
        if (inArray(value, list)) {
            return value;
        }
        return defaultItem;
    }

    /**
     * 根据时间戳获取唯一ID字符串
     *
     * @param {string=} join 连接符
     * @return {string} UUID
     */
    function getUUID(join) {
        var uuid = pad((new Date() - 0).toString(32), 24, 'x');

        var strings = [];

        for (var i = 0; i < 24; i += 4) {
            strings.push(uuid.slice(i, i + 4).replace(/[xy]/g, function(s) {
                var random = Math.random() * 32 | 0;
                var value = s === 'x' ? random : (random & 3 | 8);

                return value.toString(32);

            }).toUpperCase());

        }

        return strings.join(pick(join, '-'));
    }

    /**
     * 存储本地数据
     * @param key
     * @param value
     */
    function addStorage(key, value) {
        localStorage[key] = value;
    }

    /**
     * 获取本地数据
     * @param key
     * @returns {*}
     */
    function getStorage(key) {
        return localStorage[key];
    }

    var domFactories = ['div', 'a', 'span', 'label', 'input', 'select', 'i', 'p', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'td', 'th', 'hr', 'br'];
    var DOM = {};
    each(domFactories, function(element) {
        DOM[element] = createElement.bind(null, element);
    });

    return {
        isString: isString,
        isArray: isArray,
        isDom: isDom,
        isFunction: isFunction,
        isObject: isObject,
        isNumeric: isNumeric,
        isEmptyObject: isEmptyObject,
        inArray: inArray,
        toArray: toArray,
        each: each,
        kEach: kEach,
        clone: clone,
        extend: extend,
        caller: caller,
        proxy: proxy,
        pick: pick,
        createElement: createElement,
        afterAppend: afterAppend,
        beforeAppend: beforeAppend,
        select: select,
        selectAll: selectAll,
        attr: attr,
        removeAttr: removeAttr,
        css: css,
        siblings: siblings,
        addClass: addClass,
        hasClass: hasClass,
        toggleClass: toggleClass,
        removeClass: removeClass,
        addEvent: addEvent,
        removeEvent: removeEvent,
        pad: pad,
        request: request,
        setXHRGlobalQueryString: setXHRGlobalQueryString,
        defineProperty: defineProperty,
        defineProperties: defineProperties,
        defineOptions: defineOptions,
        getUUID: getUUID,
        range: range,
        clamp: clamp,
        oneOf: oneOf,
        DOM: DOM,
        addStorage: addStorage,
        getStorage: getStorage,
        deepDiff: deepDiff
    };
});
