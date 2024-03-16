<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
console.log(import.meta.glob('../../views/**/*.{vue,jsx}'))
const handleTo = () => {
  router.push({ name: 'Register' })
}
</script>
<template>
  <div>
    <a-button @click="handleTo" type="primary">跳转1</a-button>
    <a-button>跳转2</a-button>
  </div>
</template>
