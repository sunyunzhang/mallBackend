// 开发Vue插件
import axios from 'axios'

const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
  const AUTH_TOKEN = localStorage.getItem('token')
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
  // 统一配置baseUrl
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 添加实例方法
  Vue.prototype.$http = axios
}

// 导出
export default MyHttpServer
