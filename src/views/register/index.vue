<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const formValue = reactive({
  username: '',
  password: '',
})

const router = useRouter()

const handleBack = () => {
  console.log('返回')
  router.go(-1)
}
</script>

<template>
  <div class="app-container">
    <div class="register-form">
      <a-form>
        <a-form-item>
          <a-input v-model:value="formValue.username" placeholder="用户名"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="formValue.password" placeholder="密码"></a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model:value="formValue.confirmPassword" placeholder="确认密码"></a-input>
        </a-form-item>
        <div class="mb-2.5">
          <a-checkbox>我已阅读并同意</a-checkbox>
          <a href="#">《用户协议》</a>
        </div>
        <a-button class="line-btn" type="primary">注册</a-button>
        <a-button class="line-btn" @click="handleBack">返回</a-button>
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

.register-form {
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
