import { getNewsList, getNewById, postNews, setPinnedNews } from '@/api/news.api'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    isLoading: false,
    isLoadingPinned: false,
    searchKeyword: '',
    newsList: [],
    newsPinnedList: [],
    newsListMain: [],
    previewNewsItem: {},
    currentTab: 0,
    newContent: {},
    totalItem: 0
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    isLoadingPinned (state) {
      return state.isLoadingPinned
    },
    searchKeyword (state) {
      return state.searchKeyword
    },
    newsList (state) {
      return state.newsList
    },
    newsPinnedList (state) {
      return state.newsPinnedList
    },
    newsListMain (state) {
      return state.newsListMain
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
      state.newsList = []
      state.newContent = {}
      state.totalItem = 0
    },
    SEARCH_TYPING (state, payload) {
      state.searchKeyword = payload
    },
    GET_NEWS_LIST_PENDING (state) {
      state.isLoading = true
    },
    GET_NEWS_LIST_FULFILL (state, data) {
      state.isLoading = false
      if (data.Data) {
        const noDulplicate = data.Data.filter(item => !state.newsList.find(sItem => sItem.ID === item.ID))
        state.newsList = [...state.newsList, ...noDulplicate]
      }
      state.totalItem = data.Total
    },
    GET_NEWS_LIST_MAIN_FULFILL(state, data) {
      state.isLoading = false
      state.newsListMain = data.Data
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
    LOADING_PINNED_STATE(state, payload) {
      state.isLoadingPinned = payload
    },
    GET_PINNED_NEWS(state, payload) {
      state.newsPinnedList = payload.Data
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
      const startRoute = router.history.current.fullPath
      context.commit('GET_NEWS_LIST_PENDING')
      const [error, response] = await getNewsList(payload)
      if (!error && response) {
        if (startRoute === router.history.current.fullPath) {
          context.commit('GET_NEWS_LIST_FULFILL', response)
          response.Data && response.Data[0] && context.commit('SET_PREVIEW_NEW', response.Data[0])
        }
      } else {
        console.error(error)
      }
    },
    async getNewsListMain (context, payload) {
      context.commit('GET_NEWS_LIST_PENDING')
      const [error, response] = await getNewsList(payload)
      if (!error && response) {
        context.commit('GET_NEWS_LIST_MAIN_FULFILL', response)
        response.Data && response.Data[0] && context.commit('SET_PREVIEW_NEW', response.Data[0])
      } else {
        console.error(error)
      }
    },
    async getPinnedNews(context, payload) {
      context.commit('LOADING_PINNED_STATE', true)
      const [error, response] = await getNewsList(payload)
      if (!error && response) {
        context.commit('LOADING_PINNED_STATE', false)
        context.commit('GET_PINNED_NEWS', response)
      }
    },
    async getNewById (context, payload) {
      const startRoute = router.history.current.fullPath
      context.commit('LOADING_STATE', true)
      const [error, response] = await getNewById(payload.id)
      if (!error && response) {
        if (startRoute === router.history.current.fullPath) {
          context.commit('GET_NEW_DATA', response)
          context.commit('LOADING_STATE', false)
        }
      } else {
        console.error(error)
      }
    },
    async postNews (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await postNews(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
        router.push('/quan-ly-tin')
      } else {
        console.error(error)
      }
    },
    async setPinnedNews (context, payload) {
      context.commit('LOADING_STATE', true)
      const [error, response] = await setPinnedNews(payload)
      if (!error && response) {
        context.commit('LOADING_STATE', false)
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
