import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('@/views/HomePage')
    },
    {
      path: '/tin-tuc',
      name: 'News',
      component: () => import('@/views/News'),
      children: [
        {
          path: '/:newsId',
          name: 'NewsDetail',
          component: () => import('@/views/NewsContent')
        }
      ]
    }
  ]
})
