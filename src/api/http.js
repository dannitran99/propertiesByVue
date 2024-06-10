import axios from 'axios'
// import { API_URL } from "@/helpers/url";
const url1 = 'http://192.168.1.3:5000/'
// const url2 = 'http://10.89.30.67:5000/'
const HTTP = axios.create({
  baseURL: url1
})

HTTP.interceptors.response.use(
  res => res,
  err => {
    throw err
  }
)

export default HTTP
