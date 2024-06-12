import { registerAgency, getContactUser } from '@/api/contacts.api'

export default {
  namespaced: true,
  state: {
    isLoading: false
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    }
  },
  mutations: {
    LOADING_STATE (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    async registerAgency (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await registerAgency(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
      }
    },
    async getContactUser (context) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getContactUser()
      if (!error && response) {
        context.commit('LOADING_STATE', false)
      }
    }
  }
}
