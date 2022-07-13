<template>
  <div class="main">
    <h1 style="margin: 30px 0 0 20px; text-align: left">个人中心</h1>
    <div id="form">
      <el-form :model="userInfo">
        <el-form-item label="头像">
          <el-input v-model="userInfo.img" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userInfo.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <div style="display: flex; flex-direction: row">
            <el-input v-model="userInfo.email.header" />
            <el-select
              v-model="userInfo.email.tail"
              placeholder="please select your zone"
            >
              <el-option label="@qq.com" value="@qq.com" />
              <el-option label="@163.com" value="@163.com" />
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="Instant delivery">
          <el-switch v-model="userInfo.delivery" />
        </el-form-item>
        <el-form-item label="Activity type">
          <el-checkbox-group v-model="userInfo.type">
            <el-checkbox label="Online activities" name="type" />
            <el-checkbox label="Promotion activities" name="type" />
            <el-checkbox label="Offline activities" name="type" />
            <el-checkbox label="Simple brand exposure" name="type" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Resources">
          <el-radio-group v-model="userInfo.resource">
            <el-radio label="Sponsor" />
            <el-radio label="Venue" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input v-model="userInfo.desc" type="textarea" />
        </el-form-item>
        <el-form-item style="justify-content: center">
          <el-button type="primary" @click="onSubmit">Create</el-button>
          <el-button>Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const email_last = ref("");
const userInfo = reactive({
  img: "",
  name: "",
  email: {
    header: "",
    tail: "",
  },
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
function onSubmit() {
  console.log("submit!");
}
</script>

<style scoped>
.main {
  background-color: #ffffff;
  box-shadow: 0 0 3px #666;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}
#form {
  max-width: 700px;
  min-height: 700px;
  display: flex;
}
#form :deep(.el-form) {
  align-items: stretch;
  text-align: left;
  margin-top: -200px;
}
:deep(.el-form-item__label) {
  width: 80px;
  display: flex;
  justify-content: flex-start;
}
:deep(.el-select) {
  width: 100%;
}
</style>
