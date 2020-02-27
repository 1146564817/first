import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

const store = new Vuex.Store({
    // vuex数据属性
    state: {
        username: '',
        avatar: ''
    },
    // 操作vue的方法
    mutations: {
        quUsername(state, val) {
            state.username = val
        },

        quAvatar(state, val) {
            state.avatar = val
        }
    }
})


// 需要暴露出去
export default store