import { createEnterprise } from '@/api/enterprises.api'

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
    async createEnterprise (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await createEnterprise(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
      }
    }
  }
}
