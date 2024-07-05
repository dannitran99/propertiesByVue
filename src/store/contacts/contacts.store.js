import { registerAgency, getContactUser, deleteRequestAgency, getAllContact, updateAgency, getContactDetail } from '@/api/contacts.api'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    contactUser: null,
    contactList: [],
    contactData: {},
    searchKeyword: '',
    type: { id: 0, label: 'Loại giao dịch', value: '' },
    typeProperty: { id: 0, label: 'Loại nhà đất', value: '' }
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
    },
    contactData(state) {
      return state.contactData
    },
    searchKeyword (state) {
      return state.searchKeyword
    },
    type (state) {
      return state.type
    },
    typeProperty (state) {
      return state.typeProperty
    }
  },
  mutations: {
    SEARCH_TYPING (state, payload) {
      state.searchKeyword = payload
    },
    CHANGE_TYPE(state, payload) {
      state.type = payload
    },
    CHANGE_TYPE_PROPERTY(state, payload) {
      state.typeProperty = payload
    },
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
    },
    GET_CONTACT_DATA(state, payload) {
      state.contactData = payload
    }
  },
  actions: {
    searchChange (context, payload) {
      context.commit('SEARCH_TYPING', payload)
    },
    typeChange(context, payload) {
      context.commit('CHANGE_TYPE', payload)
    },
    typePropertyChange(context, payload) {
      context.commit('CHANGE_TYPE_PROPERTY', payload)
    },
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
    async updateAgency (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await updateAgency(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
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
      if (!error) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_ALL_CONTACT', response)
      }
    },
    async getContactDetail (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getContactDetail(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_CONTACT_DATA', response)
      }
    }
  }
}
