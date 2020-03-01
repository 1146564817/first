import axios from "axios";
import { getToken } from '@/utilis/token.js'

// 克隆一个路由对象 并赋值给变量
let subjectRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
    // headers: {
    //     token: getToken()
    // }
    // 允许带token
    withCredentials: true
})


// 路由拦截器
// 在里面添加 token
subjectRequest.interceptors.request.use(function (config) {

    config.headers.token = getToken()
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 获取用户表格信息
export  function sulist(params) {
    return subjectRequest({
        url: '/subject/list',
        method: 'get',
        params
    })
}
// 修改启用和禁用
export function statusid(data) {
    return subjectRequest({
        url: '/subject/status',
        method: 'post',
        data
    })
}
// 新增表单
export function statusAdd(data) {
    return subjectRequest({
        url: '/subject/add',
        method: 'post',
        data
    })
}

// 编辑功能
export function statusEdit(data) {
    return subjectRequest({
        url: '/subject/edit',
        method: 'post',
        data
    })
}


// 删除表单
export function statusRemove(data) {
    return subjectRequest({
        url: '/subject/remove',
        method: 'post',
        data
    })
}
