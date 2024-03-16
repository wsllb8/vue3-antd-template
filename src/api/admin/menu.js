import request from '@/util/request'

export function getMenuListApi(data) {
  return request({
    url: '/api/super/menu/getMenuList',
    method: 'get',
    data,
  })
}

export function createMenuApi(data) {
  return request({
    url: '/api/super/menu/createMenu',
    method: 'post',
    data,
  })
}

export function updateMenuApi(data) {
  return request({
    url: '/api/super/menu/updateMenu',
    method: 'post',
    data,
  })
}

export function deleteMenuApi(data) {
  return request({
    url: '/api/super/menu/deleteMenu',
    method: 'post',
    data,
  })
}
