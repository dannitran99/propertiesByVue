import { getNewsList, getNewById, postNews } from '@/api/news.api'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    newsList: [],
    previewNewsItem: {},
    currentTab: 0,
    newContent: {}
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    newsList (state) {
      return state.newsList
    },
    previewNewsItem (state) {
      return state.previewNewsItem
    },
    currentTab (state) {
      return state.currentTab
    },
    newContent (state) {
      return state.newContent
    }
  },
  mutations: {
    INIT_STATE (state) {
      state.newContent = {}
    },
    GET_NEWS_LIST_PENDING (state) {
      state.isLoading = true
    },
    GET_NEWS_LIST_FULFILL (state, data) {
      state.isLoading = false
      state.newsList = data
    },
    GET_NEW_DATA (state, data) {
      state.newContent = data
    },
    SET_PREVIEW_NEW (state, data) {
      state.previewNewsItem = data
    },
    SET_CURRENT_TAB (state, data) {
      state.currentTab = data
    },
    LOADING_STATE (state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    async getNewsList (context) {
      context.commit('GET_NEWS_LIST_PENDING')
      const [error, response] = await getNewsList()
      if (!error && response) {
        context.commit('GET_NEWS_LIST_FULFILL', response)
        response[0] && context.commit('SET_PREVIEW_NEW', response[0])
      } else {
        console.error(error)
      }
    },
    async getNewById (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await getNewById(payload.id)
      if (!error && response) {
        context.commit('GET_NEW_DATA', response)
        context.commit('LOADING_STATE', false)
      } else {
        console.error(error)
      }
    },
    async postNews (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await postNews(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
      } else {
        console.error(error)
      }
    },
    setPreviewNews ({ commit }, data) {
      commit('SET_PREVIEW_NEW', data.data)
    },
    setCurrentMenuTab ({ commit }, data) {
      commit('SET_CURRENT_TAB', data.data)
    },
    returnInitData ({ commit }) {
      commit('INIT_STATE')
    }
  }
}
