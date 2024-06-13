import Vue from 'vue'
import Vuex from 'vuex'

import admin from './admin'
import newsStore from './news'
import propertiesStore from './properties'
import usersStore from './users'
import common from './common'
import contact from './contacts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    admin: admin,
    news: newsStore,
    properties: propertiesStore,
    user: usersStore,
    common: common,
    contact: contact
  }
})
