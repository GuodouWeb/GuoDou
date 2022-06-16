<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form">
          <h2 class="title">登录</h2>
          <div class="el-input-field">
            <img :src="defaultImg.user" class="icon" alt="" />
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
            <img :src="defaultImg.security" class="icon" alt="" />
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
            <el-button class="btn solid" type="primary" @click="login_btn(router)" round
              >立即登录</el-button
            >
          </div>
          <p class="social-text">通过其他方式</p>
          <div class="social-media">
            <a href="#" class="social-icon">
              <img :src="defaultImg.QQ" class="icon" alt="" />
            </a>
            <a href="#" class="social-icon">
              <img :src="defaultImg.wechat" class="icon" alt="" />
            </a>
            <a href="#" class="social-icon">
              <img :src="defaultImg.github" class="icon" alt="" />
            </a>
          </div>
        </form>
        <form action="#" class="sign-up-form">
          <div class="login-form">
            <h2 class="title">注册</h2>
            <div class="el-input-field">
              <img :src="defaultImg.user" class="icon" alt="" />
              <el-input
                  v-model="register.name"
                  placeholder="昵称"
                  type="text"
                  clearable
                  class="el-input-password"
              ></el-input>
            </div>
            <div class="el-input-field">
              <img :src="defaultImg.user" class="icon" alt="" />
              <el-input
                v-model="register.username"
                placeholder="账号"
                type="text"
                clearable
                class="el-input-password"
              ></el-input>
            </div>
            <div class="el-input-field">
              <img :src="defaultImg.security" class="icon" alt="" />
              <el-input
                v-model="register.password"
                placeholder="密码"
                type="password"
                clearable
                class="el-input-password"
                show-password
              ></el-input>
            </div>
            <div class="el-input-field">
              <img :src="defaultImg.security" class="icon" alt="" />
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
              <el-button
                class="btn solid"
                type="primary"
                @click="register_btn(router)"
                round
                >立即登录</el-button
              >
            </div>
            <p class="social-text">通过其他方式</p>
            <div class="social-media">
              <a href="#" class="social-icon">
                <img :src="defaultImg.QQ" class="icon" alt="" />
              </a>
              <a href="#" class="social-icon">
                <img :src="defaultImg.wechat" class="icon" alt="" />
              </a>
              <a href="#" class="social-icon">
                <img :src="defaultImg.github" class="icon" alt="" />
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
          <p>加入我们，成为本站的一份子。</p>
          <button class="btn transparent" id="sign-up-btn">去注册</button>
        </div>
        <img :src="defaultImg.log" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>已有帐号？</h3>
          <p>立即登录已有帐号，享受独家权益。</p>
          <button class="btn transparent" id="sign-in-btn">立即注册</button>
        </div>
        <img :src="defaultImg.register" class="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup name="LoginView">
import { useRouter } from "vue-router";
import {getCurrentInstance, onMounted} from "vue";
import {
  addevent,
  getLocalStorageAccount,
  login_btn,
  register_btn,
  account,
  querySearch,
  register,
  defaultImg } from "@/static/js/login";
const {proxy} = getCurrentInstance()
const router = useRouter()

function handleSelect(item,){
  // item.id等于 -1时，代表没有匹配到任何结果
  if (item.id !== -1) {
    account.username = item.value;
    const data = getLocalStorageAccount();
    proxy.tablet = data; // 拿到数据进行渲染
  }
}

onMounted(() => {
  addevent();
})
</script>

<style scoped>
@import "../static/css/login/style.css";

.login-form {
  width: 300px;
  height: 450px;
  max-width: 380px;
  border: #333333;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 5px 10px #909090;
}

:deep(.el-input__inner) {
  margin-left: -10px;
}

:deep(.el-input__wrapper) {
  max-width: 320px;
  margin: 0 5px;
  padding: 1px 15px;
  border: none;
  box-shadow: none;
}

:deep(.el-input__wrapper):hover {
  box-shadow: none;
}

:deep(.el-input__wrapper).is-focus {
  box-shadow: none;
}

.el-input-field {
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

.el-input-field:hover {
  box-shadow: 0 0 0 1px #66b1ff inset;
}

.el-input-field img {
  align-content: center;
  margin-top: 5px;
  margin-left: 5px;
}
.el-login-btn {
  display: flex;
  width: 75%;
  justify-content: center;
  align-items: center;
}
.el-login-btn :deep(.btn) {
  width: 320px;
}
</style>
