import HTTP from './http'

export const createEnterprise = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/createEnterprise', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
