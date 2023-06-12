import { getPropertiesList } from '@/api/properties.api'

export default {
  namespaced: true,
  state: {
    propertiesList: [],
    categoryFilter: ['Tất cả nhà đất']
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
    setFilterCategory (context, payload) {
      console.log(payload)
    }
  }
}
