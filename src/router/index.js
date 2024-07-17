import Vue from 'vue'
import Router from 'vue-router'
import {beforeRouteEnter} from '@/helpers/JWTVerify'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/HomePage')
    },
    {
      path: '/tai-khoan',
      name: 'UserInformation',
      component: () => import('@/views/UserInformation'),
      beforeEnter: (to, from, next) => {
        beforeRouteEnter() ? next() : next('/')
      }
    },
    {
      path: '/doi-mat-khau',
      name: 'ChangePassword',
      component: () => import('@/views/UserInformation'),
      beforeEnter: (to, from, next) => {
        beforeRouteEnter() ? next() : next('/')
      }
    },
    {
      path: '/dang-ky-moi-gioi',
      name: 'AgencyRegister',
      component: () => import('@/views/UserInformation'),
      beforeEnter: (to, from, next) => {
        beforeRouteEnter(['user', 'agency']) ? next() : next('/')
      }
    },
    {
      path: '/dang-ky-doanh-nghiep',
      name: 'EnterpriseRegister',
      component: () => import('@/views/EnterpriseRegister'),
      beforeEnter: (to, from, next) => {
        beforeRouteEnter(['user', 'enterprise']) ? next() : next('/')
      }
    },
    {
      path: '/dang-tin',
      name: 'PostProperty',
      component: () => import('@/views/PostProperty'),
      beforeEnter: (to, from, next) => {
        beforeRouteEnter() ? next() : next('/')
      }
    },
    {
      path: '/danh-sach',
      name: 'UserPropertyManager',
      component: () => import('@/views/UserPropertyManager'),
      beforeEnter: (to, from, next) => {
        beforeRouteEnter() ? next() : next('/')
      }
    },
    {
      path: '/yeu-cau-moi-gioi',
      name: 'RequestAgency',
      component: () => import('@/views/Admin/RequestAgency'),
      beforeEnter: (to, from, next) => {
        beforeRouteEnter(['admin']) ? next() : next('/')
      }
    },
    {
      path: '/yeu-cau-xoa-tai-khoan',
      name: 'RequestDisableAccount',
      component: () => import('@/views/Admin/RequestDisableAccount'),
      beforeEnter: (to, from, next) => {
        beforeRouteEnter(['admin']) ? next() : next('/')
      }
    },
    {
      path: '/tin-tuc',
      name: 'News',
      component: () => import('@/views/News')
    },
    {
      path: '/tin-tuc/:newsId',
      name: 'NewsDetail',
      component: () => import('@/views/News/NewsContent')
    },
    {
      path: '/nha-dat-ban',
      name: 'PropertiesForSale',
      component: () => import('@/views/Properties')
    },
    {
      path: '/nha-dat-ban/:propertiesId',
      name: 'PropertiesSaleDetail',
      component: () => import('@/views/Properties/PropertiesContent')
    },
    {
      path: '/nha-dat-cho-thue/:propertiesId',
      name: 'PropertiesRentDetail',
      component: () => import('@/views/Properties/PropertiesContent')
    },
    {
      path: '/nha-dat-cho-thue',
      name: 'PropertiesForRent',
      component: () => import('@/views/Properties')
    },
    {
      path: '/nha-moi-gioi',
      name: 'ContactAgency',
      component: () => import('@/views/ContactAgency')
    },
    {
      path: '/nha-moi-gioi/:contactId',
      name: 'ContactAgencyDetail',
      component: () => import('@/views/ContactAgency/ContactAgencyDetail')
    },
    { path: '/404',
      name: 'NotFound',
      component: () => import('@/views/404')
    },
    { path: '*', beforeEnter: (to, from, next) => { next('/404') } }
  ]
})
