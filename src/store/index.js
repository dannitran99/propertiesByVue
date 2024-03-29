import Vue from 'vue'
import Vuex from 'vuex'

import newsStore from './news'
import propertiesStore from './properties'
import usersStore from './users'
import common from './common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    news: newsStore,
    properties: propertiesStore,
    user: usersStore,
    common: common
  }
})
