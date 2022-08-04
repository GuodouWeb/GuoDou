<template>
  <div class="performance-main">
    <div class="device-info">
      <div class="device-list" style="margin-top: 15px; width: 200px">
        <p style="margin-right: 10px; text-align: center; width: 50px">设备</p>
        <el-select
          v-model="value"
          filterable
          placeholder="设备列表"
          @change="Get_PkgnameList($event, value)"
        >
          <el-option
            v-for="item in deviceInfo.deviceList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="pkgname-list" style="margin-top: 10px; width: 200px">
        <p style="margin-right: 10px; width: 50px">应用</p>
        <el-select v-model="pkgnameList" filterable placeholder="应用列表">
          <el-option
            v-for="item in deviceInfo.pkgnameList"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div class="adb-btn">
        <el-button
          type="primary"
          @click="Get_DeviceList"
          style="margin-top: 10px; margin-left: 0px"
        >
          刷新设备
        </el-button>
        <el-button type="primary" style="margin-top: 10px">
          启动应用
        </el-button>
      </div>
      <el-button type="primary" style="margin-top: 10px" @click="connect">
        连接
      </el-button>
      <el-button type="primary" style="margin-top: 10px" @click="sendBtn">
        开始
      </el-button>
      <el-button type="primary" style="margin-top: 10px" @click="closeBtn">
        断开连接
      </el-button>
      <!-- <el-button type="primary" @click="closeBtn">停止</el-button>  -->
    </div>
    <div class="performance-info">
      <el-scrollbar max-height="650px">
        <div class="line-Chart">
          <div class="line-chart-main" id="cpu-performance-info">
            <LineChart :ele="linChartProps.cpu" :option="option" ref="cpu" />
          </div>
          <div class="line-chart-main" id="fps-performance-info">
            <LineChart :ele="linChartProps.fps" :option="option" ref="fps" />
          </div>
          <div class="line-chart-main" id="flow-performance-info">
            <LineChart :ele="linChartProps.flow" :option="option" ref="flow" />
          </div>
          <div
            class="line-chart-main"
            id="mem-performance-info"
            style="margin-bottom: 10px"
          >
            <LineChart :ele="linChartProps.mem" :option="option" ref="mem" />
          </div>
        </div>
      </el-scrollbar>

      <div
        v-if="performance_tabs.tab === performance_tabs.CPU"
        style="width: 100%; height: 30px"
      ></div>
    </div>
  </div>
</template>
<script setup>
import LineChart from "../components/DataChart/Vue_LineChart.vue";
import {
  Get_DeviceList,
  Get_PkgnameList,
  performance_tabs,
  deviceInfo,
} from "@/static/js/AppPerformanceTest";
import { option } from "@/static/js/DataChart";
import { getCurrentInstance, onMounted, ref } from "vue";

const linChartProps = {
  cpu: {
    eleId: "cpu-performance-info",
    name: "cpu",
    myChart: Object,
  },
  fps: {
    eleId: "fps-performance-info",
    name: "fps",
    myChart: Object,
  },
  mem: {
    eleId: "mem-performance-info",
    name: "mem",
    myChart: Object,
  },
  flow: {
    eleId: "flow-performance-info",
    name: "flow",
    myChart: Object,
  },
};

const value = ref("");
const pkgnameList = ref("");

const messages = ref("");

let chatSocket = null;

function connect() {
  chatSocket = new WebSocket(
    "ws://192.168.8.109:8090/ws/api/performance_testing/mobile/3c2691fe/"
  );
}
function sendBtn() {
  chatSocket.send(
    JSON.stringify({
      message: {
        device: "3c2691fe",
        pkgname: "com.qiyi.video",
      },
    })
  );
  chatSocket.onmessage = function (e) {
    messages.value = JSON.parse(e.data);
    console.log("messages.value", messages.value);
  };
}
function closeBtn() {
  chatSocket.send(
    JSON.stringify({
      message: {
        device: "3c2691fe",
        pkgname: "com.qiyi.video",
        close: "3c2691fe",
      },
    })
  );
}

onMounted(() => {
  Get_DeviceList();
});
</script>

<style scoped>
.performance-main {
  width: 100%;
  height: 770px;
  background-color: #fff;
  box-shadow: 0 0 3px #666;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
}
.device-info {
  min-width: 300px;
  height: 150px;
  margin: 25px;
  background-color: #fff;
  box-shadow: 0 0 3px #666;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.device-info:hover {
  box-shadow: 0 0 10px #666;
}

.device-info .device-list {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

.device-info .pkgname-list {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
}

.performance-info {
  margin-right: 25px;
  min-width: 500px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.performance-info :deep(.el-scrollbar) {
  width: 670px;
  margin-top: 50px;
}
.performance-info .line-Chart {
  width: 650px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
}
.performance-info .line-Chart div {
  width: 600px;
  height: 250px;
  margin-top: 10px;
  margin-right: 10px;
  background-color: #fff;
  box-shadow: 0 0 3px #666;
  border-radius: 5px;
}
.performance-info .line-Chart div:hover {
  box-shadow: 0 0 10px #666;
}
.performance-info :deep(.el-tabs) :deep(.el-tabs__content) {
  width: 100%;
  height: 10px;
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
