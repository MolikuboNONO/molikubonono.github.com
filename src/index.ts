/**主类 */
class Main {
    public constructor() {

    }

    /**语言配置 */
    private lConfig: any;
    private bindEl:string[][] = [["#zn_simple_m","zn"],["#jp_tag_m","jp"]];

    public initLanguage(): void {
        Config.getConfig("navlanguage.json");
        $(window).bind("MsgEvent.navlanguage.json", (evt, data) => {
            this.lConfig = data;
            this.changeLanguage();
            $(window).unbind("MsgEvent.navlanguage.json");
        })
        let w = $(window).width() ? $(window).width() as number : 0;
        if(w>765){
            $("#zn_simple").click(() => {
                this.changeLanguage("zn");
            });
            $("#jp_tag").click(() => {
                this.changeLanguage("jp");
            });
        }else{
            this.mobileCheck();
        }

        $("#mapContainer").height(($("#mapContainer").width() as number) * 0.6);
        
        //窗口大小改变时
        $(window).resize(()=>{
            $("#mapContainer").height(($("#mapContainer").width() as number) * 0.6);
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
            for(let i of this.bindEl){
                $(i[0]).unbind();
                $(i[0]).click(()=>{
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

$(document).ready(()=>{
    loadJScript();
});

let main = new Main();
main.initLanguage();

function loadJScript() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://api.map.baidu.com/api?v=2.0&ak=C0BVuyE7RGtHMMERU2GYCUzrlPAaAH1B&callback=init";
    document.body.appendChild(script);
    console.log("script add");
    
}

function init() {
    let map = new BMap.Map("mapContainer");
    let point = new BMap.Point(35.659341, 139.334319);
    map.centerAndZoom(point,15);
    map.enableScrollWheelZoom();
}

// $("#downloadF").click(()=>{

// })

