import Layout from '@/layouts/index.vue'

export const resultRouters = [
  {
    path: '/result',
    name: 'Result',
    component: Layout,
    redirect: '/result/success',
    meta: {
      title: '结果页',
    },
    children: [
      {
        path: 'success',
        name: 'ResultSuccess',
        component: () => import('@/views/result/success/index.vue'),
        meta: {
          title: '成功页',
        },
      },
      {
        path: 'fail',
        name: 'ResultFail',
        component: () => import('@/views/result/fail/index.vue'),
        meta: {
          title: '失败页',
        },
      },
      {
        path: '403',
        name: 'Result403',
        component: () => import('@/views/result/403/index.vue'),
        meta: {
          title: '403',
        },
      },
      {
        path: '404',
        name: 'Result404',
        component: () => import('@/views/result/404/index.vue'),
        meta: {
          title: '404',
        },
      },
      {
        path: '500',
        name: 'Result500',
        component: () => import('@/views/result/500/index.vue'),
        meta: {
          title: '500',
        },
      },
    ],
  },
]
