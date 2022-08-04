import { ElMessage } from "element-plus";
import {
  get_Devices,
  get_Pkgname,
  get_PerformanceTestingRouting,
} from "@/services/performanceTest";
import { reactive } from "vue";

const performance_tabs = reactive({
  tab: "",
  CPU: "CPU",
  FPS: "FPS",
  men: "men",
  flow: "flow",
});
const deviceInfo = reactive({
  deviceList: [],
  pkgnameList: [],
  performanceInfo: {
    CPU: {
      historicalData: [], //历史数据
      urrentData: 0, //当前数据
      highestData: 0, //最高数据
      avgData: 0, //平均数据
    },
    FPS: {
      historicalData: [],
      urrentData: 0,
      highestData: 0,
      avgData: 0,
    },
    MEM: {
      historicalData: [],
      urrentData: 0,
      highestData: 0,
      avgData: 0,
    },
    FLOW: {
      historicalData: [],
      urrentData: 0,
      highestData: 0,
      avgData: 0,
    },
    Battery: {
      historicalData: [],
      urrentData: 0,
      highestData: 0,
      avgData: 0,
    },
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
function Get_PkgnameList(event, deviceName) {
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

/**
 * GuoDouWS
 */
class GuoDouWebsocket {
  /**
   *
   * @param {String} routing WS 路由地址
   */
  constructor(routing) {
    //无需加function
    this.routing = routing;
    this.chatSocket = null;
  }

  /**
   *
   * @param {Object} message 可选参数，连接成功时触发回调输出消息
   */
  Websocket_Connect(message = null) {
    this.chatSocket = new WebSocket(this.routing);
    if (typeof msg === Object) {
      this.chatSocket.onopen = (data) => {
        var msg = message;
        msg.value = JSON.parse(data);
      };
    }
  }

  /**
   *
   * @param {Object} message 可选参数，获得消息时触发回调输出消息
   */
  Websocket_Send(conten, message = null) {
    var msg = message;
    this.chatSocket.send(
      JSON.stringify({
        conten,
      })
    );
    if (typeof msg === Object) {
      this.chatSocket.onmessage = (data) => {
        msg.value = JSON.parse(data);
      };
    }
  }

  /**
   *
   * @param {Object} message 可选参数，关闭连接时触发回调输出消息
   */
  Websocket_Close(message = null) {
    if (typeof msg === Object) {
      this.chatSocket.onclose = (data) => {
        var msg = message;
        msg.value = JSON.parse(data);
      };
    }
    this.chatSocket.close();
  }
}

class Performance extends GuoDouWebsocket {
  /**
   *
   * @param {String} routing 路由地址
   */
  constructor(routing) {
    super(routing);
  }

  /**
   *
   * @param conten 发送的消息内容
   */
  Websocket_Send(message) {
    this.chatSocket.send(
      JSON.stringify({
        message,
      })
    );
    this.chatSocket.onmessage = (msg) => {
      var data = JSON.parse(msg.data);
      if (!data.message.ruslt && !data.message.taskName) return;
      var performance = deviceInfo.performanceInfo;
      switch (data.message.taskName) {
        case "cpu":
          this.DataOperation(performance.CPU, data.message.ruslt);
          break;
        case "fps":
          this.DataOperation(performance.FPS, data.message.ruslt[0]);
          break;
        case "flow":
          this.DataOperation(performance.FLOW, data.message.ruslt.downFlow);
          break;
        case "mem":
          this.DataOperation(performance.MEM, data.message.ruslt);
          break;
        case "battery":
          this.DataOperation(performance.Battery, data.message.ruslt);
          break;
      }
    };
  }

  /**
   * 数据操作与计算
   * @param {Objcet} data
   * @param {String} msg 消息
   */
  DataOperation(data, msg) {
    const mesage = parseFloat(msg);
    const performancedata = data;
    performancedata.historicalData.push(mesage);
    performancedata.urrentData = msg;
    if (mesage > data.highestData) performancedata.highestData = mesage;
  }
}

export {
  Get_DeviceList,
  Get_PkgnameList,
  performance_tabs,
  deviceInfo,
  Performance,
};
