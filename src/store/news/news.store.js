import { getNewsList } from '@/api/news.api'

export default {
  namespaced: true,
  state: {
    newsList: [],
    previewNewsItem: {}
  },
  getters: {
    newsList (state) {
      return state.newsList
    },
    previewNewsItem (state) {
      return state.previewNewsItem
    }
  },
  mutations: {
    GET_NEWS_LIST (state, data) {
      state.newsList = data
    },
    SET_PREVIEW_NEW (state, data) {
      state.previewNewsItem = data
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
      data && commit('SET_PREVIEW_NEW', data.data)
    }
  }
}
