export const LAYOUT = () => import('@/layouts/index.vue')
export const EXCEPTION_COMPONENT = () => import('@/views/result/500/index.vue')
export const PARENT_LAYOUT = () =>
  new Promise((resolve) => {
    resolve({ name: 'ParentLayout' })
  })
// export const PAGE_NOT_FOUND_ROUTE = {
//   path: "/*",
//   name: "404Page",
//   redirect: "/result/404",
// }

export const PAGE_NOT_FOUND_ROUTE = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  redirect: '/result/404',
}
