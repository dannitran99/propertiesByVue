import { getRequestAgency, getRequestDisableAccount, acceptRequestAgency } from '@/api/admin.api'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    requestAgency: [],
    requestDisableAccount: []
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    requestAgency(state) {
      return state.requestAgency
    },
    requestDisableAccount(state) {
      return state.requestDisableAccount
    }
  },
  mutations: {
    LOADING_STATE (state, payload) {
      state.isLoading = payload
    },
    GET_REQUEST_AGENCY (state, payload) {
      state.requestAgency = payload
    },
    GET_REQUEST_DISABLE_ACCOUNT (state, payload) {
      state.requestDisableAccount = payload
    }
  },
  actions: {
    async getRequestAgency (context) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getRequestAgency()
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_REQUEST_AGENCY', response)
      }
    },
    async getRequestDisableAccount (context) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getRequestDisableAccount()
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_REQUEST_DISABLE_ACCOUNT', response)
      }
    },
    async acceptRequestAgency (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await acceptRequestAgency(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
      }
    }
  }
}
