import { defineStore } from 'pinia'

const useAppStore = defineStore('app', {
  state: () => {
    return {
      darkMode: 'auto',
    }
  },
  persist: true,
})

export default useAppStore
