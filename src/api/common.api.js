import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'https://vapi.vnappmob.com/api/'
})

HTTP.interceptors.response.use(
  res => res,
  err => {
    throw err
  }
)

export const getCity = async () => {
  try {
    const { data } = await HTTP.get('/province/')
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getDistrict = async (code) => {
  try {
    const { data } = await HTTP.get(`/province/district/${code}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getWard = async (code) => {
  try {
    const { data } = await HTTP.get(`/province/ward/${code}`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
