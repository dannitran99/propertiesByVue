import { getRequestAgency, getRequestDisableAccount, responseRequestAgency, deleteAccount, cancelDeleteAccount } from '@/api/admin.api'

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
    },
    RESPONSE_REQUEST_SUCCESS (state, payload) {
      state.requestAgency.splice(state.requestAgency.findIndex(item => item.field === payload.username), 1)
    },
    RESPONSE_DISABLE_ACCOUNT_SUCCESS (state, payload) {
      state.requestDisableAccount.splice(state.requestDisableAccount.findIndex(item => item.field === payload.username), 1)
    }
  },
  actions: {
    async getRequestAgency (context) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getRequestAgency()
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_REQUEST_AGENCY', response)
      } else {
        context.commit('LOADING_STATE', false)
      }
    },
    async getRequestDisableAccount (context) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getRequestDisableAccount()
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_REQUEST_DISABLE_ACCOUNT', response)
      } else {
        context.commit('LOADING_STATE', false)
      }
    },
    async responseRequestAgency (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await responseRequestAgency(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('RESPONSE_REQUEST_SUCCESS', payload)
      } else {
        context.commit('LOADING_STATE', false)
      }
    },
    async deleteAccount (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await deleteAccount(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('RESPONSE_DISABLE_ACCOUNT_SUCCESS', payload)
      } else {
        context.commit('LOADING_STATE', false)
      }
    },
    async cancelDeleteAccount (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await cancelDeleteAccount(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('RESPONSE_DISABLE_ACCOUNT_SUCCESS', payload)
      } else {
        context.commit('LOADING_STATE', false)
      }
    }
  }
}
