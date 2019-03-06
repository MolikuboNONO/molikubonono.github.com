"use strict";
/**主类 */
var Main = /** @class */ (function () {
    function Main() {
        this.bindEl = [["#zn_simple_m", "zn"], ["#jp_tag_m", "jp"]];
    }
    Main.prototype.initLanguage = function () {
        var _this = this;
        Config.getConfig("navlanguage.json");
        $(window).bind("MsgEvent.navlanguage.json", function (evt, data) {
            _this.lConfig = data;
            _this.changeLanguage();
            $(window).unbind("MsgEvent.navlanguage.json");
        });
        var w = $(window).width() ? $(window).width() : 0;
        if (w > 765) {
            $("#zn_simple").click(function () {
                _this.changeLanguage("zn");
            });
            $("#jp_tag").click(function () {
                _this.changeLanguage("jp");
            });
        }
        else {
            this.mobileCheck();
        }
        $("#mapContainer").height($("#mapContainer").width() * 0.6);
        //窗口大小改变时
        $(window).resize(function () {
            $("#mapContainer").height($("#mapContainer").width() * 0.6);
        });
    };
    Main.prototype.changeLanguage = function (type) {
        if (type === void 0) { type = "jp"; }
        if (!this.lConfig)
            return;
        for (var i in this.lConfig) {
            $("#" + i + ",#m_" + i).text(this.lConfig[i][type]);
        }
        console.log(type);
    };
    Main.prototype.mobileCheck = function () {
        var _this = this;
        var w = $(window).width();
        if (typeof (w) == "undefined")
            w = 0;
        if (w <= 767) {
            var _loop_1 = function (i) {
                $(i[0]).unbind();
                $(i[0]).click(function () {
                    _this.changeLanguage(i[1]);
                });
            };
            for (var _i = 0, _a = this.bindEl; _i < _a.length; _i++) {
                var i = _a[_i];
                _loop_1(i);
            }
        }
    };
    return Main;
}());
/**加载配置文件 */
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.getConfig = function (cName) {
        var str = "./excel/config/client/";
        $.getJSON(str + cName, function (data) {
            if (!data) {
                console.log(cName + " config is miss or error");
            }
            else {
                $(window).trigger("MsgEvent." + cName, data);
            }
        });
    };
    return Config;
}());
/**预加载 */
(function ($) {
})(jQuery);
$(document).ready(function () {
    loadJScript();
});
var main = new Main();
main.initLanguage();
function loadJScript() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=C0BVuyE7RGtHMMERU2GYCUzrlPAaAH1B&callback=init";
    document.body.appendChild(script);
    console.log("script add");
}
function init() {
    var map = new BMap.Map("mapContainer");
    var point = new BMap.Point(35.659341, 139.334319);
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom();
}
/**下载 */
$("#btn1").click(function () {
    window.location.href = "/downloadFile/enrollment.pdf";
});
$("#btn2").click(function () {
    window.location.href = "/downloadFile/desc.pdf";
});
// $("#downloadF").click(()=>{
// })
