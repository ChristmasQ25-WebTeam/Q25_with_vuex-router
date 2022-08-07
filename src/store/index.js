import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    allUsers: [
      { id: 1, name: 'lizy', email: 'lizy@gmail.com', password: '123456' },
      { id: 2, name: 'lego', email: 'lego@gmail.com', password: '123456' }
    ],
    isLogin: false,
    isEmailError: false,
    isPwError: false
  },
  mutations: {
    // 로그인이 성공했을 때,
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isEmailError = false
      state.isPwError = false
      state.userInfo = payload
    },
    // 이메일 실패했을 때,
    loginEmailError(state) {
      state.isLogin = false
      state.isEmailError = true
      state.isPwError = false
    },
    // 비번 실패했을 때,
    loginPwError(state) {
      state.isLogin = false
      state.isEmailError = false
      state.isPwError = true
    },
    closeit(state) {
      state.isEmailError = false
      state.isPwError = false
    }
  },
  actions: {
    // 로그인 시도
    login({ state, commit }, loginObj) {
    // 전체 유저에서 해당 이메일로 유저를 찾는다.
      let selectedUser = null
      state.allUsers.forEach(user => {
        if (user.email === loginObj.email) selectedUser = user
      })
      if (selectedUser === null)
        commit('loginEmailError')
          else if (selectedUser.password !== loginObj.password)
             commit('loginPwError')
            else{
              commit('loginSuccess', selectedUser)
              router.push({name:'mainpage'})
              
              // qlist페이지(mainpage)로 넘어갈 때 api받아오는 코드 구현 중 -엘 
              // axios.get('http://localhost:3000/members/question').then((response) => settodo(response.data))
              // return console.log('success')
              
            }
    },
    close({ state, commit }) {
      commit('closeit')
    }
  },
  modules: {
  }
})
