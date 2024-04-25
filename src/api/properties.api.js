import HTTP from './http'

export const getPropertiesList = async (payload) => {
  try {
    const { data } = await HTTP.get(`/api/properties?type=${payload.type}`)
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

export const getPostedProperty = async (dataPost) => {
  try {
    const { data } = await HTTP.get(`/api/getPostedProperty?name=${dataPost.user}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getPropertiesDetail = async (payload) => {
  try {
    const { data } = await HTTP.get(`/api/properties/${payload.id}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export default {
  getPropertiesList
}
