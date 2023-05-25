import { getNewsList } from '@/api/news.api'

export default {
  namespaced: true,
  state: {
    newsList: [],
    previewNewsItem: {},
    currentTab: 0
  },
  getters: {
    newsList (state) {
      return state.newsList
    },
    previewNewsItem (state) {
      return state.previewNewsItem
    },
    currentTab (state) {
      return state.currentTab
    }
  },
  mutations: {
    GET_NEWS_LIST (state, data) {
      state.newsList = data
    },
    SET_PREVIEW_NEW (state, data) {
      state.previewNewsItem = data
    },
    SET_CURRENT_TAB (state, data) {
      state.currentTab = data
    }
  },
  actions: {
    async getNewsList (context) {
      const [error, response] = await getNewsList()
      if (!error && response) {
        context.commit('GET_NEWS_LIST', response)
        response[0] && context.commit('SET_PREVIEW_NEW', response[0])
      } else {
        console.error(error)
      }
    },
    setPreviewNews ({ commit }, data) {
      commit('SET_PREVIEW_NEW', data.data)
    },
    setCurrentMenuTab ({ commit }, data) {
      commit('SET_CURRENT_TAB', data.data)
    }
  }
}
