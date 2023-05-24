import { getNewsList } from '@/api/news.api'

export default {
  namespaced: true,
  state: {
    newsList: []
  },
  getters: {
    newsList (state) {
      return state.newsList
    }
  },
  mutations: {
    GET_NEWS_LIST (state, data) {
      state.newsList = data
    }
  },
  actions: {
    async getNewsList (context) {
      const [error, response] = await getNewsList()
      if (!error && response) {
        context.commit('GET_NEWS_LIST', response)
      } else {
        console.error(error)
      }
    }
  }
}
