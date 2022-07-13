import { reactive } from "vue";
import {rq_info} from "@/static/js/PostMan";

/**
 * 增加参数
 */
export function Add_Param() {
    rq_info.data.push({ key: "", value: "", desc: "" });
}
/**
 * 删除参数
 */
export function Delete_Param(psramsItem) {
    rq_info.data = rq_info.data.filter((item) => item !== psramsItem);
}
