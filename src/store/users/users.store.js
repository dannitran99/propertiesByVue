import { postLoginInfo } from '@/api/users.api'

export default {
  namespaced: true,
  state: {
    err: ''
  },
  getters: {
    err (state) {
      return state.err
    }
  },
  mutations: {
    // GET_PROPERTIES_LIST (state, data) {
    //   state.propertiesList = data
    // },
    LOGIN_SUCCESS (state) {
      state.err = ''
    },
    LOGIN_ERROR (state, error) {
      state.err = error
    },
    LOGIN_POST_ERROR (state, error) {
      state.err = error.response.data.message || ''
    }
  },
  actions: {
    async postLoginInfo (context, payload) {
      const [error, response] = await postLoginInfo(payload)
      if (!error && response) {
        localStorage.setItem('token', response)
        context.commit('LOGIN_SUCCESS')
      } else {
        context.commit('LOGIN_POST_ERROR', error)
      }
    },
    setErrMessage (context, payload) {
      context.commit('LOGIN_ERROR', payload.message)
    }
  }
}
