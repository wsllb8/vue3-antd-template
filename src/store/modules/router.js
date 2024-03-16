import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'

const useRouterStore = defineStore('router', () => {
  const router = useRouter()
  const route = useRoute()

  function resetRouter(accessRoutes) {
    accessRoutes.forEach((item) => {
      router.hasRoute(item.name) && router.removeRoute(item.name)
    })
  }

  return {
    router,
    route,
    resetRouter,
  }
})
export default useRouterStore
