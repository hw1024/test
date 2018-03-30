/**
 * hjSlide公用模块
 * @author hw
 * @method hjSlide
 * 
 */
define(["module", "slide"], function (module, slide) {
	"use strict";
	function hjSlide() {
		this.init();
	}
    /**
     * 初始化页面
     */
	hjSlide.prototype.init = function () {
		var _self = this;
	}
	/*
	*轮播图
	*/
	hjSlide.prototype.bdSlide = function (obj, eff) {
		var _self = this;
		var liIndex = $(".bd-slide ul li").size(), dot = $(".hd ul");
		for (var i = 0; i < liIndex; i++) {
			dot.append("<li></li>")
		}
		$(".hd ul li").eq(0).addClass("on");
		if (liIndex == 1) {
			dot.html("");
		}
		var hdWidth = $(".hd").width();
		$(".hd").css({ "margin-left": -hdWidth / 2 + "px" });
		if (liIndex && liIndex > 1) {
			$(obj).slide({
				mainCell: ".bd-slide ul",
				trigger: "click",
				effect: eff,
				autoPlay: true
			});
		}
	}
	/*
	*tab切换组合
	*/
	hjSlide.prototype.tapCell = function (obj1, obj2, eff) {
		var _self = this;
		$(obj1).slide({
			titCell: "h3",
			targetCell: "ul",
			defaultIndex: 0,
			trigger: "click",
			effect: "slideDown",
			delayTime: 300,
			defaultPlay: false
		});
		$(obj2).slide({
			effect: eff,
			trigger: "click"
		});
	};
	module.exports = new hjSlide();
});