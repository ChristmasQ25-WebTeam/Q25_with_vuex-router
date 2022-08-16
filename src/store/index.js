import axios from 'axios'
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    isLogin: false,
    isError: false,
    isLoading: false
  },
  mutations: {
    // 로그인이 성공했을 때,
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isError = false
      state.userInfo = payload
      
    },
    // 이메일 또는 비번 실패했을 때,
    loginError(state) {
      state.isLogin = false
      state.isError = true
    },
    // 모달창 닫기
    closeit(state) {
      state.isError = false
    },
    // 로그아웃
    logout(state) {
      state.isLogin = false
      state.isError = false
      state.userInfo = null
      state.token = '';
      localStorage.removeItem('login.accessToken')
      
      axios
      .delete('http://localhost:3001/api/members/logout')
    },
    saveStateToStorage(state) {
      localStorage.setItem('login.accessToken',state.token)
    },
    readStateFromStorage(state) {
      if (localStorage.getItem('login.accessToken') != null) {
        state.token = localStorage.getItem('login.accessToken')
      }
    },
    loadingOn(state) {
      state.isLoading = true
    },
    loadingOff(state) {
      state.isLoading = false
    }
  },
  actions: {
    
    // 로그인 시도
    login({ commit }, loginObj) {
      // 통신1. 로그인 -> 토큰 반환
      commit('loadingOn')
      axios
      .post('http://localhost:3001/api/members/login', loginObj) // 두번째 인자에 파라메터(body) 값 넣을 수 있음
      .then(res => {
        // 성공 시 토큰(실제로는 user_id값을 받아옴)
        // 토큰을 헤더에 포함시켜서 유저 정보를 요청
        console.log(res.data)
        let token = res.data.result.AT
        let userIdx = res.data.result.userIdx
        let config = {
          headers: {
            'access-token': token
          },
          params: {userIdx : userIdx}
        }
          axios
          .get('http://localhost:3001/api/members/question', config) // header 설정을 위해 config 선언, get 두번째 인자.
          .then(res => {
            let userInfo = {
            nickName: res.data.result.nickName,
            stampImg: res.data.result.stampImg,
            question: res.data.result.question
          }
          console.log(res)
          commit('loginSuccess',userInfo)
          commit('saveStateToStorage')
          commit('loadingOff')  
          router.push({name:'mainpage', params:{userIdx: userIdx}})
        }) 
        .catch(err => {
          console.log(err)
          commit('loadingOff')
          commit('loginError')
        })
      })
      .catch(err => {
        console.log(err)
        commit('loadingOff')
        commit('loginError')
      })
    },
    close({ state, commit }) {
      commit('closeit')
    },
    logout({commit}) {
      commit('logout')
      localStorage.removeItem('access_token')
      router.push({name: 'home'})
    },
    doReadStateFromStorage({commit}) {
      commit('readStateFromStorage')
    }
    }
  }
)