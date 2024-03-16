<script setup>
import { reactive, h, computed, watch } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue'
import { usePermissionStore } from '@/store/index';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const permissionStore = usePermissionStore()

const state = reactive({
  collapsed: false,
  selectedKeys: [''],
  openKeys: [''],
})

const items = computed(() => {
  return permissionStore.menus.map(menu => {
    return {
      key: menu.path,
      // icon: () => h(menu.icon),
      label: menu.meta.title,
      title: menu.meta.title,
      children: menu.children.map(child => {
        return {
          key: `${menu.path}/${child.path}`,
          label: child.meta.title,
          title: child.meta.title,
        }
      }),
    }
  })
})

// 监听路由变化, 高亮当前路由, menu采用path作为key, 所以需要保证path的唯一性
// 要想高亮需要设置selectedKeys和openKeys为对应的key
watch(route, () => {
  // 当前路由的path
  state.selectedKeys = [route.path]
  // 当前路由matched的第一个是父级路由
  state.openKeys = [route.matched[0].path]
}, {immediate: true})
const handleClick = ({ key }) => {
  router.push(key)
}
</script>

<template>
  <div>
    <div class="text-white text-center my-4">中后台系统</div>
    <a-menu
      @click="handleClick"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="state.collapsed"
      :items="items"
    >
    </a-menu>
  </div>
</template>
