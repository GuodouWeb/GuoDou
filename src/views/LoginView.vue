<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#"  class="sign-in-form">
          <h2 class="title">登录</h2>
          <div class="el-input-field">
            <img :src=defaultImg.user class="icon" alt="" />
            <el-autocomplete
              v-model="account.username"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              clearable
              class="inline-input"
              placeholder="请输入账号"
              @select="handleSelect"

          />
          </div>
          <div class="el-input-field">
            <img :src=defaultImg.security class="icon" alt="" />
            <el-input
              v-model="account.password"
              placeholder="请输入密码"
              type="password"
              clearable
              class="el-input-password"
              show-password
          >
          </el-input>
          </div>
          <div class="el-login-btn">
            <el-button class="btn solid" type="primary" @click="login_btn" round>立即登录</el-button>
          </div>
          <p class="social-text">通过其他方式</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <img :src=defaultImg.QQ class="icon" alt="" />
            </a>
            <a href="#" class="social-icon">
              <img :src=defaultImg.wechat class="icon" alt="" />
            </a>
            <a href="#" class="social-icon">
              <img :src=defaultImg.github class="icon" alt="" />
            </a>
          </div>
        </form>
        <form action="#" class="sign-up-form">
          <div class="login-form">
            <h2 class="title">注册</h2>
            <div class="el-input-field">
              <img :src=defaultImg.user class="icon" alt="" />
              <el-input
                  v-model="register.username"
                  placeholder="用户账号"
                  type="text"
                  clearable
                  class="el-input-password"
              ></el-input>
            </div>
            <div class="el-input-field">
              <img :src=defaultImg.security class="icon" alt="" />
              <el-input
                  v-model="register.password"
                  placeholder="确认密码"
                  type="password"
                  clearable
                  class="el-input-password"
                  show-password
              ></el-input>
            </div>
            <div class="el-input-field">
              <img :src=defaultImg.security class="icon" alt="" />
              <el-input
                  v-model="register.againPassword"
                  placeholder="确认密码"
                  type="password"
                  clearable
                  class="el-input-password"
                  show-password
              ></el-input>
            </div>
            <div class="el-login-btn">
              <el-button class="btn solid" type="primary" @click="register_btn" round>立即登录</el-button>
            </div>
            <p class="social-text">通过其他方式</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <img :src=defaultImg.QQ class="icon" alt="" />
              </a>
              <a href="#" class="social-icon">
                <img :src=defaultImg.wechat class="icon" alt="" />
              </a>
              <a href="#" class="social-icon">
                <img :src=defaultImg.github class="icon" alt="" />
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>加入我们</h3>
          <p>
            加入我们，成为本站的一份子。
          </p>
          <button class="btn transparent" id="sign-up-btn">
            去注册
          </button>
        </div>
        <img :src=defaultImg.log class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>已有帐号？</h3>
          <p>
            立即登录已有帐号，享受独家权益。
          </p>
          <button class="btn transparent" id="sign-in-btn">
            去登录
          </button>
        </div>
        <img :src=defaultImg.register class="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ElMessage } from 'element-plus'

import {addevent} from '@/static/js/login/app'
import { ref } from 'vue'

const account = {
  username: ref(""),
  password: ref("")
}
const register = {
  username: ref(""),
  password: ref(""),
  againPassword: ref(""),
}
const defaultImg = {
      log:require("@/static/img/login/log.svg"),
      register:require("@/static/img/login/register.svg"),
      QQ:require("@/static/img/login/QQ.svg"),
      wechat:require("@/static/img/login/wechat.svg"),
      github:require("@/static/img/login/github.svg"),
      user:require("@/static/img/login/用户认证.svg"),
      security:require("@/static/img/login/安全认证.svg"),
    }

function GetLocalStorageAccount(){
  let account = window.localStorage.getItem("account")
  if(!account){
    return
  }
  account = account.split(",")
  const loadAll = []
  for(var i=0; i<account.length; i++){
    loadAll.push({"id": i,"value": account[i]})
  }
  return loadAll
}
function login_btn(){
  if(this.account.username === "" || this.account.password === ""){
    ElMessage({
      showClose: true,
      message: "账号或者密码不能为空",
      type: 'warning'
    })
    return
  }
  axios.post(
      'http://127.0.0.1:8090/get/login',
      {
        "username": this.account.username,
        "password": this.account.password
      },
  ).then(res => {
    console.log(res)
    if(res.data.code === 200){
      if(!window.localStorage.getItem("account"))
      {
        window.localStorage.setItem("account", [this.account.username])
      }else {
        let value = window.localStorage.getItem("account").split(",")
        if(value.indexOf(this.account.username)<0){
          value.push(this.account.username)
        }
        window.localStorage.setItem("account", value)
      }
      this.$router.push({name: 'porject'})
    }else{
      ElMessage({
        showClose: true,
        message: res.data.msg,
        type: 'warning'
      })
    }
  }).catch(err => {
    ElMessage({
      showClose: true,
      message: err,
      type: 'error'
    })
  })
}
function register_btn(){
  for(let item in this.register){
    if(item === ""){
      ElMessage({
        showClose: true,
        message: "注册信息应全部填写",
        type: 'warning'
      })
      return
    }
  }
  axios.post(
      'http://127.0.0.1:8090/get/login',
      {
        "username": this.register.username,
        "password": this.register.password,
        "againPassword": this.register.password
      },
  ).then(res => {
    console.log(res)
    if(res.data.code === 200){
      this.$router.push({name: 'about'})
    }else{
      ElMessage({
        showClose: true,
        message: res.data.msg,
        type: 'warning'
      })
    }
  }).catch(err => {
    ElMessage({
      showClose: true,
      message: err,
      type: 'error'
    })
  })
}

export default {
  name: 'LoginView',
  data(){
    return {
      defaultImg,
      account,
      register,
    }
  },
  methods: {
    login_btn,
    register_btn,
    GetLocalStorageAccount,
    querySearch(queryString, cb) {
      if(queryString && queryString.length>0){
        try {
          var list = GetLocalStorageAccount()
          if (!list) {
            list = []
            list.push({
              id: '-1',
              value: '无匹配结果'
            })
            // 调用 callback 返回建议列表的数据
            cb(list);
          }
          else {
              let showitem = []
              for(var i=0;i<list.length;i++){
                if(list[i].value.indexOf(queryString) > -1){
                  showitem.push({
                    value:`${list[i].value}`,
                    id: `${list[i].id}`
                  })
                }
              }
              if(showitem.length>0){
                // 调用 callback 返回建议列表的数据
                cb(showitem)
              }else {
                list = list.map(item=>{
                  return {
                    value:`${item.value}`,
                    id: `${item.id}`
                  }
                })
                // 调用 callback 返回建议列表的数据
                cb(list)
              }
            }
          } catch (error) {
          ElMessage({
            showClose: true,
            message: error,
            type: 'error'
          })
            }
          }
    },
    // 选中 input 提示的某一条
    handleSelect(item) {
      // item.id等于 -1时，代表没有匹配到任何结果
      if(item.id != -1){
        this.search = item.value
        const data = GetLocalStorageAccount()
        this.tablet = data.list  // 拿到数据进行渲染
      }
    },
  },
  mounted() {
    addevent()
  },

}
</script>

<style scoped>
@import "../static/css/login/style.css";

.login-form{
  width: 300px;
  height: 450px;
  max-width: 380px;
  border: #333333;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  box-shadow:  1px 5px 10px #909090;
}

>>>.el-input__inner{
  margin-left: -10px;
}

>>>.el-input__wrapper {
  max-width: 320px;
  margin: 0 5px;
  padding: 1px 15px;
  border: none;
  box-shadow: none;
}

>>>.el-input__wrapper:hover{
  box-shadow: none;
}

>>>.el-input__wrapper.is-focus{
  box-shadow: none;
}

.el-input-field{
  border-radius: 24px;
  box-shadow: 0 0 0 1px #aaaaaa inset;
  max-width: 320px;
  width: 75%;
  margin: 10px 0;
  height: 35px;
  display: grid;
  justify-content: center;
  align-content: center;
  grid-template-columns: 10% 90%;
  padding: 0 0.4rem;
  position: relative;
}

.el-input-field:hover{
  box-shadow: 0 0 0 1px #66b1ff inset;
}

.el-input-field img{
  align-content: center;
  margin-top: 5px;
  margin-left: 5px;
}

.el-login-btn{
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
}

.el-login-btn >>> .btn{
  width: 320px;
}

</style>

