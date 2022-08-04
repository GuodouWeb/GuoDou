import { CONFIG } from "@/consts/config.js";
import axios from "axios";

export function request(params) {
  return axios({
    method: "POST",
    url: `${CONFIG.URL}/api/request`,
    data: params,
  });
}
