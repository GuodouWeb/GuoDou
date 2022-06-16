<template>
  <div class="monacoEditor" v-show="true">
    <MonacoEditor ref="monaco" :opts="opts" :height="200"/>
  </div>
  <div>
    <urlFrom v-if="false" :rq_info="rq_info"/>
  </div>

</template>
<script>

import MonacoEditor from "@/components/Editor/monaco";
import urlFrom from '@/components/PostMan/UrlFrom'
import {opts} from "@/components/PostMan/MonacoEditorConfig";

const rq_info = {
    params: [{ key: "1", value: "1", desc: "1" },{ key: "1", value: "1", desc: "1" }],
    parma_imgShow: true ,
    imgPath: require("@/static/img/postman/订阅.svg"),
}

export default {
  name: "UrlBody",
  components:{
    MonacoEditor,
    urlFrom,
  },
  data(){
    return {
      opts,
      rq_info
      }
    },
  methods:{
    // 手动获取值
    getValue() {
      return this.$refs.monaco.getVal();
    }
  }
};
</script>
<style scoped>
.monacoEditor{
  margin-top: 10px;
  margin-right: 50px;
  border:1px solid #bbb7b7
}
</style>
