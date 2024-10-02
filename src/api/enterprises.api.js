import HTTP from './http'

export const createEnterprise = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/createEnterprise', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getAllEnterprise = async (payload) => {
  try {
    let query = []
    if (payload.query) {
      payload.query.k && query.push(`k=${payload.query.k}`)
      payload.query.type && query.push(`type=${payload.query.type}`)
      payload.query.city && query.push(`city=${payload.query.city}`)
      payload.query.district && query.push(`district=${payload.query.district}`)
      query.push(`p=${payload.query.p || 1}`)
      query.push(`l=${payload.query.l || 10}`)
    }
    const { data } = await HTTP.get(`/api/getAllEnterprise?${query.join('&')}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const setPinnedEnterprise = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/setPinnedEnterprise', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
