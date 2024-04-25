import Vue from 'vue'
import Router from 'vue-router'

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
      component: () => import('@/views/UserInformation')
    },
    {
      path: '/doi-mat-khau',
      name: 'ChangePassword',
      component: () => import('@/views/UserInformation')
    },
    {
      path: '/dang-tin',
      name: 'PostProperty',
      component: () => import('@/views/PostProperty')
    },
    {
      path: '/danh-sach',
      name: 'UserPropertyManager',
      component: () => import('@/views/UserPropertyManager')
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
    }
  ]
})
