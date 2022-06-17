<template>
  <div class="monacoEditor" v-show="true">
    <MonacoEditor ref="monaco" :opts="opts" :height="200"/>
  </div>

</template>
<script >

import MonacoEditor from "@/components/Editor/monaco";
import {opts} from "@/components/PostMan/MonacoEditorConfig";

export default {
  name: "UrlBody",
  components:{
    MonacoEditor,
  },
  data(){
    return {
      opts,
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
  max-width: 1200px;
  margin-top: 10px;
  margin-right: 50px;
  border:1px solid #bbb7b7
}
</style>
