import { getUserInfoApi, getPermissionApi } from '@/api/user'
import { useUserStore, usePermissionStore } from '@/store'

export async function getUserInfo() {
  const res = await getUserInfoApi()
  const { username, nickName, avatar } = res.data || {}
  return {
    username,
    avatar: avatar,
    nickName: nickName,
  }
}

export async function getPermission() {
  let asyncPermissions = []
  try {
    const res = await getPermissionApi()
    asyncPermissions = res?.data?.menus || []
  } catch (error) {
    console.error(error)
  }
  return asyncPermissions
}
