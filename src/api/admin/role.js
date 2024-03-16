import request from '@/util/request'

export function getRoleListApi(data) {
  return request({
    url: '/api/super/role/getRoleList',
    method: 'get',
    data,
  })
}

export function createRoleApi(data) {
  return request({
    url: '/api/super/role/createRole',
    method: 'post',
    data,
  })
}

export function updateRoleApi(data) {
  return request({
    url: '/api/super/role/updateRole',
    method: 'post',
    data,
  })
}

export function deleteRoleApi(data) {
  return request({
    url: '/api/super/role/deleteRole',
    method: 'post',
    data,
  })
}
