import { ElMessage } from "element-plus";
import { get_Devices, get_Pkgname } from "@/services/performanceTest";
import { reactive } from "vue";

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
 * @param deviceID 设备id
 */
function Get_PkgnameList(deviceID) {
  get_Pkgname(deviceID)
    .then((res) => {
      if (res.data.code === 200) {
        console.log("res.data.msg", res.data.msg);
      }
    })
    .catch((e) => {
      console.log("e", e);
    });
}
// const messages = ref("");
// let chatSocket;
// chatSocket.onopen = function (e) {
//   console.log("连接成功");
// };
// chatSocket.onmessage = function (e) {
//   messages.value = JSON.parse(e.data);
//   console.log("messages.value", messages.value);
// };
// function connect() {
//   chatSocket = new WebSocket(
//     "ws://127.0.0.1:8090/ws/api/performance_testing/mobile/boot/"
//   );
// }
// function sendBtn() {
//   chatSocket.send(
//     JSON.stringify({
//       message: {
//         device: "3c2691fe",
//         pkgname: "com.qiyi.video",
//       },
//     })
//   );
// }
// function closeBtn() {
//   chatSocket.send(
//     JSON.stringify({
//       message: {
//         device: "3c2691fe",
//         pkgname: "com.qiyi.video",
//         stop: "stop",
//       },
//     })
//   );
// }
export { Get_DeviceList, Get_PkgnameList };
