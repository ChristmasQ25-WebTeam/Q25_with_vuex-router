import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    allUsers: [
      { id: 1, name: 'lizy', email: 'lizy@gmail.com', password: 'a123456' },
      { id: 2, name: 'lego', email: 'lego@gmail.com', password: 'a123456' }
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
    login({ commit }, loginObj) {
      axios
      .post('https://reqres.in/api/login', loginObj) // 두번째 인자에 파라메터(body) 값 넣을 수 있음
      .then(res => {
        // 성공 시 토큰(실제로는 user_id값을 받아옴)
        // 토큰을 헤더에 포함시켜서 유저 정보를 요청
        let token = res.data.token
        let config = {
          headers: {
            'access-token': token
          }
        }
        axios
        .get('https://reqres.in/api/users/2', config) // header 설정을 위해 config 선언, get 두번째 인자.
        .then(response => {
          let userInfo = {
            id: response.data.data.id,
            first_name: response.data.data.first_name,
            last_name: response.data.data.last_name,
            avatar: response.data.data.avatar,
            
            nickName: response.data.data.nickName
          }
          commit('loginSuccess',userInfo)
          router.push({name:'mainpage'})
        })
        .catch(() => {
          commit('loginEmailError')
        })
      })
      .catch(err => {
        commit('loginEmailError')
      })
      // let selectedUser = null
      // state.allUsers.forEach(user => {
      //   if (user.email === loginObj.email) selectedUser = user
      // })
      // if (selectedUser === null)
      //   commit('loginEmailError')
      //     else if (selectedUser.password !== loginObj.password)
      //        commit('loginPwError')
      //       else{
      //         commit('loginSuccess', selectedUser)
      //         router.push({name:'mainpage'})
              // qlist페이지(mainpage)로 넘어갈 때 api받아오는 코드 구현 중 -엘 
              // axios.get('http://localhost:3000/members/question').then((response) => settodo(response.data))
              // return console.log('success')
              },
    close({ state, commit }) {
              commit('closeit')
    }
    }
  }
)
