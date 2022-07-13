<template>
  <div class="common-layout">
    <el-container>
      <el-aside
        :style="'--el-aside-width:' + value + 'px'"
        @mouseover="MouseOver"
        @mouseout="MouseOut"
      >
        <NavigationBar class="navigationBar" :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header height="60px" style="--el-header-padding: 0 0 0 3px">
          <div class="expand-button" style="z-index: 1">
            <el-button
              type="primary"
              plain
              @click="btn"
              @mouseover="MouseOver"
              @mouseout="MouseOut"
              >{{ arrow }}</el-button
            >
          </div>
          <div class="header">
            <el-dropdown @command="PageSwitching">
              <div>
                <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                  style="box-shadow: 0 0 3px #000000"
                  fit="fit"
                  :size="30"
                />
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="account_settings"
                    >个人中心</el-dropdown-item
                  >
                  <el-dropdown-item command="account_settings"
                    >账号设置</el-dropdown-item
                  >
                  <el-dropdown-item command="login">注销</el-dropdown-item>
                </el-dropdown-menu>
              </template>
              <p>柠檬果</p>
            </el-dropdown>
          </div>
        </el-header>
        <el-main style="--el-main-padding: 15px 15px 10px 15px">
          <div class="div-el-main">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import NavigationBar from "@/components/NacigationBar/NavigationBar";
import { ref } from "vue";
import { useRouter } from "vue-router";
const isCollapse = ref(false);
const arrow = ref("<<");
const value = ref(200);
const router = useRouter();
function btn() {
  isCollapse.value = !isCollapse.value;
  value.value = isCollapse.value ? 63 : 200;
  arrow.value = isCollapse.value ? ">>" : "<<";
}
function MouseOver() {
  const expandButton = document.getElementsByClassName("expand-button")[0];
  expandButton.style.visibility = "visible";
}
function MouseOut() {
  const expandButton = document.getElementsByClassName("expand-button")[0];
  expandButton.style.visibility = "hidden";
}
/**
 * 页面切换
 * @param route_name 路由名字
 * @constructor
 */
function PageSwitching(route_name) {
  if (route_name === "login") {
    localStorage.setItem("userInfo", null);
  }
  router.push({ name: route_name });
}
</script>

<style scoped>
.common-layout {
  min-height: 800px;
  height: 100%;
  display: flex;
}
:deep(.el-aside) {
  height: 100%;
  min-height: 900px;
  background-color: #001529;
  transition: all 0.3s;
  display: flex;
}
:deep(.el-aside):hover .navigationBar .div-el-menu-title div {
  display: inline;
}
.common-layout :deep(.el-container) {
  height: 100%;
  background-color: rgb(224, 229, 234);
}
.div-el-main {
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.el-header) {
  display: flex;
  align-content: center;
  justify-content: left;
}
:deep(.el-header) .expand-button {
  display: inline-block;
  margin-left: -20px;
  margin-right: -15px;
  visibility: hidden;
}
:deep(.el-header) .expand-button button {
  width: 1px;
  border-radius: 50px;
}
.header {
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 3px #666;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
}
.header :deep(.el-dropdown) {
  margin-right: 30px;
}
.header :deep(.el-dropdown) p {
  font-size: 5px;
  font-family: "Microsoft YaHei", serif;
  font-weight: bold;
  margin-top: 2px;
}
</style>
