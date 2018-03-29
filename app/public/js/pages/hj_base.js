/**
 * 页面公用模块
 * @author hw
 * @method hjBase
 * 
 */
define(["module", "utility"], function(module, Util) {
    "use strict";

    function hjBase() {
        this.init();
    }
    var utility = new Util();
    /**
     * 初始化页面
     */
    hjBase.prototype.init = function() {
        var _self = this;
    }
    module.exports = new hjBase();
});