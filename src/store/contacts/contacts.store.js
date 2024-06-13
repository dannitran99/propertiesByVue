import { registerAgency, getContactUser } from '@/api/contacts.api'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    contactUser: null
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    contactUser(state) {
      return state.contactUser
    }
  },
  mutations: {
    LOADING_STATE (state, payload) {
      state.isLoading = payload
    },
    GET_CONTACT_USER (state, payload) {
      if (!payload.message) {
        state.contactUser = payload
      }
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
        context.commit('GET_CONTACT_USER', response)
      }
    }
  }
}
