// 免登录白名单（匹配路由 path）
const whiteListByPath = ['/','/login', '/register']
// 免登录白名单（匹配路由 name）
const whiteListByName = []

// 判断是否在白名单中
const isWhiteList = (to) => {
  // path 和 name 任意匹配一个即可
  return whiteListByPath.includes(to.path) || whiteListByName.includes(to.name)
}

export { isWhiteList }
