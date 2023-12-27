import { postLoginInfo, postRegister } from '@/api/users.api'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    errLogin: '',
    errRegister: ''
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    errLogin (state) {
      return state.errLogin
    },
    errRegister (state) {
      return state.errRegister
    }
  },
  mutations: {
    LOADING_STATE (state, payload) {
      state.isLoading = payload
    },
    LOGIN_SUCCESS (state) {
      state.errLogin = ''
      state.isLoading = false
    },
    LOGIN_ERROR (state, error) {
      state.errLogin = error
    },
    REGISTER_ERROR (state, error) {
      state.errRegister = error
    },
    LOGIN_POST_ERROR (state, error) {
      state.errLogin = error.response.data.message || ''
      state.isLoading = false
    },
    REGISTER_SUCCESS (state) {
      state.errRegister = ''
      state.isLoading = false
    },
    REGISTER_POST_ERROR (state, error) {
      state.errRegister = error.response.data.message || ''
      state.isLoading = false
    }
  },
  actions: {
    async postLoginInfo (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await postLoginInfo(payload)
      if (!error && response) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('username', response.username)
        context.commit('LOGIN_SUCCESS')
      } else {
        context.commit('LOGIN_POST_ERROR', error)
      }
    },
    setErrMessage (context, payload) {
      context.commit('LOGIN_ERROR', payload.message)
    },
    setErrMessageRegister (context, payload) {
      context.commit('REGISTER_ERROR', payload.message)
    },
    async postRegister (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await postRegister(payload)
      if (!error && response) {
        context.commit('REGISTER_SUCCESS')
      } else {
        context.commit('REGISTER_POST_ERROR', error)
      }
    }
  }
}
