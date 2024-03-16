import { defineStore } from 'pinia'
import { getMenusApi } from '@/api/user'
import { transformObjToRoute } from '@/util/route'

const usePermissionStore = defineStore('permission', {
  state: () => ({
    asyncRoutes: [],
    permissions: [],
    menus: [],
  }),
  actions: {
    async buildAsyncRoutes() {
      // 获取后台路由列表
      const res = await getMenusApi()
      console.log(res.data)
      const routes = transformObjToRoute(res.data.list)
      this.asyncRoutes = routes
      return routes
    },
    setPermissions(permissions) {
      this.permissions = permissions
      const menus = permissions.map((item) => {
        this.asyncRoutes.push(item)
        const parent = this.generateRouter(item)
        const children = item.children.map((child) => this.generateRouter(child))
        parent.children = children
        return parent
      })
      // 对路由进行排序
      menus.sort((a, b) => a.meta?.sort - b.meta?.sort)
      this.menus = menus
    },
    generateRouter(item) {
      return {
        path: item.children ? `${item.path}` : item.path,
        name: item.name,
        meta: item.meta,
        redirect: item.redirect,
        component: item.component,
      }
    },
  },
})

export default usePermissionStore
