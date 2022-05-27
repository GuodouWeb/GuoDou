<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <NavigationBar :fatherMethod="SetElementAttr"/>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <div class="div-el-main" :style="{width: el_mianWidth +'px'}">
            <button @click="routerPuth">点我</button>
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavigationBar from "@/components/login/NavigationBar"
const {ref} = require("vue");

const el_mianWidth = ref(1500)
export default {
  name: "WorkbenchView",
  components:{
    NavigationBar,
  },
  data(){
    return{
      el_mianWidth
    }
  },
  methods:{
    SetElementAttr(value) {
      if (value) {
        this.el_mianWidth = 1500
        return !value
      }
      this.el_mianWidth = 1700
      return !value
    },
    routerPuth(){
      this.$router.push("about")
    }
  }
}
</script>

<style scoped>
.common-layout{
  max-height: 600px;
}
>>>.el-main{
  display: flex;
  justify-content: center;
  align-items: center;
}
.common-layout >>> .el-container{
  height: 100%;
}

.div-el-main{
  transition: all 0.5s;
  align-items: center;
  justify-content: center
}

.common-layout >>> .el-aside{
  width: 100%;
}

</style>
