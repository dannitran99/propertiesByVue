import HTTP from './http'

const URL = '/api/admin/'

export const getRequestAgency = async () => {
  try {
    const { data } = await HTTP.get(`${URL}getRequestAgency`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getRequestDisableAccount = async () => {
  try {
    const { data } = await HTTP.get(`${URL}getRequestDisableAccount`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const acceptRequestAgency = async (dataPost) => {
  try {
    const { data } = await HTTP.post(`${URL}acceptRequestAgency`, dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
