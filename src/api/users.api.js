import HTTP from './http'

export const postLoginInfo = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/login', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const postRegister = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/register', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const changePassword = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/changePassword', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const disableAccount = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/disableAccount', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const deleteAccount = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/deleteAccount', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export default {
  postLoginInfo
}
