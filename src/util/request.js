import axios from 'axios'
import { useUserStore } from '@/store'
import { message } from 'ant-design-vue'

const service = axios.create({
  baseURL: '',
  timeout: 5000,
})

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const { token } = useUserStore()
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data

    // 业务逻辑错误
    const code = res.code
    if (code !== 0) {
      if (code >= 40000 && code <= 50000) {
        useUserStore().logout()
        message.error('登录失效，请重新登录')
        return Promise.reject(new Error('登录失效，请重新登录'))
      }
      message.error(res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default service
