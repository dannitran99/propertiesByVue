import HTTP from './http'

export const registerAgency = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/registerAgency', dataPost)
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
  try {
    const { data } = await HTTP.get(`/api/getAllContact?${query.join('&')}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
