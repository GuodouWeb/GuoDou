<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      width="200 px"
      router="ture"
  >
    <div class="div-el-menu-title">
      <el-button type="primary" plain @click="btn">{{ arrow }}</el-button>
    </div>
    <div class="div-el-menu-title">
      <p >GuoDou</p>
    </div>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <div class="div-el-menu">
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="postman">
        <el-icon><setting /></el-icon>
        <template #title>PostMan</template>
      </el-menu-item>
    </div>
  </el-menu>

</template>

<script>
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting} from '@element-plus/icons-vue'
// eslint-disable-next-line no-undef
const isCollapse = ref(false)
const arrow = ref("<<<")
export default {
  name: "NavigationBar",
  components:{
    Document,
  },
  props:{
    fatherMethod:{
      type: Function,
      default: null
    },
  },
  data(){
    return{
      isCollapse,
      IconMenu,
      Location,
      Setting,
      arrow,
    }
  },
  methods:{
    btn(){
      this.isCollapse = this.fatherMethod(this.isCollapse)
      this.arrow = this.isCollapse?">>>":"<<<"
    }
  },
}
</script>

<style scoped>

:deep(.el-menu) {
  border-right: solid 1px var(--el-menu-border-color);
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: var(--el-menu-bg-color);
  box-sizing: border-box;
  width: 200px;
}
.div-el-menu-title{
  height: 50px;
  background-color: #001529;
  color: #f0f0f0;
  display: grid;
  grid-template-columns: 70% 30%;
  position: relative;
  align-items: center;
  border: 3px #f0f0f0;
}
.div-el-menu-title .el-button{
  width: 20px;
  height: 20px;
  margin: 30px;
}
>>> .el-sub-menu__title{
  background-color: #001529;
  color: #f0f0f0;
}
>>> .el-sub-menu__title:hover{
  background-color: #26619e;
  color: #409eff;
}
>>> .el-menu-item-group__title{
  background-color: #001529;
  color: #f0f0f0;
}
>>> .el-menu-item-group__title:hover{
  background-color: #26619e;
  color: #409eff;
}
>>> .el-menu-item{
  background-color: #001529;
  color: #f0f0f0;
}
>>> .el-menu-item:hover{
  background-color: #26619e;
  color: #409eff;
}
.div-el-menu{
  width: 100%;
  min-height: 800px;
  background-color: #001529;
}
</style>
