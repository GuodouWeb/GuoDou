<template>
  <div class="main">
    <div class="device-performance-main">
      <div class="device-hardware-info">
        <div class="FPS-Flow">
          <PlayCardVue
            :cardName="'FPS'"
            :cardData="deviceInfo.performanceInfo.FPS.urrentData"
            :height="170"
            style="margin-top: 10px; margin-left: -20px"
          />
          <DynamicLightEffectCardVue
            :cardName="'Flow'"
            :cardData="`${deviceInfo.performanceInfo.FLOW.urrentData}K/S`"
            :height="160"
            style="margin-left: 10px"
          />
          <ProductIntroductionCardVue
            :cardDesc="'初始电量: 100'"
            :cardData="deviceInfo.performanceInfo.Battery.urrentData"
            :imgShowWidth="70"
            :height="160"
            style="margin-left: 10px"
          />
        </div>
      </div>
      <div class="performance-details">
        <div class="performance-details-mian" id="performance-info">
          <div class="chart">
            <LineChart
              :ele="linChartProps"
              :option="gracefulCurveOption"
              ref="mem"
            />
          </div>
        </div>
        <div
          style="
            border-left: 1px solid rgb(199 199 199);
            margin-left: 10px;
            height: 80%;
          "
        >
          <div class="device-info" style="width: 100%; height: 80%">
            <el-select
              v-model="deviceId"
              filterable
              placeholder="设备列表"
              @change="Get_PkgnameList($event, deviceId)"
              @click="Get_DeviceList"
            >
              <el-option
                v-for="item in deviceInfo.deviceList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-select v-model="pkgnameName" filterable placeholder="应用列表">
              <el-option
                v-for="item in deviceInfo.pkgnameList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <SendButtonVue
              :height="35"
              :width="100"
              :content="'连接'"
              @click="
                WebScoketStart($event, get_PerformanceTestingRouting(deviceId))
              "
            />
            <SendButtonVue
              :height="35"
              :width="100"
              :content="'开始'"
              @click="WebScoketSend"
            />
          </div>
        </div>
      </div>
      <div class="device-hardware-info1">
        <div class="device-Fps">
          <div class="content">
            <el-progress
              type="dashboard"
              :percentage="deviceInfo.performanceInfo.CPU.urrentDat"
              :color="colors"
              style="box-shadow: none"
              :stroke-width="10"
            />
          </div>
          <div class="bottom">
            <div
              class="bottom-header"
              style="width: 100%; height: 20%; justify-content: left"
            >
              <h1 style="text-align: center; margin: 10px 0 10px 10px">CPU</h1>
            </div>
            <div class="bottom-body" style="width: 100%; height: 80%">
              <h1 style="text-align: center; margin: 10px 0 10px 10px">平均</h1>

              <h1 style="text-align: center; margin: 10px 0 10px 10px">最高</h1>
              <h1 style="text-align: center; margin: 10px 0 10px 10px">最低</h1>
            </div>
          </div>
        </div>
        <div class="device-MEM">
          <div class="content">
            <el-progress
              type="dashboard"
              :percentage="deviceInfo.performanceInfo.MEM.urrentData"
              :color="colors"
              style="box-shadow: none"
              :stroke-width="10"
            />
          </div>
          <div class="bottom">
            <div
              class="bottom-header"
              style="width: 100%; height: 20%; justify-content: left"
            >
              <h1 style="text-align: center; margin: 10px 0 10px 10px">内存</h1>
            </div>
            <div class="bottom-body" style="width: 100%; height: 80%">
              <h1 style="text-align: center; margin: 10px 0 10px 10px">平均</h1>

              <h1 style="text-align: center; margin: 10px 0 10px 10px">最高</h1>
              <h1 style="text-align: center; margin: 10px 0 10px 10px">最低</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-main"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import LineChart from "../components/DataChart/Vue_LineChart.vue";
import { gracefulCurveOption } from "@/static/js/DataChart";
import {
  PlayCardVue,
  DynamicLightEffectCardVue,
  ProductIntroductionCardVue,
} from "@/components/Card";
import { get_PerformanceTestingRouting } from "@/services/performanceTest";
import { SendButtonVue } from "@/components/Button";
import {
  Get_DeviceList,
  Get_PkgnameList,
  deviceInfo,
  Performance,
} from "@/static/js/AppPerformanceTest";
require("echarts/lib/component/legend");
const deviceId = ref("");
const pkgnameName = ref("");
const linChartProps = {
  eleId: "performance-info",
  name: "cpu",
  myChart: Object,
};
const percentage2 = ref(0);
const colors = [
  { color: "#f56c6c", percentage: 80 },
  { color: "#e6a23c", percentage: 70 },
  { color: "#5cb87a", percentage: 50 },
];
let androidPerformance = null;

function WebScoketStart(event, routing) {
  androidPerformance = new Performance(routing);
  androidPerformance.Websocket_Connect();
}

function WebScoketSend() {
  const message = {
    device: deviceId.value,
    pkgname: pkgnameName.value,
  };
}

</script>

<style scoped>
.main {
  width: 100%;
  height: 750px;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-left: 10px;
}
.device-performance-main {
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.device-hardware-info {
  display: flex;
  width: 100%;
  height: 200px;
  justify-content: center;
  /* background: linear-gradient(to top, #fff 50%, #53a0e9 0); */
  align-items: center;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 6px 6px 18px #e6e6e6, -6px -6px 18px #ffffff;
}
.device-hardware-info div {
  width: 33%;
}
.device-hardware-info .FPS-Flow {
  background-color: #fff;
  width: 90%;
  height: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  margin: 10px 0 10px 30px;
  /* background: linear-gradient(to bottom, #fff 50%, #53a0e9 0); */
}

.device-hardware-info1 {
  display: flex;
  width: 100%;
  height: 200px;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: space-between;
}
.device-hardware-info1 div {
  width: 50%;
  height: 85%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.device-hardware-info1 .device-Fps {
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 6px 6px 18px #e6e6e6, -6px -6px 18px #ffffff;
}
.device-hardware-info1 .device-MEM {
  margin-left: 10px;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 6px 6px 18px #e6e6e6, -6px -6px 18px #ffffff;
}

.performance-details {
  width: 100%;
  height: 300px;
  margin-top: 10px;
  display: flex;
  justify-content: left;
  align-content: center;
  align-items: center;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 6px 6px 18px #e6e6e6, -6px -6px 18px #ffffff;
}

.performance-details-mian {
  width: 70%;
  height: 90%;
}

#performance-info {
  width: 65%;
  height: 90%;
  margin-left: 20px;
}
.performance-details .device-info {
}
.device-hardware-info div .content {
  width: 100%;
  height: 50%;
  margin: 0;
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 0;
}
.device-hardware-info div .bottom {
  width: 100%;
  height: 50%;
  /* background-color: #53a0e9; */
  margin: 0;
  border-radius: 0;
  box-shadow: none;
}
.device-hardware-info1 div .content {
  width: 55%;
  height: 100%;
  margin: 0;
  box-shadow: none;
}
.device-hardware-info1 .content :deep(.el-progress) {
  background-color: none;
  margin-top: 40px;
}
.device-hardware-info1 .bottom {
  width: 45%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  box-shadow: none;
}
.device-hardware-info1 .bottom .bottom-body {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.chat-main {
  width: 25%;
  height: 720px;
  background-color: #f43;
  box-shadow: 0 0 3px #666;
  border-radius: 5px;
  margin-left: 20px;
}
</style>
