import { registerAgency, getContactUser, deleteRequestAgency, getAllContact } from '@/api/contacts.api'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    contactUser: null,
    contactList: []
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    contactUser(state) {
      return state.contactUser
    },
    contactList(state) {
      return state.contactList
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
    },
    GET_ALL_CONTACT (state, payload) {
      state.contactList = payload
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
    },
    async deleteRequestAgency (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await deleteRequestAgency(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        location.reload()
      }
    },
    async getAllContact (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getAllContact(payload)
      if (response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_ALL_CONTACT', response)
      }
    }
  }
}