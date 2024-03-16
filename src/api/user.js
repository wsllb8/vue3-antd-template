import request from '@/util/request'

export function registerApi(data) {
  return request({
    url: '/api/register',
    method: 'post',
    data,
  })
}

export function loginApi(data) {
  return request({
    url: '/api/login',
    method: 'post',
    data,
  })
}

export function logoutApi(data) {
  return request({
    url: '/api/user/logout',
    method: 'post',
    data,
  })
}

export function getMenusApi() {
  return request({
    url: '/api/user/getMenus',
    method: 'get',
  })
}

export function getUserInfoApi() {
  return request({
    url: '/api/user/info',
    method: 'get',
  })
}

export function getPermissionApi() {
  return request({
    url: '/api/user/getPermission',
    method: 'get',
  })
}
