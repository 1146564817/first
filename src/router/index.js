import Vue from 'vue'
import sona from '../components/sona.vue'
// 导入
import VueRouter from 'vue-router'
// 注册
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
    route: [
        {
            path: '*',//需要 重定项地址
            redirect: '/'//重 定到哪里
        },
        {
            path: '/',
            component: sona
        },
    ]
})
// 需要暴露出去
export default router