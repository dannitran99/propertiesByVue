import HTTP from './http'

export const getNewsList = async (payload) => {
  try {
    let query = []
    payload.type && query.push(`type=${payload.type}`)
    if (payload.query) {
      payload.query.k && query.push(`k=${payload.query.k}`)
      payload.query.tags && query.push(`tags=${payload.query.tags}`)
      query.push(`p=${payload.query.p || 1}`)
      query.push(`l=${payload.query.l || 10}`)
    }
    const { data } = await HTTP.get(`/api/news?${query.join('&')}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getNewById = async (newId) => {
  try {
    const { data } = await HTTP.get(`/api/news/${newId}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const postNews = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/postNews', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export default {
  getNewsList
}
