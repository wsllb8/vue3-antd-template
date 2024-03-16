<script setup>
import { useUserStore } from '@/store'
import { message } from 'ant-design-vue'

const userStore = useUserStore()

const handleClick = async ({ key }) => {
  switch (key) {
    case 'profile':
      console.log('个人资料')
      break
    case 'settings':
      console.log('设置')
      break
    case 'logout':
      console.log('退出登录')
      try {
        await logoutApi()
      } catch (error) {
        console.log(error)
      }
      userStore.logout()
      message.success('退出登录')
      break
  }
}
</script>

<template>
  <a-dropdown>
    <template #overlay>
      <a-menu @click="handleClick">
        <a-menu-item key="profile"> 个人资料 </a-menu-item>
        <a-menu-item key="settings"> 设置 </a-menu-item>
        <a-menu-item key="logout"> 退出登录 </a-menu-item>
      </a-menu>
    </template>
    <div class="flex cursor-pointer items-center">
      <a-avatar style="background-color: #87d068" :size="40" icon="user" />
      <div class="ml-2 flex-col flex-shrink-0 items-center">
        <div class="text-5">{{ userStore.userInfo.nickName }}</div>
        <div class="text-3 opacity-50">管理员</div>
      </div>
    </div>
  </a-dropdown>
</template>
