// 登录页
import axios from 'axios'

export function login(data){
    return axios({
        url:process.env.VUE_APP_URL+'/login',
        method:'post',
        data,
        // 带token
        withCredentials:true
    })
}   