import { cloneDeep, omit } from 'lodash-es'
import {
  LAYOUT,
  PAGE_NOT_FOUND_ROUTE,
  PARENT_LAYOUT,
  EXCEPTION_COMPONENT,
} from '@/util/route/constant'
const LayoutMap = new Map()
LayoutMap.set('LAYOUT', LAYOUT)

let dynamicViewsModules

// 动态引入路由组件
function asyncImportRoute(routes) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,jsx}')
  if (!routes) return
  routes.forEach(async (item) => {
    const { component, name } = item
    const { children } = item
    console.log(item, dynamicViewsModules)
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase())
      if (layoutFound) {
        item.component = layoutFound
      } else {
        item.component = dynamicImport(dynamicViewsModules, component)
      }
    } else if (name) {
      item.component = PARENT_LAYOUT()
    }
    // if (item.meta.icon) item.meta.icon = await getMenuIcon(item.meta.icon)
    children && asyncImportRoute(children)
  })
}

// 动态引入路由组件
function dynamicImport(dynamicViewsModules, component) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') || component.endsWith('.jsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  }
  if (matchKeys?.length > 1) {
    throw new Error(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    )
  } else {
    console.warn(`Can't find ${component} in pages folder`)
  }
  return EXCEPTION_COMPONENT
}

// 将后台返回的路由列表转换为路由对象
export function transformObjToRoute(routerList) {
  routerList.forEach((route) => {
    const component = route.component
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(component.toUpperCase())
      } else {
        route.children = [cloneDeep(route)]
        route.component = LAYOUT
        route.name = `${route.name}Parent`
        route.path = ''
        route.meta = route.meta || {}
      }
    } else {
      throw Error('component is undefined')
    }
    route.children && asyncImportRoute(route.children)
  })
  return [...routerList, PAGE_NOT_FOUND_ROUTE]
}
