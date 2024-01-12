import { getPropertiesList, postProperties } from '@/api/properties.api'
import { postImg } from '@/api/cloudinary.api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    isLoading: false,
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
    LOADING_STATE (state, payload) {
      state.isLoading = payload
    },
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
    },
    async postProperties (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await postProperties(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        router.push('/danh-sach')
      } else {
        // context.commit('LOGIN_POST_ERROR', error)
      }
    },
    async postImg (context, payload) {
      const [error, response] = await postImg(payload)
      if (!error && response) {
        return response
      } else {
        return error
      }
    }
  }
}
