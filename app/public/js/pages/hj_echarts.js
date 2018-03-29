/**
 * Echarts公用模块
 * @author hw
 * @method hjEcharts
 * 
 */
define(["module", "echarts"], function (module, echarts) {
    "use strict";
    function hjEcharts() {
        this.init();
    }
    /**
     * 初始化页面
     */
    hjEcharts.prototype.init = function () {
        var _self = this;
    }
    /**
     * 饼状图封装
     * @param  {String} obj        数据对象
     * @param  {String} id         id
     * @param  {String} text       主标题
     * @param  {String} subtext    副标题
     * @param  {String} ec_color   颜色
     * @param  {String} ec_num     数据
     * @param  {String} ec_txt     标题
     * @param  {String} center_l   数据
     * @param  {String} center_r   标题
     * @return {[type]}            [description]
     */
    hjEcharts.prototype.pieChart = function (obj) {
        var _default = {
            id: '',
            text: '',
            subtext:'',
            center_l: '50%',
            center_r: '50%'
        };
        for (var key in obj) {
            _default[key] = obj[key];
        }
        var ec_len = _default.ec_txt.length,
            ec_data = [];
        for (var i = 0; i < ec_len; i++) {
            ec_data[i] = {
                value: _default.ec_num[i],
                name: _default.ec_txt[i],
                itemStyle: {
                    normal: { color: _default.ec_color[i] }
                }
            }
        }
        var borChart = echarts.init(document.getElementById(_default.id));
        var borOption = {
            title: {
                text: _default.text,
                subtext: _default.subtext,
                textStyle: {
                    fontSize: 18,
                    color: '#666'
                },
                subtextStyle: {
                    fontSize: 16,
                    color: '#666'
                },
                textAlign: 'center',
                itemGap: -5,
                y: '33%',
                x: '49%'
            },
            tooltip: {
                trigger: 'item',
                transitionDuration: 0
            },
            legend: {
                orient: 'vertical',
                itemGap: 4,
                itemWidth: 14,
                itemHeight: 14,
                textStyle: {
                    fontSize: 12,
                    color: '#666'
                },
                right: 130,
                bottom: 4,
                data: _default.ec_text
            },
            series: [
                {
                    name: _default.subtext,
                    type: 'pie',
                    radius: ['35%', '50%'],
                    center: [_default.center_l, _default.center_r],
                    label: {
                        normal: {
                            show: true,
                            position: 'outside',
                            formatter: "{d}% \n{c}"
                        },
                    },
                    data: ec_data
                }
            ]
        };
        borChart.setOption(borOption);
    }
    module.exports = new hjEcharts();
});