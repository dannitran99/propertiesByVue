import HTTP from './http'

export const postLoginInfo = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/login', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export default {
  postLoginInfo
}
