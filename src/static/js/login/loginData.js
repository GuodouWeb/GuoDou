import {reactive, computed, } from "vue";

const account = reactive({
  username: "",
  password: ""
});
let accountUserName = computed({
  get(){
    return account.username
  },
  set(newValue){
    account.username= newValue
  }
})
const register = reactive({
  name:"",
  username: "",
  password: "",
  againPassword: ""
});
const defaultImg = {
  log: require("@/static/img/login/log.svg"),
  register: require("@/static/img/login/register.svg"),
  QQ: require("@/static/img/login/QQ.svg"),
  wechat: require("@/static/img/login/wechat.svg"),
  github: require("@/static/img/login/github.svg"),
  user: require("@/static/img/login/用户认证.svg"),
  security: require("@/static/img/login/安全认证.svg"),
};

export {defaultImg, register, accountUserName, account}
