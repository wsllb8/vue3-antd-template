import { isNumber } from 'lodash-es'

export const checkNonZeroNumber = async (rule, value) => {
  if (isNumber(value) === false) {
    return Promise.reject('请输入数字')
  }
  if (value <= 0) {
    return Promise.reject('请输入大于0的数字')
  }
  return Promise.resolve()
}
