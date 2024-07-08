import { registerAgency, getContactUser, deleteRequestAgency, getAllContact, updateAgency, getContactDetail } from '@/api/contacts.api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    contactUser: null,
    contactList: [],
    contactData: {},
    totalItem: 0,
    propertiesist: [],
    totalPropertiesItem: 0,
    searchKeyword: '',
    type: { id: 0, label: 'Loại giao dịch', value: '' },
    typeProperty: { id: 0, label: 'Loại nhà đất', value: '' },
    city: { id: 0, label: 'Tỉnh/Thành phố', value: '' },
    district: { id: 0, label: 'Quận/Huyện', value: '' },
    project: { id: 0, label: 'Dự án', value: '' }
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
    },
    city (state) {
      return state.city
    },
    district (state) {
      return state.district
    },
    project (state) {
      return state.project
    },
    totalItem (state) {
      return state.totalItem
    },
    propertiesist (state) {
      return state.propertiesist
    },
    totalPropertiesItem (state) {
      return state.totalPropertiesItem
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
    CHANGE_CITY(state, payload) {
      state.city = payload
    },
    CHANGE_DISTRICT(state, payload) {
      state.district = payload
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
      state.contactList = payload.Data
      state.totalItem = payload.Total
    },
    GET_CONTACT_DATA(state, payload) {
      state.contactData = payload.data
      state.propertiesist = payload.propertiesData
      state.totalPropertiesItem = payload.total
    },
    SUBMIT_FILTER(state, payload) {
      const query = {}
      payload.contactType && Object.assign(query, { contactType: payload.contactType })
      state.searchKeyword && Object.assign(query, { k: state.searchKeyword })
      state.type.id && Object.assign(query, { type: state.type.value })
      state.typeProperty.id && Object.assign(query, { typeProperty: state.typeProperty.value })
      state.city.id && Object.assign(query, { city: state.city.label })
      state.district.id && Object.assign(query, { district: state.district.label })
      router.push({
        path: '/nha-moi-gioi',
        query: query
      })
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
    cityChange(context, payload) {
      context.commit('CHANGE_CITY', payload)
    },
    districtChange(context, payload) {
      context.commit('CHANGE_DISTRICT', payload)
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
    },
    submitFilter (context, payload) {
      context.commit('SUBMIT_FILTER', payload)
    }
  }
}
