import { reactive } from "vue";

export const rq_info = reactive({
    infopage_seclet: "params",
    url: "",
    method: "",
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
