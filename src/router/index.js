import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { getUserInfo, getPermission } from '@/store/helper'
import Layouts from '@/layouts/index.vue'
import { resultRouters } from '@/router/modules/result'
import { createPermissionGuard } from './permission'
import { useUserStore, usePermissionStore } from '@/store'
import { unref, markRaw, toRaw } from 'vue'

export const constantRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '主页',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
    meta: {
      title: '注册',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/result/404/index.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...resultRouters],
})

export async function setupRouter(app) {
  try {
    await initUserAndPermission()
  } catch (error) {
    console.error('🚀 初始化失败', error)
  }
  setupRouterGuards(router)
  app.use(router)
}

export function setupRouterGuards(router) {
  createPermissionGuard(router)
}

// 初始化用户信息和权限
export async function initUserAndPermission() {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  if (!userStore.token) {
    const route = unref(router.currentRoute)
    if (route.path !== '/login') {
      router.replace({
        path: '/login',
        query: route.query,
      })
    }
    return
  }
  const [user, permissions] = await Promise.all([getUserInfo(), getPermission()])
  // 设置用户信息
  userStore.setUserInfo(user)
  // 设置权限信息
  permissionStore.setPermissions(permissions)
  // 加载views下的所有页面
  const routeComponents = import.meta.glob('@/views/**/*.{vue,jsx}')
  // 只能支持两级路由
  const asyncRoutes = permissionStore.asyncRoutes.map((routerItem) => {
    let component
    if (routerItem.component?.toLowerCase() === 'layout') {
      component = Layouts
    } else {
      component =
        routeComponents[routerItem.component] || (() => import('@/views/result/404/index.vue'))
    }
    // 加载子路由, 使用markRaw防止vue3的proxy代理, 因为在这里不需要
    const children =
      routerItem.children?.map((child) => {
        child.component =
          routeComponents[child.component] || (() => import('@/views/result/404/index.vue'))
        return {
          ...child,
          meta: toRaw(child.meta),
        }
      }) || []

    return {
      ...routerItem,
      component,
      children,
      meta: toRaw(routerItem.meta),
    }
  })
  // 动态添加路由
  asyncRoutes.forEach((route) => {
    if (!router.hasRoute(route.name)) {
      router.addRoute(route)
    }
  })
}

export default router
