import { postLoginInfo, postRegister, changePassword, disableAccount, deleteAccount, changeAvatar } from '@/api/users.api'
import { postImg } from '@/api/cloudinary.api'

export default {
  namespaced: true,
  state: {
    avatar: localStorage.getItem('avatar'),
    isLoading: false,
    errLogin: '',
    errRegister: '',
    errChangePass: '',
    errDisableAccount: '',
    snackbar: false
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
    },
    errChangePass (state) {
      return state.errChangePass
    },
    errDisableAccount (state) {
      return state.errDisableAccount
    },
    snackbar (state) {
      return state.snackbar
    },
    avatar (state) {
      return state.avatar
    }
  },
  mutations: {
    LOADING_STATE (state, payload) {
      state.isLoading = payload
    },
    SNACKBAR_STATE (state, payload) {
      state.snackbar = payload
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
    CHANGEPASS_ERROR (state, error) {
      state.errChangePass = error.response.data.message || ''
    },
    LOGIN_POST_ERROR (state, error) {
      state.errLogin = error.response.data.message || ''
      state.isLoading = false
    },
    DISABLE_ACCOUNT_ERROR (state, error) {
      state.errDisableAccount = error.response.data.message || ''
    },
    REGISTER_SUCCESS (state) {
      state.errRegister = ''
      state.isLoading = false
    },
    REGISTER_POST_ERROR (state, error) {
      state.errRegister = error.response.data.message || error || ''
      state.isLoading = false
    },
    CHANGE_AVATAR (state, payload) {
      state.avatar = payload
    }
  },
  actions: {
    async postLoginInfo (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await postLoginInfo(payload)
      if (!error && response) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('username', response.username)
        localStorage.setItem('avatar', response.avatar)
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
    },
    async changePassword (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await changePassword(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        context.commit('SNACKBAR_STATE', true)
      } else {
        context.commit('CHANGEPASS_ERROR', error)
        context.commit('LOADING_STATE', false)
      }
    },
    async disableAccount (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await disableAccount(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('avatar')
        location.reload()
      } else {
        context.commit('DISABLE_ACCOUNT_ERROR', error)
        context.commit('LOADING_STATE', false)
      }
    },
    async deleteAccount (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await deleteAccount(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('avatar')
        location.reload()
      } else {
        context.commit('LOADING_STATE', false)
      }
    },
    setSnackbarState (context, payload) {
      context.commit('SNACKBAR_STATE', payload)
    },
    async postImg (context, payload) {
      const [error, response] = await postImg(payload)
      if (!error && response) {
        return response
      } else {
        return error
      }
    },
    async changeAvatar (context, payload) {
      const [error, response] = await changeAvatar(payload)
      if (!error && response) {
        localStorage.setItem('avatar', response.avatar)
        context.commit('CHANGE_AVATAR', response.avatar)
      } else {
        return error
      }
    }
  }
}
