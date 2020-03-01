import axios from 'axios'

import {getToken} from '@/utilis/token.js'

let userRequest = axios.create({
    // 地址拼接
    baseURL: process.env.VUE_APP_URL,
    // headers: {
    //     token: getToken()
    // }

    // 允许带token
    withCredentials: true
})
// 路由拦截器
userRequest.interceptors.request.use(function (config) {
    // 给每一个请求都添加一个token
    config.headers.token = getToken()
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 获取用户信息
export function  userlist(params){
    return userRequest({
        url:'/user/list',
        method:'get',
        params
    })
}
// 新增用户
export function  userAdd(data){
    return userRequest({
        url:'/user/add',
        method:'post',
        data
    })
}
// 修改用户状态
export function  userStatus(data){
    return userRequest({
        url:'/user/status',
        method:'post',
        data
    })
}
// 删除用户
export function  userRemove(data){
    return userRequest({
        url:'/user/remove',
        method:'post',
        data
    })
}
// 修改用户信息
export function  userEdit(data){
    return userRequest({
        url:'/user/edit',
        method:'post',
        data
    })
}