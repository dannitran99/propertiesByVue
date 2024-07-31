import { getNewsList, getNewById, postNews } from '@/api/news.api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    searchKeyword: '',
    newsList: [],
    previewNewsItem: {},
    currentTab: 0,
    newContent: {},
    totalItem: 0
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    searchKeyword (state) {
      return state.searchKeyword
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
    },
    totalItem (state) {
      return state.totalItem
    }
  },
  mutations: {
    INIT_STATE (state) {
      state.newContent = {}
    },
    SEARCH_TYPING (state, payload) {
      state.searchKeyword = payload
    },
    GET_NEWS_LIST_PENDING (state) {
      state.isLoading = true
    },
    GET_NEWS_LIST_FULFILL (state, data) {
      state.isLoading = false
      state.newsList = data.Data
      state.totalItem = data.Total
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
    },
    SUBMIT_FILTER (state, payload) {
      const query = {}
      payload.query.category && Object.assign(query, { category: payload.query.category })
      state.searchKeyword && Object.assign(query, { k: state.searchKeyword })
      router.push({
        path: `/${payload.path.split('/')[1]}`,
        query: query
      })
    }
  },
  actions: {
    async getNewsList (context, payload) {
      context.commit('GET_NEWS_LIST_PENDING')
      const [error, response] = await getNewsList(payload)
      if (!error && response) {
        context.commit('GET_NEWS_LIST_FULFILL', response)
        response.Data && response.Data[0] && context.commit('SET_PREVIEW_NEW', response.Data[0])
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
        router.push('/tin-tuc')
      } else {
        console.error(error)
      }
    },
    searchChange (context, payload) {
      context.commit('SEARCH_TYPING', payload)
    },
    setPreviewNews ({ commit }, data) {
      commit('SET_PREVIEW_NEW', data.data)
    },
    setCurrentMenuTab ({ commit }, data) {
      commit('SET_CURRENT_TAB', data.data)
    },
    returnInitData ({ commit }) {
      commit('INIT_STATE')
    },
    submitFilter(context, payload) {
      context.commit('SUBMIT_FILTER', payload)
    }
  }
}
