import axios from 'axios'


// 创建axios实例
const service = axios.create({
  baseURL: "http://192.168.1.117:8080", // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
})

// respone拦截器直接返回data
service.interceptors.response.use(
  response => {
      return response.data
  },
  error => {
    console.log('err' + error)// for debug

    return error.message
  }
)

export default service
