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
      path: '/tin-tuc',
      name: 'News',
      component: () => import('@/views/News')
    },
    {
      path: '/tin-tuc/:newsId',
      name: 'NewsDetail',
      component: () => import('@/views/News/NewsContent')
    }
  ]
})
