<template>
  <div class="performance-main">
    <div class="device-info">
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
      <el-select v-model="pkgnameList" filterable placeholder="应用列表">
        <el-option
          v-for="item in deviceInfo.pkgnameList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <el-button type="primary" @click="Get_DeviceList">刷新设备列表</el-button>
      <!-- <el-button type="primary" @click="closeBtn">停止</el-button>  -->
    </div>
    <div class="performance-info">
      <LineChart />
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
import { onMounted } from "vue";
import { ref } from "vue";

const value = ref("");
const pkgnameList = ref("");

onMounted(() => {
  Get_DeviceList();
});
</script>

<style scoped>
.performance-main {
  width: 100%;
  height: 700px;
  background-color: #fff;
  box-shadow: 0 0 3px #666;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.device-info {
  min-width: 300px;
  height: 92%;
  margin: 25px;
  background-color: rgb(119, 59, 59);
}
.performance-info {
  margin-right: 25px;
  min-width: 500px;
  width: 100%;
  height: 95%;
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
