import Vue from 'vue'
import './cube-ui'
import App from './App.vue'

// 字体文件
import '@/assets/js/iconfont'

// 全局样式
import '@/assets/css/index.styl'

// createAPI 注册组件
import '@/assets/js/register'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
