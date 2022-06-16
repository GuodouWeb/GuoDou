<template>
  <div class="postman-main">
    <div class="postman-title">
      <p>在线HTTP测试工具</p>
    </div>
    <div class="route-search-box">
      <div class="method">
        <el-select v-model="rq_method" placeholder="Select">
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
      <el-button type="primary" @click="postman">
        Send<el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </div>
    <div class="rq-content">
      <div class="rq-infopage-seclet">
        <el-radio-group size="large" v-model="rq_info.infopage_seclet">
          <el-radio-button label="params" />
          <el-radio-button label="Headers" />
          <el-radio-button label="Body" />
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
    <div class="rq-response" v-show="res_info.isShow">
      <div class="res-infopage-seclet">
        <el-radio-group size="large" v-model="res_info.infopage_seclet">
          <el-radio-button label="Body" />
          <el-radio-button label="Cookis" />
          <el-radio-button label="Headers" />
        </el-radio-group>
        <div class="res-CodeAndTime">status: {{res_info.code}}   time: {{res_info.time}}</div>
      </div>
      <div class="res-MonacoEditor" v-show="res_info.infopage_seclet === res_SetInpage.Body">
        <MonacoEditor ref="res_Editor" :opts="opts" :height="300"/>
      </div>
      <div v-show="res_info.infopage_seclet === res_SetInpage.Headers">
        <UrlHeaders/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { Upload } from "@element-plus/icons-vue";
import {
  rq_info,
  res_info,
  Get_InputParams,
  Set_res_info
} from "@/static/js/PostMan/PostManView/PostManData";
import UrlParmas from "@/components/PostMan/UrlParmas.vue";
import UrlHeaders from "@/components/PostMan/UrlHeaders.vue";
import UrlBody from "@/components/PostMan/UrlBody.vue";
import MonacoEditor from "@/components/Editor/monaco";
import {opts} from "@/components/PostMan/MonacoEditorConfig";
import axios from "axios";
import {getCurrentInstance} from "vue";
import {ElMessage} from "element-plus";

const rq_method = ref("GET");
const rq_method_value = [
  {
    value: "GET ",
    label: "GET",
  },
  {
    value: "POST ",
    label: "POST",
  },
  {
    value: "PUSH ",
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
const {proxy} = getCurrentInstance()
function postman(){
  rq_info.data = proxy.$refs.urlBody.getValue()
  axios
      .get(rq_info.url, rq_info.data)
      .then((res)=>{
        res_info.isShow=true
        console.log(res)
        Set_res_info(
            res.data.code,
        )
        proxy.$refs.res_Editor.setJSONVal(JSON.stringify(res.data))
      })
      .catch(err=>{
        ElMessage({
          showClose: true,
          message: err,
          type: "error",
          duration:10000,
        })
      })
}

</script>



<style scoped>
.postman-main {
  background-color: #fff;
  width: 100%;
  min-width: 500px;
  min-height: 520px;
  display: block;
  align-content: center;
  justify-content: center;
  box-shadow: 0 0 20px #666;
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
  padding: 0 0 0 30px;
  font-family: "Microsoft YaHei",serif;
  font-weight: bold;
}
.route-search-box {
  padding: 0 30px 0;
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
  margin: 0 30px 0 0;
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
  margin-left: 30px;
}
.rq-param {
  justify-content: left;
  margin-left: 30px;
}
.rq-response{
  margin-top: 10px;
  margin-bottom: 30px;
  display: block;
}
.rq-response .res-MonacoEditor{
  margin-left: 30px;
  margin-top: 10px;
  margin-right: 50px;
  border:1px solid #bbb7b7
}
.res-infopage-seclet{
  display: flex;
  margin-left: 30px;
  margin-right: 50px;
  justify-content: left;
  position: relative
}
.res-infopage-seclet .res-CodeAndTime{
  position: absolute;
  bottom: 0;
  right: 0;
}
.res-infopage-seclet :deep(.el-radio-group){
  margin: 0;
  padding: 0;
}
.rq-response .res-CodeAndTime{
  text-align: right;
  justify-items: center;
}
</style>
