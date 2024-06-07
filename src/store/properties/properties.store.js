import { getPropertiesList, postProperties, getPostedProperty, getPropertiesDetail } from '@/api/properties.api'
import {FILTER_SALE_ID, FILTER_RENT_ID} from '../../consts/label'
import { postImg } from '@/api/cloudinary.api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    searchKeyword: '',
    isLoading: false,
    propertiesList: [],
    propertiesListPosted: [],
    categoryFilter: [],
    categoryIdFilter: [],
    citySelected: '',
    districtSelected: [],
    priceMin: null,
    priceMax: null,
    squareMin: null,
    squareMax: null,
    data: null,
    totalItem: 0,
    page: 1,
    limit: 5
  },
  getters: {
    searchKeyword (state) {
      return state.searchKeyword
    },
    propertiesList (state) {
      return state.propertiesList
    },
    propertiesListPosted (state) {
      return state.propertiesListPosted
    },
    categoryFilter (state) {
      return state.categoryFilter
    },
    categoryIdFilter (state) {
      return state.categoryIdFilter
    },
    citySelected (state) {
      return state.citySelected
    },
    districtSelected (state) {
      return state.districtSelected
    },
    priceMin (state) {
      return state.priceMin
    },
    priceMax (state) {
      return state.priceMax
    },
    squareMin (state) {
      return state.squareMin
    },
    squareMax (state) {
      return state.squareMax
    },
    isLoading (state) {
      return state.isLoading
    },
    data (state) {
      return state.data
    },
    totalItem (state) {
      return state.totalItem
    },
    page (state) {
      return state.page
    }
  },
  mutations: {
    SEARCH_TYPING (state, payload) {
      state.searchKeyword = payload
    },
    LOADING_STATE (state, payload) {
      state.isLoading = payload
    },
    RESET_LIST (state) {
      state.propertiesList = []
    },
    GET_PROPERTIES_LIST (state, data) {
      state.propertiesList = data.Data
      state.totalItem = data.Total
    },
    GET_PROPERTIES_LIST_POSTED (state, data) {
      state.propertiesListPosted = data
    },
    CHANGE_FILTER (state, data) {
      state.categoryFilter = data.data
      state.categoryIdFilter = data.filterId
    },
    FILTER_CITY (state, data) {
      state.citySelected = data
    },
    FILTER_DISTRICT (state, data) {
      state.districtSelected = data
    },
    MIN_PRICE_CHANGE (state, data) {
      state.priceMin = data
    },
    MAX_PRICE_CHANGE (state, data) {
      state.priceMax = data
    },
    MIN_SQUARE_CHANGE (state, data) {
      state.squareMin = data
    },
    MAX_SQUARE_CHANGE (state, data) {
      state.squareMax = data
    },
    GET_PROPERTIES_DETAIL (state, data) {
      state.data = data
    },
    CLEAR_FILTER (state) {
      state.searchKeyword = ''
      state.categoryFilter = []
      state.categoryIdFilter = []
      state.citySelected = ''
      state.districtSelected = []
      state.priceMin = null
      state.priceMax = null
      state.squareMin = null
      state.squareMax = null
      state.page = 1
      state.totalItem = 0
      state.limit = 5
    },
    SUBMIT_FILTER (state, payload) {
      const query = {}
      const codeList = router.history.current.path === '/nha-dat-ban' ? FILTER_SALE_ID : FILTER_RENT_ID
      state.categoryIdFilter.length && state.categoryIdFilter.length < codeList.length && Object.assign(query, { category: state.categoryIdFilter.join(',') })
      state.searchKeyword && Object.assign(query, { k: state.searchKeyword })
      state.citySelected && Object.assign(query, { city: state.citySelected })
      state.districtSelected.length && Object.assign(query, { district: state.districtSelected.join(',') })
      state.priceMin && Object.assign(query, { minPrice: state.priceMin })
      state.priceMax && Object.assign(query, { maxPrice: state.priceMax })
      state.squareMin && Object.assign(query, { minSquare: state.squareMin })
      state.squareMax && Object.assign(query, { maxSquare: state.squareMax })
      state.page > 1 && Object.assign(query, { p: state.page })
      state.limit !== 5 && Object.assign(query, { l: state.limit })
      router.push({
        path: payload || router.path,
        query: query
      })
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
      }
    },
    searchChange (context, payload) {
      context.commit('SEARCH_TYPING', payload)
    },
    filterChange (context, payload) {
      context.commit('CHANGE_FILTER', payload)
    },
    setFilterCity (context, payload) {
      context.commit('FILTER_CITY', payload)
    },
    setFilterDistrict (context, payload) {
      context.commit('FILTER_DISTRICT', payload)
    },
    minPriceChange (context, payload) {
      context.commit('MIN_PRICE_CHANGE', payload)
    },
    maxPriceChange (context, payload) {
      context.commit('MAX_PRICE_CHANGE', payload)
    },
    minSquareChange (context, payload) {
      context.commit('MIN_SQUARE_CHANGE', payload)
    },
    maxSquareChange (context, payload) {
      context.commit('MAX_SQUARE_CHANGE', payload)
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
    clearFilter (context) {
      context.commit('CLEAR_FILTER')
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
    },
    submitFilter (context, payload) {
      context.commit('SUBMIT_FILTER', payload)
    }
  }
}
