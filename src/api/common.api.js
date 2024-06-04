import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'https://esgoo.net/api-tinhthanh/'
})

HTTP.interceptors.response.use(
  res => res,
  err => {
    throw err
  }
)

export const getCity = async () => {
  try {
    const { data } = await HTTP.get('/1/0.htm')
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getDistrict = async (code) => {
  try {
    const { data } = await HTTP.get(`/2/${code}.htm`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}

export const getWard = async (code) => {
  try {
    const { data } = await HTTP.get(`/3/${code}.htm`)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
