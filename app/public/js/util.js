/**
 * 公共方法
 * Create by hw on 2016/12/13
 */
;
define(["require", 'module'], function(require, module) {
    /**
     * @class Util
     * @constructor
     */
    function Util() {}
    /**
     * roundFixed  保留小数点
     * @param  {[type]} num     [description]
     * @param  {[type]} point   [description]
     * @return {[type]}         [description]
     */
    Util.prototype.roundFixed = function (num, point) {
        if (isNaN(num)) {
            return null;
        }
        var p = point;
        point = Math.pow(10, point + 1);
        num = num * point;
        if (num === +num) {
            var result = parseInt((num + 5) / 10) / point * 10;
        } else {
            var result = +num;
        }
        return result.toFixed(+p);
    }
    /**
     * stopPropagation  
     * @param  {[type]} e event
     * @return {[type]}         [description]
     */
    Util.prototype.stopPropagation = function (e) {
        e = e || window.event;
        if (e.stopPropagation) { //W3C阻止冒泡方法
            e.stopPropagation();
        } else {
            e.cancelBubble = true; //IE阻止冒泡方法
        }
    }
    /**
     * textSlide
     * @param  {[type]}    list
     * @param  {[type]}    time
     * @return {[type]}    [description]
     */
    Util.prototype.textSlide = function (list, time) {
        var first = $(list).find("li").eq(0).clone();
        $(list).find("ul").append(first);
        var aL = Number($(list).find("li").length),
            ah = $(list).find("li").height();
        var b = 0;
        var timer = null;
        function sss() {
            b++;
            if (b < aL) {
                if (b == (aL - 1)) {
                    $(list).find("ul").animate({
                        "top": -b * ah + "px"
                    }, 400);
                    setTimeout(function () {
                        $(list).find("ul").css({
                            "top": "0"
                        });
                    }, 500);
                } else {
                    $(list).find("ul").animate({
                        "top": -b * ah + "px"
                    }, 400);
                }
            } else {
                b = 1;
                $(list).find("ul").animate({
                    "top": -b * ah + "px"
                }, 400);
            }
        }
        timer = setInterval(sss, time);
        $(list).on("mouseover", function () {
            clearInterval(timer)
        })
        $(list).on("mouseleave", function () {
            timer = setInterval(sss, time);
        })
    }
    /**
     * serializeNestedObject  输出序列化表单
     * @param  {[type]} obj     [description]
     * @return {[type]}         [description]
     */
    Util.prototype.serializeNestedObject = function (obj) {
        var json = {};
        var arrObj = $(obj).serializeArray();
        //alert(JSON.stringify(arrObj));
        $.each(arrObj, function () {
            // 对重复的name属性，会将对应的众多值存储成json数组
            if (json[this.name]) {
                if (!json[this.name].push) {
                    json[this.name] = [json[this.name]];
                }
                json[this.name].push(this.value || '');
            } else {
                // 有嵌套的属性，用'.'分隔的
                if (this.name.indexOf('.') > -1) {
                    var pos = this.name.indexOf('.');
                    var key = this.name.substring(0, pos);
                    // 判断此key是否已存在json数据中，不存在则新建一个对象出来
                    if (!existKeyInJSON(key, json)) {
                        json[key] = {};
                    }
                    var subKey = this.name.substring(pos + 1);
                    json[key][subKey] = this.value || '';
                }
                // 普通属性
                else {
                    json[this.name] = this.value || '';
                }

            }
        });

        // 处理那些值应该属于数组的元素，即带'[number]'的key-value对
        var resultJson = {};
        for (var key in json) {
            // 数组元素
            if (key.indexOf('[') > -1) {
                var pos = key.indexOf('[');
                var realKey = key.substring(0, pos);
                // 判断此key是否已存在json数据中，不存在则新建一个数组出来
                if (!existKeyInJSON(realKey, resultJson)) {
                    resultJson[realKey] = [];
                }
                resultJson[realKey].push(json[key]);

            }
            else { // 单元素
                resultJson[key] = json[key];
            }
        }
        return resultJson;
    }
    /**
     * advertpopFn  广告弹层
     * @param  {[type]} id      [description]
     * @param  {[type]} img     [description]
     * @param  {[type]} conut   [description]
     * @return {[type]}         [description]
     */
    Util.prototype.advertpopFn = function (img, conut) {
        var that = this;
        var isEvt = that.getCookie("notice_storage");
        var advert_box = '<div class="notice-overlay"></div>\
				<div class="notice-box">\
					<div class="notice-content">\
					<img src="'+ img + '" class="notice-img">';
        if (!!conut) {
            advert_box += '<a href="javascript:void(0);" class="notice-btn notice-btn-time">确定<span class="load-timer">（<var id="load-time" class="load-time">5</var>s）</span></a>';
        } else {
            advert_box += '<a href="javascript:void(0);" class="notice-btn notice-btn-act">确定</a>';
        }
        advert_box += '</div>\
				</div>';
        if (isEvt != "open") {
            $("body").append(advert_box);
        }
        if (!!conut) {
            var timer = window.setInterval(function () {
                var timeVal = $("#load-time").html();
                $("#load-time").html(timeVal * 1 - 1);
                if (timeVal == 1) {
                    clearInterval(timer);
                    $(".load-timer").remove();
                    $(".notice-btn").removeClass("notice-btn-time");
                    $(".notice-box").delegate('.notice-btn', 'click', function (event) {
                        that.setCookies("notice_storage", "open");
                        $(".notice-overlay").remove();
                        $(".notice-box").remove();
                        event.preventDefault();
                    });
                }
            }, 1000);
        } else {
            $(".notice-box").delegate('.notice-btn', 'click', function (event) {
                that.setCookies("notice_storage", "open");
                $(".notice-overlay").remove();
                $(".notice-box").remove();
                event.preventDefault();
            });
        }
    }
    /**
         * set cookie, non-comment use
         *
         * @method setCookie, non-comment use, please use setLocalStorage instead
         * @param {String} name
         * @param {String} value
         * @param {Int} day
    */
    Util.prototype.setCookie = function (name, value, day) {
        var Days = day || 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        var theDate = new Date(exp), expiresTime = new Date(theDate.toLocaleDateString());
        document.cookie = name + "=" + escape(value) + ";expires=" + expiresTime;
    }
    /**
         * set cookie, non-comment use
         *
         * @method setCookie, non-comment use, please use setLocalStorage instead
         * @param {String} name
         * @param {String} value
         * @param {Int} day
    */
    Util.prototype.setCookies = function (name, value) {
        var curDate = new Date();
        var curTamp = curDate.getTime();
        var dateIns = curDate.toLocaleDateString();
        var resultDate = dateIns.replace('年', '/').replace('月', '/').replace('日', '');
        var curWeeHours = new Date(resultDate).getTime() - 1;
        var passedTamp = curTamp - curWeeHours;
        var leftTamp = 24 * 60 * 60 * 1000 - passedTamp;
        var leftTime = new Date();
        leftTime.setTime(leftTamp + curTamp);
        document.cookie = name + "=" + escape(value) + ";expires=" + leftTime.toGMTString();
    }
    /**
     * get cookie, non-comment use
     *
     * @method getCookie, non-comment use, please use getLocalStorage instead
     * @param {String} name
     * @returns {String}
     */
    Util.prototype.getCookie = function (name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]);
        return null;
    }
    module.exports = Util;
})
