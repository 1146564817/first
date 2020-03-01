// 导入Vue
import Vue from 'vue'

// 导入路由
import VueRouter from 'vue-router'
// 进度条导入
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 导入请求
import { info } from '@/api/index.js'

// 导入操作token
import { removeToken } from '@/utilis/token.js'

// 单独导入饿了么ui
import { Message } from 'element-ui';
// 注册路由
Vue.use(VueRouter)

// 准备组件
import login from "../views/login/index.vue"
import index from '../views/index/index.vue'
import children from './children.js'

// 导入vuex 
import store from '@/State/state.js'

// 设置路由规则
const routes = [
  { path: "/login",
   component: login ,
   meta:{
     title:"登录",
     rules: ['超级管理员', '管理员', '老师', '学生']
  }},

  { path: "/",
   redirect: '/login',
   meta:{
     title:"登录",
     rules: ['超级管理员', '管理员', '老师', '学生']
  } },
  {
    path: "/index",
    component: index,
    meta:{
      title:'首页',
      rules: ['超级管理员', '管理员', '老师', '学生']
    },
    // 子路由
    children
  }
]

// 创建路由对象
const router = new VueRouter({
  routes
})
// 导航守卫   跳转前   必须写在 创建对象后
// 前置守卫  next 运行通过  to 跳转前  from 跳转后
// 在登录时需要判断内存中是否有token 如果没有就直接返回到登录页面
router.beforeEach((to, from, next) => {
  // window.console.log('准备跳转了')
// 使用路由白名单
// window.console.log('同',to)
  // 判断是否有token  
  // 在页面跳转是开启进度条
  NProgress.start()
  // 判断是否为login登录页面 是就直接放行
  if (to.path == '/login') {
    
    // 运行通过
    next()
    
  } else {
    // 对其他页面进行判断
    info().then(res => {
      window.console.log(res)

      if (res.data.code == 200) {
        // 运行通过
        // vuex 全局数据保存  一定要使用 vuex里面的方法来操作数据  如果直接使用属性来操作 操作后 数据在内存中不会更改和保存
        store.commit('quUsername',res.data.data.username)
        // 权限存储
        store.commit('quRoles',res.data.data.role)
        // 图片地址
        store.commit('quAvatar',process.env.VUE_APP_URL + "/" + res.data.data.avatar)
        

        // 判断 登录账户是否被禁用 status  1 启用  0禁用
        if(res.data.data.status==1){

          next()
          // 只有是从登录页跳转过来的才提示登录
          // if(from.path='login'){
          //   Message.success('登录成功')
          // }
          if(from.path == '/login'){

            Message.success('登录成功')
          }
           // 在判断是否有权限使用该页面的功能
          if(to.meta.rules.includes(res.data.data.role)){
          // Message.success
          next()

          }else{

            Message.warning('账户权限限制,请于管理员联系')

            next(from.path)
          }

        }else{
          // 清除进度条动画
          NProgress.done()
          Message.error('账户登录限制,请于管理员联系')
          // 打回登录页
          next('/login')
        }
        
      } else {
         // 清除进度条动画
        NProgress.done()
        // 提示信息
        Message.error('登录信息错误!请重新登录')
        // 删除内存中的token
        removeToken()
        // 并返回登录页
        next('/login')
      }
    })
  }

})

// 后置守卫 跳转后 
router.afterEach((to) => {

  NProgress.done()
  // to and from are both route objects.
  // window.console.log('这是',to)
  // window.console.log('跳转了')
  document.title=to.meta.title
})
// 暴露出去
export default router