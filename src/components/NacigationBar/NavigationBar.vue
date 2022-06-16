<template>
  <div class="div-el-menus">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      width="200 px"
      :router="true"
    >
      <div class="div-el-menu-title" >
        <p>GuoDou</p>
      </div>

      <el-sub-menu index="1">
        <template #title>
          <ElIcon>
            <el-icon><Document /></el-icon>
          </ElIcon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One </span></template>
          <el-menu-item index="1-1">item one </el-menu-item>
          <el-menu-item index="1-2">item two </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three </el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four </span></template>
          <el-menu-item index="1-4-1">item one </el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <div class="div-el-menu">
        <el-menu-item index="2">
          <ElIcon>
          <el-icon><Document /></el-icon>
          </ElIcon>
          <template #title>Navigator Two </template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <ElIcon>
          <el-icon><document /></el-icon>
          </ElIcon>
          <template #title>Navigator Three </template>
        </el-menu-item>
        <el-menu-item index="/project/postman">
          <ElIcon>
            <el-icon><Document /></el-icon>
          </ElIcon>
          <template #title>PostMan </template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  Document,
} from "@element-plus/icons-vue";
// eslint-disable-next-line no-undef
export default {
  name: "NavigationBar",
  props: {
    isCollapse:{
      type: Boolean,
      default: false,
    },
  },
  components: {
    Document,
  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style scoped>
:deep(.el-menu) {
  background-color: #001529;
  border-right: none;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  box-sizing: border-box;
  display: block;
}
.div-el-menu-title {
  height: 50px;
  background-color: #001529;
  color: #f0f0f0;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  border: 3px #f0f0f0;
}
.div-el-menu-title p{
  margin-top: 20px;
}

:deep(.el-sub-menu__title) {
  background-color: #001529;
  color: #f0f0f0;
}
:deep(.el-sub-menu__title):hover {
  background-color: #26619e;
  color: #409eff;
}
:deep(.el-menu-item-group__title) {
  background-color: #001529;
  color: #f0f0f0;
}
:deep(.el-menu-item-group__title):hover {
  background-color: #26619e;
  color: #409eff;
}
:deep(.el-menu-item) {
  background-color: #001529;
  color: #f0f0f0;
}
:deep(.el-menu-item):hover {
  background-color: #26619e;
  color: #409eff;
}
</style>
