import axios from 'axios'
// import { API_URL } from "@/helpers/url";

const HTTP = axios.create({
  baseURL: 'http://10.89.30.67:5000/'
})

HTTP.interceptors.response.use(
  res => res,
  err => {
    throw err
  }
)

export default HTTP
