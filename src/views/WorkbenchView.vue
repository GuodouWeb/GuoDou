<template>
  <div class="common-layout">
    <el-container>
      <el-aside :style="'--el-aside-width:'+value+'px'">
        <NavigationBar class="navigationBar" :isCollapse="isCollapse"/>
      </el-aside>
      <el-container>
        <el-header height="30px">
          <div>
            <el-button type="primary" plain @click="btn">{{ arrow }}</el-button> Header
          </div>
        </el-header>
        <el-main>
            <div class="div-el-main" >
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
import {ref} from "vue";

const isCollapse = ref(false)
const arrow = ref("<<<");
const value = ref(200)
function btn() {
  isCollapse.value = !isCollapse.value;
  value.value=isCollapse.value ? 63 : 200;
  arrow.value = isCollapse.value ? ">>>" : "<<<";
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
  min-height: 851px;
  background-color: #001529;
  transition: all 0.3s;
  display: flex;
}
:deep(.el-aside):hover .navigationBar .div-el-menu-title div{
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

</style>
