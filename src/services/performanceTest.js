import { CONFIG } from "@/consts/config.js";
import axios from "axios";

function get_Devices() {
  return axios({
    method: "GET",
    url: `${CONFIG.URL}/api/devices/get_devices`,
  });
}

function get_Pkgname(deviceID) {
  return axios({
    method: "GET",
    url: `${CONFIG.URL}/api/devices/get_Pkgname`,
    params: deviceID,
  });
}

export { get_Devices, get_Pkgname };
