<template>
  <div class="common-layout">
    <el-container>
        <NavigationBar :fatherMethod="SetElementAttr"/>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <div class="div-el-main" :style="{width: el_mianWidth +'px'}">
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
const el_mianWidth = ref(1400)
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
        this.el_mianWidth = 1400
        return !value
      }
      this.el_mianWidth = 1600
      return !value
    },
    routerPuth(){
      this.$router.push("postman")
    }
  }
}
</script>

<style scoped>
.common-layout{
  max-height: 600px;
}
.aside{
  width: 200px;
}
>>>.el-main{
  min-height: 700px;
  display: flex;
  justify-content: center;
}
.common-layout >>> .el-container{
  height: 100%;
}
.div-el-main{
  transition: all 0.5s;
  align-items: center;
  justify-content: center
}

</style>
