import { reactive } from "vue";

export const UrlFrom_info = reactive({
    params: [],
    imgShow: true,
    imgPath: ""
});

export function Set_RQInfo(params=[], imgShow=false, imgPath=""){
    UrlFrom_info.params=params
    UrlFrom_info.imgShow=imgShow
    UrlFrom_info.imgPath=imgPath
}

export function Get_RQinfo(){
    return UrlFrom_info
}

/**
 * 增加参数
 */
export function Add_Param() {
    UrlFrom_info.parmas_imgShow = false;
    UrlFrom_info.params.push({ key: "", value: "", desc: "" });
}

/**
 * 删除参数
 */
export function Delete_Param(psramsItem) {
    UrlFrom_info.params = UrlFrom_info.params.filter((item) => item != psramsItem);
    if (!UrlFrom_info.params.length > 0) {
        UrlFrom_info.parmas_imgShow = true;
    }
}
