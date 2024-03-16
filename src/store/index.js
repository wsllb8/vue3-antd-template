import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import useUserStore from './modules/user'
import useAppStore from './modules/app'
import usePermissionStore from './modules/permission'
import useRouterStore from './modules/router'

export { useUserStore, useAppStore, usePermissionStore, useRouterStore }

const store = createPinia()
store.use(piniaPluginPersistedstate)

export function setupStore(app) {
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)
}
