import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import ElementPlus from 'element-plus'
import "element-plus/dist/index.css";
//import "default-passive-events";

createApp(App).use(store).use(store).use(router).mount("#app");
