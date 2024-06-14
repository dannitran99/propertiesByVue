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

export const responseRequestAgency = async (dataPost) => {
  try {
    const { data } = await HTTP.post(`${URL}responseRequestAgency`, dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const deleteAccount = async (dataPost) => {
  try {
    const { data } = await HTTP.post(`${URL}deleteAccount`, dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const cancelDeleteAccount = async (dataPost) => {
  try {
    const { data } = await HTTP.post(`${URL}cancelDeleteAccount`, dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
