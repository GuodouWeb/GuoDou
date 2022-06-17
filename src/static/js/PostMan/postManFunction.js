import {res_info, rq_info} from "@/static/js/PostMan/PostManData";
import {request} from "@/services/http";
import {ElMessage} from "element-plus";

/**
 * 通过url字符串解析请求的参数
 */
function Get_InputParams() {
    rq_info.params = [];
    try {
        if (rq_info.url.indexOf("?") > 0) {
            const params = rq_info.url.split("?");
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
        rq_info.parmas_imgShow = rq_info.params.length <= 0;
    } catch (e) {
        console.log(e);
    }
}

/**
 * 更改参数，并刷新url字符串
 */
function Set_Url() {
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
function Delet_Param(psramsItem) {
    rq_info.params = rq_info.params.filter((item) => item !== psramsItem);
    Set_Url();
    if (!rq_info.params.length > 0) {
        rq_info.url = rq_info.url.split("?")[0];
        rq_info.parmas_imgShow = true;
    }
}

/**
 * 增加参数
 */
function Add_Param() {
    rq_info.parmas_imgShow = false;
    rq_info.params.push({ key: "", value: "", desc: "" });
}

/**
 * 增加请求头参数
 */
function Add_HeadersParam() {
    rq_info.parmas_imgShow = false;
    rq_info.headers.push({ key: "", value: "", desc: "" });
}

/**
 * 删除请求头参数
 */
function Delete_HeadersParam(psramsItem) {
    rq_info.headers = rq_info.headers.filter((item) => item != psramsItem);
    if (!rq_info.headers.length > 0) {
        rq_info.parmas_imgShow = true;
    }
}

/**
 * 发送请求
 */
function sendBtn(proxy){
    request(JSON.stringify({
        "url": rq_info.url,
        "method": rq_info.method,
        "body": proxy.$refs.urlBody.getValue(),
        "header": res_info.headers
    })).then((res)=>{
            res_info.isShow=true
            console.log(res)
            proxy.$refs.res_Editor.setJSONVal(JSON.stringify(res.data))
        })
        .catch(err=>{
            ElMessage({
                showClose: true,
                message: err,
                type: "error",
                duration:10000,
            })
        })
}

export {Get_InputParams, Delet_Param, Add_Param, Add_HeadersParam ,Delete_HeadersParam, Set_Url, sendBtn}
