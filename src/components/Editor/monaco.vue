<template>
  <div
      ref="container"
      class="monaco-editor"
      :style="`height: ${height}px`"
      style="text-align: left"
  ></div>
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import "monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution";
import "monaco-editor/esm/vs/basic-languages/python/python.contribution"
import {language as pythonLanguage} from 'monaco-editor/esm/vs/basic-languages/python/python.js';
import "monaco-editor/esm/vs/basic-languages/java/java.contribution";
import {language as javaLanguage} from 'monaco-editor/esm/vs/basic-languages/java/java.js'
import "monaco-editor/esm/vs/basic-languages/csharp/csharp.contribution";
import {language as csharpLanguage} from "monaco-editor/esm/vs/basic-languages/csharp/csharp.js";


const initializeTheLanguagePrompt = (languageId, codeLanguage) => {
  monaco.languages.registerCompletionItemProvider(languageId, {
    provideCompletionItems: function () {
      let suggestions = [];
      codeLanguage.keywords.forEach(item => {
        suggestions.push({
          label: item,                                       //提示名称
          kind: monaco.languages.CompletionItemKind.Keyword, //提示图标
          insertText: item                                   //选中后展示到编辑器的文字
        });
      })
      return {
        // 最后要返回一个数组
        suggestions:suggestions
      };
    },
  });
}

export default {
  name: "MonacoEditor",
  props: {
    opts: {
      type: Object,
      default() {
        return {};
      },
    },
    height: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      // 主要配置
      defaultOpts: {
        value: (() => this.opts.value !== "" ? this.opts.value : ""), // 编辑器的值
        language: "javascript",
        theme: (() => this.opts.theme !== "" ? this.opts.theme : "vs-dark"), // 编辑器主题：vs, hc-black, or vs-dark
        roundedSelection: true, // 右侧不显示编辑器预览框
        autoIndent: true, // 自动缩进
        automaticLayout: true,
        foldingStrategy: "indentation", // 代码可分小段折叠
      },
    };
  },
  watch: {
    opts: {
      handler() {
        this.init();
      },
      deep: true,
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 初始化container的内容，销毁之前生成的编辑器
      this.$refs.container.innerHTML = "";
      this.editorOptions = Object.assign(this.defaultOpts, this.opts);
      // 生成编辑器对象
      this.monacoEditor = monaco.editor.create(
          this.$refs.container,
          this.editorOptions
      );
      switch (this.opts.language){
        case "python":
          initializeTheLanguagePrompt("python", pythonLanguage)
          break
        case "java":
          initializeTheLanguagePrompt("java", javaLanguage)
          break
        case "csharp":
          initializeTheLanguagePrompt("csharp", csharpLanguage)
          break
      }
      // 编辑器内容发生改变时触发
      this.monacoEditor.onDidChangeModelContent(() => {
        this.$emit("change", this.monacoEditor.getValue());
      });
    },
    // 供父组件调用手动获取值
    getVal() {
      return this.monacoEditor.getValue();
    },
    setJSONVal(value){
      this.monacoEditor.trigger('anyString', 'editor.action.formatDocument')
      this.monacoEditor.setValue(value)
    }
  },
};
</script>
