// 首页
import axios from 'axios'
import {getToken} from '@/utilis/token.js'

// 克隆 axios 对象
// 它的名字叫 indexRequest
// 给这个对象设置一些基础属性 如基地址 请求头 带token

let indexRequest =axios({
    baseURL:process.env.VUE_APP_URL,
    headers:{
        token:getToken()
    }
})

// 封装
// 用户登录
export function info(){
    return indexRequest({
        url:'/login',
        method:'get'
    })
}

export function logout(){

    return indexRequest({
        url:'/logout',
        method:'get'
    })
}