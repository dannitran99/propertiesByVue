import HTTP from './http'

export const getNewsList = async () => {
  try {
    const { data } = await HTTP.get('/api/news')
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export default {
  getNewsList
}
