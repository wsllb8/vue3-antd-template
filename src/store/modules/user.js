import { defineStore } from 'pinia'
import { loginApi, logoutApi, registerApi } from '@/api/user'
import { usePermissionStore, useRouterStore } from '@/store'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: {},
    }
  },
  actions: {
    setUserInfo(data) {
      this.userInfo = data
    },
    async register(data) {
      const res = await registerApi(data)

      console.log(res)
    },
    async login(data) {
      const res = await loginApi(data)
      this.token = res.data?.token
      console.log(res)
    },
    async logout() {
      this.resetLoginState()
      const { router } = useRouterStore()
      router.replace({
        name: 'Login',
      })
    },
    resetLoginState() {
      const { asyncRoutes } = usePermissionStore()
      const { resetRouter } = useRouterStore()

      // 重置路由
      resetRouter(asyncRoutes)
      // 重置token
      this.token = ''
      // 重置用户信息
      this.userInfo = {}
    },
  },
  persist: true,
})

export default useUserStore
