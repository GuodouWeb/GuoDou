import { CONFIG } from "@/consts/config.js";
import axios from "axios";

function get_Devices() {
  return axios({
    method: "GET",
    url: `${CONFIG.URL}/api/devices/get_devices`,
  });
}

function get_Pkgname(device) {
  return axios({
    method: "GET",
    url: `${CONFIG.URL}/api/devices/get_Pkgname`,
    params: device,
  });
}

function get_PerformanceTestingRouting(deviceId) {
  return `ws://192.168.8.109:8090/ws/api/performance_testing/mobile/${deviceId}/`;
}

export { get_Devices, get_Pkgname, get_PerformanceTestingRouting };
