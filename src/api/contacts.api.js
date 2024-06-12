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
