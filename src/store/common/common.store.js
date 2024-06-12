import { getCity, getDistrict, getWard } from '@/api/common.api'
import { checkVerifyToken } from '@/api/users.api'

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
        const cityName = response.data.map(item => ({name: item['full_name'], code: item['id']}))
        context.commit('GET_CITY_LIST', cityName)
      } else {
        console.error(error)
        // add sample data
        context.commit('GET_CITY_LIST', [{name: 'Ho Chi Minh', code: '1'}])
      }
    },
    async getDistrict (context, payload) {
      const [error, response] = await getDistrict(payload)
      if (!error && response) {
        const districtName = response.data.map(item => ({name: item['full_name'], code: item['id']}))
        context.commit('GET_DISTRICT_LIST', districtName)
      } else {
        console.error(error)
        // add sample data
        context.commit('GET_DISTRICT_LIST', [{name: 'Q7', code: '1'}])
      }
    },
    async getWard (context, payload) {
      const [error, response] = await getWard(payload)
      if (!error && response) {
        const wardName = response.data.map(item => ({name: item['full_name'], code: item['id']}))
        context.commit('GET_WARD_LIST', wardName)
      } else {
        console.error(error)
      }
    },
    async checkVerifyToken () {
      const [error, response] = await checkVerifyToken()
      if (!error && response) {
        localStorage.setItem('token', response)
      } else {
        console.error(error)
      }
    }
  }
}
