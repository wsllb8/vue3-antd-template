<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/store'
import { initUserAndPermission } from '@/router'

const router = useRouter()
const userStore = useUserStore()

const formValue = reactive({
  username: '',
  password: '',
  remember: false,
})

const handleRegister = () => {
  router.push('/register')
}

const handleLogin = async () => {
  await userStore.login(formValue)
  try {
    console.log('登录成功')
    await initUserAndPermission()
    router.push('/')
  } catch (error) {
    console.log(error)
  }
  console.log('登录')
}
</script>
<template>
  <div class="app-container">
    <div class="login-form">
      <a-form>
        <a-form-item>
          <a-input v-model:value="formValue.username" placeholder="用户名"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="formValue.password" placeholder="密码" @keydown.enter="handleLogin"></a-input>
        </a-form-item>
        <div class="flex justify-between mb-2.5">
          <a-checkbox v-model:checked="formValue.remember">记住我</a-checkbox>
          <a href="#">忘记密码？</a>
        </div>
        <a-form-item>
          <a-button class="line-btn" type="primary" @click="handleLogin">登录</a-button>
          <a-button class="line-btn" @click="handleRegister">注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #293146;
}
.login-form {
  width: 400px;
  padding: 50px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
  margin-bottom: 100px;
  text-align: center;
  .line-btn {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
