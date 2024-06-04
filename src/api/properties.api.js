import HTTP from './http'

export const getPropertiesList = async (payload) => {
  try {
    let query = [`type=${payload.type}`]
    if (payload.query) {
      payload.query.category && query.push(`category=${payload.query.category}`)
      payload.query.k && query.push(`k=${payload.query.k}`)
      payload.query.city && query.push(`city=${payload.query.city}`)
      payload.query.district && query.push(`district=${payload.query.district}`)
    }
    const { data } = await HTTP.get(`/api/properties?${query.join('&')}`)
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
