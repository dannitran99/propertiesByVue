import { getPropertiesList, postProperties, getPostedProperty, getPropertiesDetail } from '@/api/properties.api'
import { postImg } from '@/api/cloudinary.api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    propertiesList: [],
    propertiesListPosted: [],
    categoryFilter: [],
    data: null
  },
  getters: {
    propertiesList (state) {
      return state.propertiesList
    },
    propertiesListPosted (state) {
      return state.propertiesListPosted
    },
    categoryFilter (state) {
      return state.categoryFilter
    },
    isLoading (state) {
      return state.isLoading
    },
    data (state) {
      return state.data
    }
  },
  mutations: {
    LOADING_STATE (state, payload) {
      state.isLoading = payload
    },
    RESET_LIST (state) {
      state.propertiesList = []
    },
    GET_PROPERTIES_LIST (state, data) {
      state.propertiesList = data
    },
    GET_PROPERTIES_LIST_POSTED (state, data) {
      state.propertiesListPosted = data
    },
    CHANGE_FILTER (state, data) {
      state.categoryFilter = data
    },
    GET_PROPERTIES_DETAIL (state, data) {
      state.data = data
    }
  },
  actions: {
    async getPropertiesList (context, payload) {
      context.commit('LOADING_STATE', true)
      context.commit('RESET_LIST')
      const [error, response] = await getPropertiesList(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_PROPERTIES_LIST', response)
      } else {
        context.commit('LOADING_STATE', false)
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
    },
    async getPostedProperty (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getPostedProperty(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_PROPERTIES_LIST_POSTED', response)
      } else {
        context.commit('LOADING_STATE', false)
        return error
      }
    },
    async getPropertiesDetail (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getPropertiesDetail(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_PROPERTIES_DETAIL', response)
      } else {
        context.commit('LOADING_STATE', false)
        return error
      }
    }
  }
}
