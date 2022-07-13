import { ElMessage } from "element-plus";
import { get_Devices, get_Pkgname } from "@/services/performanceTest";
import { reactive } from "vue";

const performance_tabs = reactive({
  tab: "",
  CPU: "CPU",
  FPS: "FPS",
  ram: "ram",
  flow: "flow",
});
const deviceInfo = reactive({
  deviceList: [],
  pkgnameList: [],
  performanceInfo: {
    CPU: [],
    FPS: [],
    ram: [],
    flow: [],
  },
});

/**
 * 获取设备列表
 */
function Get_DeviceList() {
  get_Devices()
    .then((res) => {
      if (res.data.code === 200) {
        if (res.data.msg.length === 0) {
          ElMessage({
            showClose: true,
            message: "获取设备失败，请尝试重新连接adb",
            type: "warning",
          });
        }
        deviceInfo.deviceList = res.data.data.map((item) => item);
      }
    })
    .catch((e) => {
      ElMessage({
        showClose: true,
        message: `出现异常: ${e}`,
        type: "erro",
      });
    });
}

/**
 *
 * @param deviceName 设备id
 */
function Get_PkgnameList($event, deviceName) {
  get_Pkgname({ deviceID: deviceName })
    .then((res) => {
      if (res.data.code === 200) {
        if (res.data.msg.length === 0) {
          ElMessage({
            showClose: true,
            message: "获取应用列表失败，请尝试重新连接adb",
            type: "warning",
          });
        }
        deviceInfo.pkgnameList = res.data.data.map((item) => item);
      }
    })
    .catch((e) => {
      console.log("e", e);
    });
}

export { Get_DeviceList, Get_PkgnameList, performance_tabs, deviceInfo };
