

// 获取token 记得return
export function getToken() {

    return window.localStorage.getItem('mmtoken')
}

// 设置token 或者叫 保存token 有一个参数 接收token 
export function setToken(token) {
    window.localStorage.setItem('mmtoken', token)
}

// 删除token
export function removeToken(){
    return window.localStorage.removeItem('mmtoken')
}