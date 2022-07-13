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
    rq_info.headers_imgShow = false;
    rq_info.headers.push({ key: "", value: "", desc: "" });
}

/**
 * 删除请求头参数
 */
function Delete_HeadersParam(paramsItem) {
    rq_info.headers = rq_info.headers.filter((item) => item != paramsItem);
    if (!rq_info.headers.length > 0) {
        rq_info.headers_imgShow = true;
    }
}

function GetBodyValue(proxy){
    if(rq_info.infopage_seclet === 'none'){
        return ""
    }
    return proxy.$refs.urlBody.getValue()
}

/**
 * 发送请求
 */
function sendBtn(proxy){
    if(rq_info.url === "" || rq_info.method === ""){
        ElMessage({
            showClose: true,
            message: "请求路径或者请求方式为空",
            type: "error",
        });
        return
    }
    request(JSON.stringify({
        "url": rq_info.url,
        "method": rq_info.method,
        "body": GetBodyValue(proxy),
        "header": res_info.headers
    })).then((res)=>{
            res_info.isShow=true
            console.log(res)
            if(res.data.code === 110){
                proxy.$refs.res_Editor.setHtmlVal(JSON.stringify(res.data.data.msg))
                return
            }
            SetResHeader(res.data.data)
            if(typeof res.data.data.response === "object"){
                proxy.$refs.res_Editor.setJSONVal(JSON.stringify(res.data.data.response))
                return;
            }
            if(typeof res.data.data.response === "string"){
                proxy.$refs.res_Editor.setHtmlVal(res.data.data.response)
            }

        })
        .catch(err=>{
            ElMessage({
                showClose: true,
                message: err,
                type: "error",
                duration:10000,
            })
            console.log(err)
        })
}

/**
 * 设置响应参数（响应头。cookie）
 */
function SetResHeader(res){
    res_info.code = res.status_code;
    res_info.time = res.elapsed;
    const cookiesMap = new Map(Object.entries(res.cookies))
    const headerMap = new Map(Object.entries(res.response_header))
    headerMap.forEach((V,K)=>{
        res_info.headers.push(
            {key:K, value:V}
        )
    })
    cookiesMap.forEach((V,K)=> {
        res_info.Cookis.push(
            {key: K, value: V}
        )
    })
}

export {Get_InputParams, Delet_Param, Add_Param, Add_HeadersParam ,Delete_HeadersParam, Set_Url, sendBtn}
