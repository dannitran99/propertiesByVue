import { getCity, getDistrict, getWard } from '@/api/common.api'

export default {
  namespaced: true,
  state: {
    city: [],
    district: [],
    ward: []
  },
  getters: {
    city (state) {
      return state.city
    },
    district (state) {
      return state.district
    },
    ward (state) {
      return state.ward
    }
  },
  mutations: {
    GET_CITY_LIST (state, data) {
      state.city = data
    },
    GET_DISTRICT_LIST (state, data) {
      state.district = data
    },
    GET_WARD_LIST (state, data) {
      state.ward = data
    }
  },
  actions: {
    async getCity (context) {
      const [error, response] = await getCity()
      if (!error && response) {
        const cityName = response.results.map(item => ({name: item['province_name'], code: item['province_id']}))
        context.commit('GET_CITY_LIST', cityName)
      } else {
        console.error(error)
      }
    },
    async getDistrict (context, payload) {
      const [error, response] = await getDistrict(payload)
      if (!error && response) {
        const districtName = response.results.map(item => ({name: item['district_name'], code: item['district_id']}))
        context.commit('GET_DISTRICT_LIST', districtName)
      } else {
        console.error(error)
      }
    },
    async getWard (context, payload) {
      const [error, response] = await getWard(payload)
      if (!error && response) {
        const wardName = response.results.map(item => ({name: item['ward_name'], code: item['ward_id']}))
        context.commit('GET_WARD_LIST', wardName)
      } else {
        console.error(error)
      }
    }
  }
}
