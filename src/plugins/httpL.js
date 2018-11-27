// 开发Vue插件
import axios from 'axios'

const MyHttpServerL = {}
MyHttpServerL.install = (Vue) => {
  // 统一配置baseUrl
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 添加实例方法
  Vue.prototype.$httpL = axios
}

// 导出
export default MyHttpServerL
