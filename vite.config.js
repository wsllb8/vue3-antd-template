import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), UnoCSS()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3012/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
