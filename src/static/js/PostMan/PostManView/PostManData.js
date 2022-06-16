import { reactive } from "vue";

export const rq_info = reactive({
    infopage_seclet: "params",
    url: "",
    params: [],
    headers: [],
    data:"",
    parmas_imgShow: true,
});
export const res_info = reactive({
    isShow:false,
    infopage_seclet: "Body",
    code:"",
    time:"",
    headers: [],
    data:"",
    Cookis: []
});

export function Set_res_info(code='404', time='0', headers=[], data='', Cookis=''){
    res_info.code=code
    res_info.time=time
    res_info.data=data
    res_info.headers=headers
    res_info.Cookis=Cookis
}

/**
 * 通过url字符串解析请求的参数
 */
export function Get_InputParams() {
    rq_info.params = new Array();
    try {
        if (rq_info.url.indexOf("?") > 0) {
            var params = rq_info.url.split("?");
            if (params[1].indexOf("&") > 0) {
                params[1].split("&").map((item) => {
                    var k_V = item.split("=");
                    if (k_V[0] && k_V[1]) {
                        rq_info.params.push({ key: k_V[0], value: k_V[1], desc: "" });
                    }
                });
            } else if (params[1].indexOf("=") > 0) {
                var K_V = params[1].split("=");
                if (K_V[0] && K_V[1]) {
                    rq_info.params.push({ key: K_V[0], value: K_V[1] });
                }
            }
        }
        if (rq_info.params.length > 0) {
            rq_info.parmas_imgShow = false;
        } else {
            rq_info.parmas_imgShow = true;
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * 更改参数，并刷新url字符串
 */
export function Set_Url() {
    if (rq_info.url === "") {
        return;
    }
    rq_info.url = rq_info.url.split("?")[0] + "?";
    for (var i = 0; i < rq_info.params.length; i++) {
        if (rq_info.params.length > 1 && i < rq_info.params.length - 1) {
            rq_info.url +=
                rq_info.params[i].key + "=" + rq_info.params[i].value + "&";
            continue;
        }
        rq_info.url += rq_info.params[i].key + "=" + rq_info.params[i].value;
    }
}

/**
 * 点击删除，实时更新参数集合与url字符串
 */
export function Delet_Param(psramsItem) {
    rq_info.params = rq_info.params.filter((item) => item !== psramsItem);
    Set_Url();
    if (!rq_info.params.length > 0) {
        rq_info.parmas_imgShow = true;
    }
}

/**
 * 增加参数
 */
export function Add_Param() {
    rq_info.parmas_imgShow = false;
    rq_info.params.push({ key: "", value: "", desc: "" });
}

/**
 * 增加请求头参数
 */
export function Add_HeadersParam() {
    rq_info.parmas_imgShow = false;
    rq_info.headers.push({ key: "", value: "", desc: "" });
}

/**
 * 删除请求头参数
 */
export function Delete_HeadersParam(psramsItem) {
    rq_info.headers = rq_info.headers.filter((item) => item != psramsItem);
    if (!rq_info.headers.length > 0) {
        rq_info.parmas_imgShow = true;
    }
}
