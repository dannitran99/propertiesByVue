// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import commonComponents from './plugins/common-components'
import iconPackage from './plugins/icon-package'
import vuetify from './plugins/vuetify'
import directives from './plugins/click-outside-element'

Vue.config.productionTip = false

Vue.use(commonComponents)
Vue.use(iconPackage)
Vue.use(directives)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
})
