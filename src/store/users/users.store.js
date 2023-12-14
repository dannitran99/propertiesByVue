import { postLoginInfo } from '@/api/users.api'

export default {
  namespaced: true,
  state: {
  },
  getters: {
  },
  mutations: {
    // GET_PROPERTIES_LIST (state, data) {
    //   state.propertiesList = data
    // },
    // CHANGE_FILTER (state, data) {
    //   state.categoryFilter = data
    // }
  },
  actions: {
    async postLoginInfo (context, payload) {
    //   const [error, response] =
      await postLoginInfo(payload)
    //   if (!error && response) {
    //     context.commit('GET_PROPERTIES_LIST', response)
    //   } else {
    //     console.error(error)
    //   }
    }
  }
}
