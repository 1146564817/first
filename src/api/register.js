// 注册页
import axios from "axios";

// 外面要接收调用  就需要将里面的代码暴露出去
// 手机验证码 请求
export function regApi(data){
    // 返回值
    return axios({
        url:process.env.VUE_APP_URL+'/sendsms',
        method:'post',
        data,
        // 在vue中 跨域请求 中默认不会带cookie值  
        withCredentials:true
    })
}
// 头像上传请求
export function upimgApi(data){
    return axios({
        url:process.env.VUE_APP_URL+'/uploads',
        method:'post',
        data,
        withCredentials:true,
    })
}
