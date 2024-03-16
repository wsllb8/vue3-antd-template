import request from '@/util/request'

export function getDeptListApi(data) {
  return request({
    url: '/api/super/dept/getDeptList',
    method: 'get',
    data,
  })
}

export function createDeptApi(data) {
  return request({
    url: '/api/super/dept/createDept',
    method: 'post',
    data,
  })
}

export function updateDeptApi(data) {
  return request({
    url: '/api/super/dept/updateDept',
    method: 'post',
    data,
  })
}

export function deleteDeptApi(data) {
  return request({
    url: '/api/super/dept/deleteDept',
    method: 'post',
    data,
  })
}
