import { createEnterprise, getAllEnterprise, setPinnedEnterprise, getPinnedEnterprise } from '@/api/enterprises.api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    enterpriseList: [],
    totalItem: 0,
    searchKeyword: '',
    type: { id: 0, label: 'Lĩnh vực' },
    city: { id: 0, label: 'Tỉnh/Thành phố', value: '' },
    district: { id: 0, label: 'Quận/Huyện', value: '' }
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    enterpriseList(state) {
      return state.enterpriseList
    },
    totalItem (state) {
      return state.totalItem
    },
    searchKeyword (state) {
      return state.searchKeyword
    },
    type (state) {
      return state.type
    },
    city (state) {
      return state.city
    },
    district (state) {
      return state.district
    }
  },
  mutations: {
    LOADING_STATE (state, payload) {
      state.isLoading = payload
    },
    SEARCH_TYPING (state, payload) {
      state.searchKeyword = payload
    },
    CHANGE_TYPE(state, payload) {
      state.type = payload
    },
    CHANGE_CITY(state, payload) {
      state.city = payload
    },
    CHANGE_DISTRICT(state, payload) {
      state.district = payload
    },
    GET_ALL_ENTERPRISES(state, payload) {
      state.enterpriseList = payload.Data
      state.totalItem = payload.Total
    },
    GET_PINNED_ENTERPRISES(state, payload) {
      state.enterpriseList = payload
    },
    SUBMIT_FILTER(state, payload) {
      const query = {}
      state.searchKeyword && Object.assign(query, { k: state.searchKeyword })
      state.type.id && Object.assign(query, { type: state.type.label })
      state.city.id && Object.assign(query, { city: state.city.label })
      state.district.id && Object.assign(query, { district: state.district.label })
      router.push({
        path: '/doanh-nghiep',
        query: query
      })
    }
  },
  actions: {
    async createEnterprise (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await createEnterprise(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        router.push('/quan-ly-doanh-nghiep')
      }
    },
    searchChange (context, payload) {
      context.commit('SEARCH_TYPING', payload)
    },
    submitFilter (context, payload) {
      context.commit('SUBMIT_FILTER', payload)
    },
    typeChange(context, payload) {
      context.commit('CHANGE_TYPE', payload)
    },
    cityChange(context, payload) {
      context.commit('CHANGE_CITY', payload)
    },
    districtChange(context, payload) {
      context.commit('CHANGE_DISTRICT', payload)
    },
    async getAllEnterprises (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getAllEnterprise(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_ALL_ENTERPRISES', response)
      }
    },
    async setPinnedEnterprise(context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await setPinnedEnterprise(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        location.reload()
      }
    },
    async getPinnedEnterprise(context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getPinnedEnterprise(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('GET_PINNED_ENTERPRISES', response)
      }
    }
  }
}
