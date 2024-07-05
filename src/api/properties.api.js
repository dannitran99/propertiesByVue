import HTTP from './http'

export const getPropertiesList = async (payload) => {
  try {
    let query = [`type=${payload.type}`]
    if (payload.query) {
      payload.query.category && query.push(`category=${payload.query.category}`)
      payload.query.k && query.push(`k=${payload.query.k}`)
      payload.query.city && query.push(`city=${payload.query.city}`)
      payload.query.district && query.push(`district=${payload.query.district}`)
      payload.query.minPrice && query.push(`minp=${payload.query.minPrice}`)
      payload.query.maxPrice && query.push(`maxp=${payload.query.maxPrice}`)
      payload.query.minSquare && query.push(`mins=${payload.query.minSquare}`)
      payload.query.maxSquare && query.push(`maxs=${payload.query.maxSquare}`)
      payload.query.f && query.push(`f=${payload.query.f}`)
      query.push(`p=${payload.query.p || 1}`)
      query.push(`l=${payload.query.l || 5}`)
      payload.query.sort && Number(payload.query.sort) !== 0 && query.push(`sort=${payload.query.sort}`)
    }
    const { data } = await HTTP.get(`/api/properties?${query.join('&')}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getPropertiesListMain = async (payload) => {
  try {
    const { data } = await HTTP.get(`/api/propertiesMain?p=${payload.p}&l=${payload.l}`)
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

export const getPostedProperty = async () => {
  try {
    const { data } = await HTTP.get(`/api/getPostedProperty`)
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
