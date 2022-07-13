<template>
  <div class="title"><p>Query Params</p></div>
  <div class="table-title">
    <div>key</div>
    <div>value</div>
    <div>desc</div>
    <p>操作</p>
  </div>
  <form v-for="item in rq_info.params" :key="item">
    <div class="params">
      <div>
        <el-input
          v-model="item.key"
          @input="Set_Url"
          placeholder="请输入"
          clearable
        ></el-input>
      </div>
      <div>
        <el-input
          v-model="item.value"
          @input="Set_Url"
          placeholder="请输入"
          clearable
        ></el-input>
      </div>
      <div>
        <el-input v-model="item.desc" placeholder="请输入" clearable></el-input>
      </div>
      <el-button type="primary" link @click="Delet_Param(item)">删除</el-button>
    </div>
  </form>
  <div class="params-img-show" v-show="rq_info.parmas_imgShow">
    <img class="params-img" :src="imgPath.params_background" />
  </div>
  <div class="add-parmas">
    <el-button type="primary" plain @click="Add_Param">添加参数</el-button>
  </div>
</template>

<script setup>
import {
  rq_info,
  Delet_Param,
  Add_Param,
  Set_Url
} from "@/static/js/PostMan";

const imgPath = {
  params_background: require("@/static/img/postman/爱.svg"),
};
</script>

<style scoped>
.title {
  height: 20px;
  margin: 10px 0 0 0;
  text-align: left;
}
.title p {
  padding: 0 0 0 20px;
  font-size: 18px;
}
.table-title {
  background-color: #fafafa;
  width: 80%;
  height: 30px;
  margin: 10px 0px 0 20px;
  font-size: 15px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  text-align: left;
  align-items: center;
}
.table-title div {
  padding: 0 0 0 10px;
  border-right: 1px solid #e8e8e8;
}
form {
  width: 80%;
  padding: 0 0;
  margin: 0 0 0 20px;
}
.params-img-show {
  width: 80%;
  margin: 10px;
  text-align: center;
}
.params-img {
  width: 150px;
  height: 150px;
}
form .params {
  width: 100%;
  height: 40px;
  font-size: 15px;
  border-bottom: 1px solid #e8e8e8;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  align-items: center;
}
form .params div {
  width: 98%;
  display: flex;
}
form .params :deep(.el-input__wrapper) {
  height: 30px;
}

.add-parmas {
  width: 80%;
  margin-top: 5px;
  margin-left: 20px;
  justify-content: center;
  display: flex;
}
.add-parmas :deep(.el-button) {
  width: 100%;
}
</style>
