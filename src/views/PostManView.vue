<template>
  <div class="postman-main">
    <div class="postman-title">
      <p>在线HTTP测试工具</p>
    </div>
    <div class="route-search-box">
      <div class="method">
        <el-select v-model="rq_info.method" placeholder="请求方式">
          <el-option
            v-for="item in rq_method_value"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="div-el-input">
        <el-input
          v-model="rq_info.url"
          placeholder="URL"
          type="text"
          clearable
          @input="Get_InputParams"
        ></el-input>
      </div>
      <el-button type="primary" @click="sendBtn(proxy)">
        Send<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </div>
    <div class="rq-content">
      <div class="rq-infopage-seclet">
        <el-radio-group size="large" v-model="rq_info.infopage_seclet">
          <el-radio label="params">params</el-radio>
          <el-radio label="Headers">Headers</el-radio>
          <el-radio label="Body">Body</el-radio>
        </el-radio-group>
      </div>
      <div class="rq-param">
        <div v-show="rq_info.infopage_seclet === rq_SetInpage.params">
          <UrlParmas />
        </div>
        <div v-show="rq_info.infopage_seclet === rq_SetInpage.Headers">
          <UrlHeaders />
        </div>
        <div v-show="rq_info.infopage_seclet === rq_SetInpage.Body">
          <UrlBody ref="urlBody" />
        </div>
      </div>
    </div>
    <div class="rq-response">
      <div class="res-infopage-seclet">
        <el-radio-group v-model="res_info.infopage_seclet">
          <el-radio label="Body">Body</el-radio>
          <el-radio label="Cookis">Cookis</el-radio>
          <el-radio label="Headers">Headers</el-radio>
        </el-radio-group>
        <div class="res-CodeAndTime">
          status: {{ res_info.code }} time: {{ res_info.time }}
        </div>
      </div>
      <div
        class="res-MonacoEditor"
        v-show="res_info.infopage_seclet === res_SetInpage.Body"
      >
        <MonacoEditor ref="res_Editor" :opts="postMan_ResOpts" :height="300" />
      </div>
      <div
        class="res-cookis"
        v-show="res_info.infopage_seclet === res_SetInpage.Cookis"
      >
        <el-table :data="res_info.Cookis" height="300">
          <el-table-column prop="key" label="Key" width="300" />
          <el-table-column prop="value" label="Value" width="500" />
        </el-table>
      </div>
      <div
        class="res-headers"
        v-show="res_info.infopage_seclet === res_SetInpage.Headers"
      >
        <el-table :data="res_info.headers" height="300">
          <el-table-column prop="key" label="Key" width="300" />
          <el-table-column prop="value" label="Value" width="500" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Upload } from "@element-plus/icons-vue";
import {
  Get_InputParams,
  rq_info,
  res_info,
  sendBtn,
} from "@/static/js/PostMan";
import {
  UrlParmas,
  UrlHeaders,
  UrlBody,
  postMan_ResOpts,
} from "@/components/PostMan";
import MonacoEditor from "@/components/Editor/monaco";
import { getCurrentInstance } from "vue";

const rq_method_value = [
  {
    value: "GET",
    label: "GET",
  },
  {
    value: "POST",
    label: "POST",
  },
  {
    value: "PUSH",
    label: "PUSH",
  },
];
const rq_SetInpage = {
  params: "params",
  Headers: "Headers",
  Body: "Body",
};
const res_SetInpage = {
  Cookis: "Cookis",
  Headers: "Headers",
  Body: "Body",
};
const { proxy } = getCurrentInstance();
</script>

<style scoped>
.postman-main {
  background-color: #fff;
  width: 100%;
  min-width: 500px;
  min-height: 800px;
  display: block;
  align-content: center;
  justify-content: center;
  box-shadow: 0 0 3px #666;
  border-radius: 5px;
}
.postman-title {
  height: 60px;
  display: flex;
  align-items: center;
  text-align: left;
  border: solid rgb(218 214 214);
  border-width: 0 0 1px 0;
}
.postman-title p {
  padding: 0 0 0 80px;
  font-family: "Microsoft YaHei", serif;
  font-weight: bold;
}
.route-search-box {
  padding: 0 80px 0;
  justify-content: left;
  display: flex;
  height: 50px;
}
.route-search-box .method {
  width: 80px;
  margin-right: 20px;
}
.route-search-box :deep(.el-input__wrapper) {
  min-width: 100px;
  height: 30px;
  margin-top: 20px;
}
.route-search-box .div-el-input {
  justify-content: center;
  margin: 0 80px 0 0;
  width: 70%;
}
.route-search-box :deep(.el-button) {
  margin-top: 20px;
  height: 30px;
}
.rq-content {
  margin-top: 10px;
}
.rq-infopage-seclet {
  display: flex;
  justify-content: left;
  margin-left: 80px;
}
.rq-param {
  justify-content: left;
  margin-left: 80px;
  margin-bottom: 20px;
}
.rq-response {
  margin-top: 10px;
  margin-bottom: 30px;
  display: block;
}
.rq-response .res-MonacoEditor {
  max-width: 1200px;
  margin-left: 80px;
  margin-top: 10px;
  margin-right: 50px;
  border: 1px solid #bbb7b7;
}
.rq-response .res-cookis {
  max-width: 1200px;
  margin-left: 80px;
  margin-top: 10px;
  margin-right: 50px;
}
.rq-response .res-cookis :deep(.el-table__body-wrapper) {
  max-width: 820px;
  text-align: left;
  padding-left: 50px;
}
.rq-response .res-cookis :deep(.el-table__header-wrapper) {
  padding-left: 50px;
  border-top: 1px solid #bbb7b7;
}
.rq-response .res-headers {
  max-width: 1200px;
  margin-left: 80px;
  margin-top: 10px;
  margin-right: 50px;
}
.rq-response .res-headers :deep(.el-table__body-wrapper) {
  max-width: 820px;
  text-align: left;
  padding-left: 50px;
}
.rq-response .res-headers :deep(.el-table__header-wrapper) {
  border-top: 1px solid #bbb7b7;
  padding-left: 50px;
}
.res-infopage-seclet {
  display: flex;
  max-width: 1200px;
  margin-left: 80px;
  margin-right: 50px;
  justify-content: left;
  align-content: center;
  position: relative;
}
.res-infopage-seclet .res-CodeAndTime {
  position: absolute;
  bottom: 5px;
  right: 0px;
}
.res-infopage-seclet :deep(.el-radio-group) {
  margin: 0;
  padding: 0;
}
.rq-response .res-CodeAndTime {
  text-align: right;
  justify-items: center;
  font-size: 12px;
  color: #42b983;
}
</style>
