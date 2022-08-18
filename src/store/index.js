import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  /* eslint-disable */
  state: {
    userInfo: null,
    isLogin: false,
    isError: false,
    isLoading: false,
    isEmail:false,
    isEmailError:false,
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
    },

     //비밀번호 찾기 (이메일 존재)
     isPwEmail(state){
      state.isEmail=true,
      state.isEmailError=false
    },
    
    //비밀번호 찾기 (이메일 존재X)
    noPwEmail(state){
      state.isEmail=false,
      state.isEmailError=true
    },

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
            question: res.data.result.question,
            userIdx : userIdx
          }
          console.log(res)
          let stampNumList=[];

          for (let i=0; i<25; i++){
            if(userInfo.question[i].answerY_N==1){
              stampNumList.push(userInfo.question[i].qNum)
            }
          }
          console.log('스탬프 붙일 상자번호 : '+ stampNumList+'/근데 이 리스트를 mainpage.vue로 옮겨야하는데 아직 못함')
          commit('loginSuccess',userInfo)
          commit('saveStateToStorage')
          commit('loadingOff')
          router.push({name:'mainpage', config})
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
      // localStorage.removeItem('access_token')
      router.push({name: 'home'})

      axios
      .delete('http://localhost:3001/api/members/logout')
      .then(response => {
        // handle success
        console.log(response);
    })
    .catch(error => {
        // handle error
        console.log(error);
    })
    .then(() => {
        // always executed
    });
  
    },
    doReadStateFromStorage({commit}) {
      commit('readStateFromStorage')
    }
    }
  }
)

  //비밀번호 찾기 
  //유효한 이메일 검사 (필요할지?) 
  /*emailValidation = (key) => (e) => {
    if (key === 'email') {
      let emailreg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      let email = e.target.value;
      if (email.length > 0 && false === emailreg.test(email)) {
        console.log('올바른 이메일 형식이 아닙니다')
      }else
  */ 
axios({
method: 'post',
url: 'http://localhost:3001/api/members/pw',
data: {
 email
},
})
//DB에 동일 데이터가 존재한다면 (이메일을 보내는 경우)
.then((res) => {
  //status code: 1000
  if (res.data !== null) { //DB의 데이터가 담겨서 오는 것은 res.data?
    console.log(res);
    commit('isPwEmail')
  } 
})
//이메일이 없는 경우
.catch((err) => {
  //status code: 2015
  console.log(err);
  commit('NoPwEmail')
})