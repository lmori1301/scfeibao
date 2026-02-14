/**
 * 查询系统路由
 */
export default {
  path: '/query-system',
  name: 'QuerySystem',
  component: () => import('@/layouts/DefaultLayout.vue'),
  redirect: '/query-system/certificate',
  meta: {
    title: '查询系统'
  },
  children: [
    {
      path: '',
      redirect: 'certificate'
    },
    {
      path: 'certificate',
      name: 'CertificateQuery',
      component: () => import('@/views/query-system/certificate-index.vue'),
      meta: {
        title: '证书查询'
      }
    },
    {
      path: 'certificate/list',
      name: 'CertificateList',
      component: () => import('@/views/query-system/certificate-list.vue'),
      meta: {
        title: '证书列表'
      }
    },
    {
      path: 'certificate/detail/:certificateNo',
      name: 'CertificateDetail',
      component: () => import('@/views/query-system/certificate-detail.vue'),
      meta: {
        title: '证书详情'
      }
    },
    {
      path: 'personnel',
      name: 'PersonnelQuery',
      component: () => import('@/views/query-system/personnel.vue'),
      meta: {
        title: '内部人员查询'
      }
    },
    {
      path: 'vehicle',
      name: 'VehicleQuery',
      component: () => import('@/views/query-system/vehicle.vue'),
      meta: {
        title: '应急车辆查询'
      }
    }
  ]
}
