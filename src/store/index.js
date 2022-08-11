import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
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
    // 모달창 닫기
    closeit(state) {
      state.isEmailError = false
      state.isPwError = false
    },
    // 로그아웃
    logout(state) {
      state.isLogin = false
      state.isEmailError = false
      state.isPwError = false
      state.userInfo = null
      state.token = '';
    }
  },
  actions: {
    
    // 로그인 시도
    login({ commit }, loginObj) {
      // 통신1. 로그인 -> 토큰 반환
      axios
      .post('http://localhost:3001/api/members/login', loginObj) // 두번째 인자에 파라메터(body) 값 넣을 수 있음
      .then(res => {
        // 성공 시 토큰(실제로는 user_id값을 받아옴)
        // 토큰을 헤더에 포함시켜서 유저 정보를 요청
        console.log(res.data);
        let token = res.data.result;
        let config = {
          headers: {
            'access-token': token
          }
        }
          axios
          .get('http://localhost:3001/api/members/question', config) // header 설정을 위해 config 선언, get 두번째 인자.
          .then(res => {
            let userInfo = {
            nickName: res.data.data.nickName,
            stampImg: res.data.data.stampImg,
            question: res.data.data.question
          }
          console.log(res)
          commit('loginSuccess',userInfo)
          router.push({name:'mainpage'})
        })
        .catch(() => {
          commit('loginEmailError')
        })
      })
      .catch(err => {
        console.log(err);
        commit('loginEmailError')
      })
    },
    close({ state, commit }) {
      commit('closeit')
    },
    logout({commit}) {
      commit('logout')
      localStorage.removeItem('access_token')
      router.push({name: 'home'})
    }
    }
  }
)