import axios from 'axios'
// import { API_URL } from "@/helpers/url";
// const url1 = 'http://192.168.1.3:5000/'
// const url2 = 'http://10.89.30.67:5000/'
const live = 'https://propertiesbego.onrender.com/'
const HTTP = axios.create({
  baseURL: live
})

const token = localStorage.token

HTTP.defaults.headers.common['Authorization'] = `Bearer ${token}`

HTTP.interceptors.response.use(
  res => res,
  err => {
    switch (err.response.statusText) {
      case 'Unauthorized':
        alert('Vui lòng đăng nhập lại!')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('avatar')
        location.reload('/')
        break
      case 'Not Found':
        location.replace('/404')
        break
      default:
        break
    }
    throw err
  }
)

export default HTTP
