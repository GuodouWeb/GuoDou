import {CONFIG} from "@/consts/config.js"
import axios from "axios";

export function user(parmas) {
    return axios({
        method:"POST",
        url:`${CONFIG.URL}/api/user/login`,
        data:parmas
    })
}

export function register(parmas) {
    return axios({
        method:"POST",
        url:`${CONFIG.URL}/api/user/register`,
        data:parmas
    })
}

