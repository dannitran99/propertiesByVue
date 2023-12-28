import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'https://provinces.open-api.vn/api/'
})

HTTP.interceptors.response.use(
  res => res,
  err => {
    throw err
  }
)

export const getCity = async () => {
  try {
    const { data } = await HTTP.get()
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getDistrict = async (code) => {
  try {
    const { data } = await HTTP.get(`/p/${code}?depth=2`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getWard = async (code) => {
  try {
    const { data } = await HTTP.get(`/d/${code}?depth=2`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
