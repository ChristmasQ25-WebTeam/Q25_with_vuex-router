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
      .post('http://localhost:5001/api/members/login', loginObj) // 두번째 인자에 파라메터(body) 값 넣을 수 있음
      .then(res => {
        // 성공 시 토큰(실제로는 user_id값을 받아옴)
        // 토큰을 헤더에 포함시켜서 유저 정보를 요청
        let token = res.data.result;
        let config = {
          headers: {
            'access-token': token
          }
        }
        axios
        .get('http://localhost:5001/api/members/login', loginObj) // header 설정을 위해 config 선언, get 두번째 인자.
        .then(res => {
          // console.log(res.data)
          let userInfo = {
            userIdx : res.data.result.userIdx
          }
          console.log(res.data)
          commit('loginSuccess',userInfo)
          // 엘 -> 로그인 성공 후 메인페이지(질문리스트)에서 불러올 데이터
          axios.get('http://localhost:5001/api/members/question', config)
          .then(res => {
            console.log(res)
          }) 


          router.push({name:'mainpage'})
        })
        .catch(() => {
          commit('loginEmailError')
        })
      })
      .catch(err => {
        commit('loginEmailError')
      })
      
              },
    close({ state, commit }) {
              commit('closeit')
    }
    }
  }
)
