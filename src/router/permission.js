import router from '@/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { isWhiteList } from '@/config/whiteList'
import { usePermissionStore } from '@/store'
import { useUserStore } from '@/store'
import { PAGE_NOT_FOUND_ROUTE } from '@/util/route/constant'

NProgress.configure({ showSpinner: false })

export function createPermissionGuard(router) {
  router.beforeEach(async (to, from) => {
    console.log('beforeEach')
    NProgress.start()
    const userStore = useUserStore()
    const token = userStore.token
    // 判断是否登录
    if (!token) {
      // 如果在免登录白名单，直接进入
      if (isWhiteList(to)) {
        NProgress.done()
        return true
      } else {
        // 其他没有访问权限的页面将被重定向到登录页面
        NProgress.done()
        return { path: `/login?redirect=${to.path}` }
      }
      return true
    }

    // 如果已经登录
    // 如果访问的是登录页面，直接进入
    if (to.path === '/login') {
      NProgress.done()
      return { path: '/' }
    }
    NProgress.done()
    return true
  })

  router.afterEach(() => {
    setTimeout(() => {
      NProgress.done()
    }, 1000)
    // NProgress.done()
  })
}
