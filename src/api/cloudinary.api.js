import axios from 'axios'

const cloudName = 'dadyvbcci'

const HTTP = axios.create({
  baseURL: `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
})

HTTP.interceptors.response.use(
  res => res,
  err => {
    throw err
  }
)

export const postImg = async (file) => {
  try {
    const { data } = await HTTP.post('', file)
    return [null, data]
  } catch (error) {
    return [error]
  }
}
