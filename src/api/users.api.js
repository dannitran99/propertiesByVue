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

export const deleteAccount = async () => {
  try {
    const { data } = await HTTP.post('/api/deleteAccount')
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const changeAvatar = async (dataPost) => {
  try {
    const { data } = await HTTP.post('/api/changeAvatar', dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getInfoUser = async () => {
  try {
    const { data } = await HTTP.get(`/api/getInfoUser`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const changeInfo = async (dataPost) => {
  try {
    const { data } = await HTTP.post(`/api/changeInfo`, dataPost)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const checkVerifyToken = async () => {
  try {
    const { data } = await HTTP.post(`/api/checkVerifyToken`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export default {
  postLoginInfo
}
