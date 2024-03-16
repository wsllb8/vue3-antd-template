<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const handleBackHome = () => {
  router.push('/')
}
</script>

<template>
  <a-result status="404" title="404" sub-title="很抱歉，您访问的页面不存在。">
    <template #extra>
      <a-button type="primary" @click="handleBackHome">返回主页</a-button>
    </template>
  </a-result>
</template>
