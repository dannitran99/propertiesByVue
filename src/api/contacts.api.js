import HTTP from './http'

export const registerAgency = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/registerAgency', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const registerEnterprise = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/registerEnterprise', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const updateAgency = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/updateAgency', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getContactUser = async () => {
  try {
    const { data } = await HTTP.get('/api/getContactUser')
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const deleteRequestAgency = async () => {
  try {
    const { data } = await HTTP.delete('/api/deleteRequestAgency')
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getAllContact = async (payload) => {
  let query = [`contactType=${payload.query.contactType || 'doanh-nghiep'}`]
  if (payload.query) {
    payload.query.k && query.push(`k=${payload.query.k}`)
    payload.query.type && query.push(`type=${payload.query.type}`)
    payload.query.typeProperty && query.push(`typeProperty=${payload.query.typeProperty}`)
    payload.query.city && query.push(`city=${payload.query.city}`)
    payload.query.district && query.push(`district=${payload.query.district}`)
    query.push(`p=${payload.query.p || 1}`)
    query.push(`l=${payload.query.l || 5}`)
  }
  try {
    const { data } = await HTTP.get(`/api/getAllContact?${query.join('&')}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getContactDetail = async (payload) => {
  let query = []
  if (payload.query) {
    query.push(`p=${payload.query.p || 1}`)
    query.push(`l=${payload.query.l || 5}`)
  }

  try {
    const { data } = await HTTP.get(`/api/contact/${payload.id}?${query.join('&')}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
