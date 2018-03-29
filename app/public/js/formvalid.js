/**
 * 表单验证方法
 * Create by hw on 2016/12/13
 */
;
define(['module', "utility"], function(module, Util) {
    /**
     * 表单验证
     * @type {Object}
     */
    function formValid() {}
    var utility = new Util();

    formValid.prototype.formObj = function(form) {
        var _self = this;
        _self.tel = $(form).find("input[name='mobile'],input[name='reserve_phone']");
        _self.pwd = $(form).find("input[name='pwd']");
        _self.repwd = $(form).find("input[name='repwd']");
        _self.sub = $(form).find("input[name='sub_btn']") || $(".sub_btn");
        _self.seat = $(form).find("input[name='seat_num']");
        _self.num = $(form).find("input[name='num']");
    }
    formValid.prototype.init = function(form) {
        var _self = this;
    };
    formValid.prototype.isMobile = function(s) {
        var _self = this;
        var patrn = /^(0|86|17951)?(13[0-9]|15[012356789]|166|198|199|17[0134678]|18[0-9]|14[145678])[0-9]{8}$/;
        var nl = $("body").find(".next_btn").length;
        if (s != "" && s != undefined) {
            if (!patrn.exec(s)) {
                utility.tipsWarn("请输入正确的手机号码！");
                return false
            } else {
                if (nl > 0) {
                    $("body").find(".next_btn").addClass("on");
                }
                return true
            }
        } else {
            utility.tipsWarn("手机号码不能为空！");
            return false
        }
    };
    formValid.prototype.isPwd = function(s, tip) {
        var _self = this;
        var patrn = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/;
        tip = tip || "密码";
        if (s != "" && s != undefined) {
            if (!patrn.exec(s)) {
                utility.tipsWarn(tip + "需为8-20位，至少包含字母和数字");
                return false;
            } else {
                return true;
            }
        } else {
            utility.tipsWarn(tip + "不能为空！");
            return false;
        }
    };
    formValid.prototype.isRepwd = function(s, pwd) {
        var _self = this;
        var patrn = /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/;
        var nl = $("body").find(".next_btn").length;
        if (s != "" && s != undefined) {
            if (!patrn.exec(s) || !patrn.exec(pwd)) {
                utility.tipsWarn("需为8-20位，至少包含字母和数字");
                return false
            } else if (s != pwd) {
                utility.tipsWarn("确认密码不一致！");
                return false
            } else {
                if (nl > 0) {
                    $("body").find(".next_btn").addClass("on");
                }
                return true
            }
        } else {
            utility.tipsWarn("密码不能为空！");
            return false
        }
    };
    formValid.prototype.isCardNo = function(s) {
        var _self = this;
        var patrn = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var nl = $("body").find(".next_btn").length;
        if (s != "" && s != undefined) {
            if (!patrn.exec(s)) {
                utility.tipsWarn("请输入正确的身份证号码！");
                return false
            } else {
                if (nl > 0) {
                    $("body").find(".next_btn").addClass("on");
                }
                return true
            }
        } else {
            utility.tipsWarn("身份证号码不能为空！");
            return false
        }
    };
    formValid.prototype.isRealName = function(s) {
        var _self = this;
        var patrn = /^[\u4E00-\u9FA5]{2,16}(?:·[\u4E00-\u9FA5]{2,16})*$/;
        var nl = $("body").find(".next_btn").length;
        if (s != "" && s != undefined) {
            if (!patrn.exec(s)) {
                utility.tipsWarn("请输入正确的姓名格式！");
                return false
            } else {
                if (nl > 0) {
                    $("body").find(".next_btn").addClass("on");
                }
                return true
            }
        } else {
            utility.tipsWarn("真实姓名不能为空！");
            return false
        }
    };
    formValid.prototype.isInviteCode = function(s) {
        var _self = this;
        var patrn = /^(\d{8}|\d{11})$/;
        if (s != "" && s != undefined) {
            if (!patrn.exec(s)) {
                utility.tipsWarn("邀请码必须为8位或者11位数字！");
                return false
            } else {
                return true
            }
        }
    };
    formValid.prototype.isNull = function(s , txt) {
        var _self = this;
        if (s != "" && s != undefined) {
           return true
        } else {
            utility.tipsWarn(txt);
            return false
        }
    };
    formValid.prototype.isBankNo = function(s) {
        var _self = this;
        var patrn = /^(\d{16}|\d{18}|\d{19})$/;
        var nl = $("body").find(".next_btn").length;
        if (s != "" && s != undefined) {
            if (!patrn.exec(s)) {
                utility.tipsWarn("请输入正确的银行卡号格式！");
                return false
            } else {
                if (nl > 0) {
                    $("body").find(".next_btn").addClass("on");
                }
                return true
            }
        } else {
            utility.tipsWarn("银行卡号不能为空！");
            return false
        }
    };
    formValid.prototype.isDigital = function(s, txt, floatNum) {
        var _self = this,
            patrn;
        if (!floatNum) {
            patrn = /^\+?[1-9][0-9]*$/;
        } else {
            patrn = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
        }
        var nl = $("body").find(".next_btn").length;
        if (s != "" && s != undefined) {
            if (!patrn.exec(s)) {
                utility.tipsWarn(txt);
                return false
            } else {
                if (nl > 0) {
                    $("body").find(".next_btn").addClass("on");
                }
                return true
            }
        } else {
            utility.tipsWarn("金额不能为空！");
            return false
        }
    };
    formValid.prototype.DigitalNum = function(s, txt, floatNum) {
        var _self = this,
            patrn = new RegExp("^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$");
        if (!patrn.test(s)) {
            utility.tipsWarn(txt);
            return false
        }
    };
    formValid.prototype.isSMSCode = function(s) {
        var _self = this;
        var patrn = /^\d{6}$/;
        var nl = $("body").find(".next_btn").length;
        if (s != "" && s != undefined) {
            if (!patrn.exec(s)) {
                utility.tipsWarn("请输入6位数字验证码");
                return false
            } else {
                if (nl > 0) {
                    $("body").find(".next_btn").addClass("on");
                }
                return true
            }
        } else {
            utility.tipsWarn("验证码不能为空！");
            return false
        }
    };
    /**
     * 限制数字输入
     * @param  {Object} input   input 输入框
     * @param  {Boolen} isfloat 是否可输入小数
     * @param  {String} txt     提示文字
     * @return {[type]}         [description]
     */
    formValid.prototype.mustDigital = function(input, isfloat, txt) {
            var _self = this;
            var dotTxt, dotPos;
            var ua = new utility.UA();
            if(ua.iphone && !ua.android){
                input.on("keydown", function(e) {
                    var _this = $(this);
                    var _val = _this.val();
                    if (isfloat) {
                        if (e.keyCode != 8 && e.keyCode != 190) {
                            if (e.keyCode < 48 || e.keyCode > 57) {
                                utility.tipsWarn(txt, 3000);
                                return false
                            };
                        }
                        if (_val != "" && _val != undefined) {
                            dotPos = _val.indexOf(".");
                            if (dotPos != -1) {
                                if (e.keyCode == 190) {
                                    return false
                                }
                                dotTxt = utility.subString(_val, dotPos + 1);
                                if (e.keyCode != 8) {
                                    if (dotTxt.length > 1) {
                                        return false;
                                    }
                                }
                            }
                        }
                    } else {
                        if (e.keyCode != 8) {
                            if (e.keyCode < 48 || e.keyCode > 57) {
                                utility.tipsWarn(txt, 3000);
                                return false
                            };
                        }
                    }
                })
                input.on("keyup", function() {
                    var _this = $(this);
                    var _nval = _this.val();
                    if (_nval == "" || _nval == undefined) {
                        _this.val("");
                        return false;
                    }
                })
            }
        }
        /**
         * 发送短信验证码
         * @param  {String} btn        发送按钮
         * @param  {Number} sec        等待时间
         * @param  {String} url        短息接口地址
         * @param  {String} phoneInput 手机号输入框
         * @return {[type]}            [description]
         */
    formValid.prototype.sendValidCode = function(form, btn, sec, url, phoneInput, luotestInput) {
        var _self = this;
        var isTap = true;
        $(btn).on("tap", function() {
            var _this = $(this);
            if (isTap) {
                isTap = false;
                if (_this.hasClass("yes")) {
                    var phone = $(phoneInput).val();
                    var luotestVal = $(luotestInput).val();
                    if (!_self.isMobile(phone)) {
                        isTap = true;
                        return false;
                    } else if (!_self.isNull(luotestVal,"请先进行人机识别验证")) {
                        isTap = true;
                        return false;
                    } else {
                        var n = sec;
                        var timer = null;
                        var postdata = utility.serializeNestedObject(form);
                        $.ajax({
                            url: url + "?" + Math.random(),
                            type: "POST",
                            dataType: "json",
                            data: postdata,
                            success: function(data) {
                                isTap = true;
                                // var data = $.parseJSON(data);
                                if (data.statusCode == 200) {
                                    _this.removeClass("yes").addClass("no").html('<var>' + n + '</var>s后重发');
                                    timer = setInterval(function() {
                                        n--;
                                        if (n < 0) {
                                            isTap = true;
                                            clearInterval(timer);
                                            _this.removeClass("no").addClass("yes").html("重发验证码");
                                        } else {
                                            _this.find("var").html(n);
                                        }
                                    }, 1000);
                                } else {
                                    isTap = true;
                                    LUOCAPTCHA.reset();
                                    utility.tipsWarn(data.warnings.server);
                                }
                            },
                            error: function() {
                                isTap = true;
                                LUOCAPTCHA.reset();
                                utility.tipsWarn("抱歉，请求错误，请刷新再试！");
                            }
                        })
                    }
                }
            }
        })
    }
    module.exports = formValid;
})