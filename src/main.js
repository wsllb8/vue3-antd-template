import '@/styles/index.scss'

import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
// import '@/router/permission'
import 'uno.css'

async function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  app.use(Antd)
  await setupRouter(app)
  app.mount('#app')
}
bootstrap()
