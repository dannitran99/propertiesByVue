import { getPropertiesList } from '@/api/properties.api'

export default {
  namespaced: true,
  state: {
    propertiesList: [],
    categoryFilter: []
  },
  getters: {
    propertiesList (state) {
      return state.propertiesList
    },
    categoryFilter (state) {
      return state.categoryFilter
    }
  },
  mutations: {
    GET_PROPERTIES_LIST (state, data) {
      state.propertiesList = data
    },
    CHANGE_FILTER (state, data) {
      state.categoryFilter = data
    }
  },
  actions: {
    async getPropertiesList (context) {
      const [error, response] = await getPropertiesList()
      if (!error && response) {
        context.commit('GET_PROPERTIES_LIST', response)
      } else {
        console.error(error)
      }
    },
    filterChange (context, payload) {
      context.commit('CHANGE_FILTER', payload.data)
    }
  }
}
