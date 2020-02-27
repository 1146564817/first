// 首页
import axios from 'axios'
import { getToken } from '@/utilis/token.js'

// 克隆 axios 对象
// 它的名字叫 indexRequest
// 给这个对象设置一些基础属性 如基地址 请求头 带token
// 忘记加  create 方法
let indexRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // headers: {
    //     token: getToken()
    // }
})

// 添加请求拦截器
// 只要indexRequest 一发请求就会拦截请求  可以在里面添统一全局的属性或代码
indexRequest.interceptors.request.use(function (config) {

    config.headers.token = getToken()
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 封装
// 用户登录
export function info() {
    return indexRequest({
        url: '/info',
        method: 'get'
    })
}
// 退出接口
export function logout() {

    return indexRequest({
        url: '/logout',
        method: 'get'
    })
}