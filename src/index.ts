/**主类 */
class Main {
    public constructor() {

    }

    /**语言配置 */
    private lConfig: any;
    private bindEl: string[][] = [["#zn_simple_m", "zn"], ["#jp_tag_m", "jp"]];

    public initLanguage(): void {
        Config.getConfig("navlanguage.json");
        $(window).bind("MsgEvent.navlanguage.json", (evt, data) => {
            this.lConfig = data;
            this.changeLanguage();
            $(window).unbind("MsgEvent.navlanguage.json");
        })
        let w = $(window).width() ? $(window).width() as number : 0;
        if (w > 765) {
            $("#zn_simple").click(() => {
                this.changeLanguage("zn");
            });
            $("#jp_tag").click(() => {
                this.changeLanguage("jp");
            });
        } else {
            this.mobileCheck();
        }


        $("#mapContainer_1").height(($("#mapContainer_1").width() as number) * 0.6);
        $("#mMessage").width($("#mSubject").width() as number);
        //窗口大小改变时
        $(window).resize(() => {
            $("#mMessage").width($("#mSubject").width() as number);
            $("#mapContainer_1").height(($("#mapContainer_1").width() as number) * 0.6);
        })
    }

    private changeLanguage(type: string = "jp"): void {
        if (!this.lConfig) return;
        for (let i in this.lConfig) {
            $("#" + i + ",#m_" + i).text(this.lConfig[i][type]);
        }
        console.log(type);

    }

    private mobileCheck(): void {
        let w = $(window).width();
        if (typeof (w) == "undefined") w = 0;
        if (w <= 767) {
            for (let i of this.bindEl) {
                $(i[0]).unbind();
                $(i[0]).click(() => {
                    this.changeLanguage(i[1]);
                });
            }
        }
    }

}

/**加载配置文件 */
class Config {
    public static getConfig(cName: string): void {
        let str = "./excel/config/client/";
        $.getJSON(str + cName, function (data: any) {
            if (!data) {
                console.log(cName + " config is miss or error");
            } else {
                $(window).trigger("MsgEvent." + cName, data);
            }
        })
    }
}



/**预加载 */
(function ($) {

})(jQuery);

$(document).ready(() => {
    loadJScript();
});

let main = new Main();
let map;
main.initLanguage();

function loadJScript() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    // script.src = "https://webapi.amap.com/maps?v=1.4.13&key=0afd1addecce908b9fc5088baa698412&callback=initialize";
    // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAkcOQtadQWXAeaf392-XhbYekaj3qoZMQ&callback=initialize";
    document.body.appendChild(script);
    console.log("script add");

}

function initialize() {
    // let mapProp = {
    //     center: new google.maps.LatLng(35.659341, 139.334319),
    //     zoom: 7,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    let map = new google.maps.Map(document.getElementById("mapContainer_1"), {
        center: { lat: 35.659341, lng: 139.334319 },
        zoom: 15
    });
    // let gps = [35.659341, 139.334319];
    // let resultL = [0, 0];
    // AMap.convertFrom(gps, 'gps', (s, r) => {
    //     if (r.info === "ok") {
    //         resultL = [r.locations[0].lat, r.locations[0].lng];
    //         console.log(resultL);
    //     }
    // });
    // let map = new AMap.Map("mapContainer_1", {
    //     zoom: 15,
    //     resizeEnable: true,
    // });
}
google.maps.event.addDomListener(window, 'load', initialize);
/**下载 */
$("#btn1").click(() => {
    window.location.href = "/downloadFile/enrollment.pdf";
});

$("#btn2").click(() => {
    window.location.href = "/downloadFile/desc.pdf";
});

$("#m_nav_6").click(() => {
    if (window.location.pathname != "/index.html")
        window.location.href = "index.html"
    $("html,body").animate({ scrollTop: $("#DLFile").offset().top }, 1000);
})
$("#nav_6").click(() => {
    if (window.location.pathname != "/index.html")
        window.location.href = "index.html"
    $("html,body").animate({ scrollTop: $("#DLFile").offset().top }, 1000);
})


// $("#downloadF").click(()=>{

// })

