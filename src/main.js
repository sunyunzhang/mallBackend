// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
import MyHttpServer from './plugins/http'
import MyHttpServerL from '@/plugins/httpL/'
import moment from 'moment'

Vue.use(ElementUI)
// eslint-disable-next-line no-undef
Vue.use(MyHttpServer)
Vue.use(MyHttpServerL)
Vue.use(moment)
Vue.config.productionTip = false

// 全局过滤器
Vue.filter('fmdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
