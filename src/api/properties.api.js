import HTTP from './http'

export const getPropertiesList = async () => {
  try {
    const { data } = await HTTP.get('/api/properties')
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const postProperties = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/postProperties', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export default {
  getPropertiesList
}
