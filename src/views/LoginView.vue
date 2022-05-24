<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#"  class="sign-in-form">
          <h2 class="title">登录</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input v-model="username" type="text" placeholder="用户名" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input v-model="password" type="password" placeholder="密码" />
          </div>
          <button class="btn solid" @click="login" type="button">立即登录</button>
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
          <h2 class="title">注册</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="用户名" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="密码" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" placeholder="确认密码" />
          </div>
          <button class="btn solid" type="button">立即注册</button>

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
const {ref} = require("vue");
export default {
  name: 'LoginView',
  data(){
    const username = ref("");
    const password = ref("");
    return {
      defaultImg: {
        log:require("@/static/img/login/log.svg"),
        register:require("@/static/img/login/register.svg"),
        QQ:require("@/static/img/login/QQ.svg"),
        wechat:require("@/static/img/login/wechat.svg"),
        github:require("@/static/img/login/github.svg"),
      },
      username,
      password,
    }
  },
  methods: {
    login(){
      if(this.username === "" || this.password === ""){
        ElMessage({
          showClose: true,
          message: "账号或者密码不能为空",
          type: 'warning'
        })
        return
      }
      axios.post('http://127.0.0.1:8090/get/login',
          {"username": this.username, "password":this.password},
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
    },
  },
  mounted() {
    addevent()
  }
}
</script>

<style scoped>
@import "../static/css/login/style.css";
</style>
