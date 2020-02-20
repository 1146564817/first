// 导入必须的vuejs
import Vue from 'vue'
// 导入 vue的设置
import App from './App.vue'
Vue.config.productionTip = false
// 导入饿了么ui 样式和格式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 实例化饿了么
Vue.use(ElementUI)

// 导入样式直接import 路径就可以了
import "./style/base.css"


// 导入路由对象，默认优先会找js文件
import router from './router/index'

// 挂载到Vue实例里
new Vue({
  render: h => h(App),
  // 实例化 路由
  router
}).$mount('#app')
