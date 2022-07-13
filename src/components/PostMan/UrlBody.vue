<template>
  <div class="body-select-show">
    <el-radio-group v-model="bodySelectShow" size="small">
      <el-radio-button label='none' />
      <el-radio-button label='raw' />
    </el-radio-group>
  </div>
  <div class="body-img" v-show="bodySelectShow ==='none'">
    <img class="params-img" :src="imgPath.params_background" />
  </div>
  <div class="monacoEditor" v-show="bodySelectShow ==='raw'">
    <MonacoEditor ref="monaco" :opts="opts" :height="200"/>
  </div>

</template>
<script>
import MonacoEditor from "@/components/Editor/monaco";
import {opts} from "@/components/PostMan/MonacoEditorConfig";
import {ref} from "vue";
const bodySelectShow = ref('none')
const imgPath = {
  params_background: require("@/static/img/postman/订阅.svg"),
};
// 手动获取值
function getValue(){
  return this.$refs.monaco.getVal();
}

export default {
  name: "UrlBody",
  components: {
    MonacoEditor,
  },
  data(){
    return {
      opts,
      bodySelectShow,
      imgPath
    }
  },
  methods:{
    getValue,
  },
}


</script>
<style scoped>
.body-select-show{
  display: block;
  text-align: left;
}

.monacoEditor{
  max-width: 1200px;
  margin-top: 10px;
  margin-right: 50px;
  border:1px solid #bbb7b7
}

.body-img {
  width: 80%;
  margin: 10px;
  text-align: center;
}
.body-img img {
  width: 150px;
  height: 150px;
}

</style>
