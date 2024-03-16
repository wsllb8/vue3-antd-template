import request from '@/util/request'

export function getUserListApi(queryParams) {
  return request({
    url: '/api/super/user/getUserList',
    method: 'get',
    params: queryParams,
  })
}

export function createUserApi(data) {
  return request({
    url: '/api/super/user/createUser',
    method: 'post',
    data,
  })
}

export function updateUserApi(data) {
  return request({
    url: '/api/super/user/updateUser',
    method: 'post',
    data,
  })
}

export function deleteUserApi(data) {
  return request({
    url: '/api/super/user/deleteUser',
    method: 'post',
    data,
  })
}
