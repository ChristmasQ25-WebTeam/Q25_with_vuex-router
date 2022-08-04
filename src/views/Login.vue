<template>
<div>
  <div v-if="login_page==true">
    <!-- 로그인 실패 모달창 페이지 -->
      <div class="container">
        <div v-if="isEmailError">
            <div class="modal-black">
              <div class="modal-yellow">
                <h4>등록되지 않은 이메일입니다</h4>
                <button @click="close">확인</button>
              </div>
            </div>
        </div>
        <div v-if="isPwError">
            <div class="modal-black">
              <div class="modal-yellow">
                <h4>잘못된 비밀번호입니다</h4>
                <button @click="close">확인</button>
              </div>
            </div>
        </div>
        <!-- <div v-if="isLogin">
          <div class="modal-black">
            <div class="modal-yellow">
              <h4>로그인이 완료되었습니다</h4>
              <button @click="close">확인</button>
            </div>
          </div>
        </div> -->
        <div id="title">Christmas Q25</div>
        <div class="subtitle">- 당신의 1년을 정리하는 25개의 질문 -</div>
        <div><img id="logo_2" src="../assets/01_wreath.png"></div>
        <div style="color: white; text-align: center;">
          <div id="welcomeWord">어서오세요<br>
          메리크리스마스 :)</div>
        </div>
        <!-- <form action="" method="post"> -->
          <div>
            <input type="email" placeholder="이메일을 입력해주세요" v-model="email" class="inputBox" name="userEmail" required>
          </div>
          <div>
            <input type="password" placeholder="비밀번호를 입력해주세요" v-model="password" class="inputBox" name="userPw" required>
          </div>
          <div><button @click="login({email, password})" id="loginBtn">로그인</button></div>
        <!-- </form> -->

          <div class="inlineBtn">
            <button type="button" @click="signUpBtnOn" id="signupBtn">회원가입</button>
            <span style="color: white;">|</span>
            <button type="button" @click="pwBtnOn" id="pwfindBtn">비밀번호 찾기</button>
          </div>
          <div id="teamname">teamname</div>
    </div>
  </div>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      email: null,
      password : null,

      login_page: true,
      signUp_page: false,
      pw_find_page: false
    }
  },
  computed: {
    ...mapState(['isLogin', 'isEmailError', 'isPwError'])
  },
  methods: {
    ...mapActions(['login','close']),

    signUpBtnOn(){
      this.login_page=false;
      this.signUp_page=true;
    },

    signUpBtnOff(){
      this.signUp_page=false;
    },

    submit(e){
      e.preventDefault();
      if (this.nickName == ''){
        this.nickOpen = true;
        this.emailOpen = false;
        this.pwOpen = false;
        this.pwformOpen = false;
      }
      else if (this.chkEmail == false){
        this.emailOpen = true;
        this.pwOpen = false;
        this.pwformOpen = false;
      }
      else if (this.password == ''){
        this.pwOpen = true;
        this.pwformOpen = false;
      }
      else if (this.chkPw == false){
        this.pwformOpen = true;
      }
      else {
        this.login_page=true;
        this.signUp_page=false;
      }
    },

    check(){
      this.nickOpen = false;
      this.pwOpen = false;
      this.emailOpen = false;
      this.pwformOpen = false;
      },

      chkInput(){
      if (this.password.length < 6){
        this.chkPw = false;
      }
      if(!this.chkNum.test(this.password)){
        this.chkPw = false;
      }
      if(!this.chkEng.test(this.password)){
        this.chkPw = false;
      }
      if(this.password.length > 5 && this.chkNum.test(this.password) && this.chkEng.test(this.password))
        this.chkPw = true;
    },
    
    chkOverlap(){
      this.chkEmail = true;
    },

    pwBtnOn(){
      this.login_page=false;
      this.pw_find_page=true;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy&display=swap');
@font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@import url(//fonts.googleapis.com/earlyaccess/nanummyeongjo.css);

#app {
  margin-top: 20px;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  display: flex;
  flex-direction: column;
  align-items:  center;
  /* justify-content: center; */
  background-color: #920000;
  border-radius: 5px;
  padding: 20px;
  padding-top: 70px;
  width: 360px;
  height: 640px;
}
* {
  margin: 0;
  padding: 0;
  /* box-sizing: border-box; */
}
body {
  margin: 0;
  display: flex;
  background-color: #920000;
  align-items:  center;
  justify-content: center;
} 

/* 리지 */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #920000;
    width: 360px; height: 640px;
    margin: 0 auto;
}

body {
    font-family: 'NanumSquareRound';
}

#title {
    color: #FFF500;
    font-family: 'Sorts Mill Goudy', serif;
    font-size: 50px;
}

.subtitle {
    color: white;
    font-family: 'NanumSquareRound';
    font-size: 16px;
}

.btn {
    margin: 7px;
    background-color: white;
    border: none;
    border-radius: 6px;
    width: 170px; height: 42px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    font-family: 'NanumSquareRound';
}

#teamname {
  color: white;
  /* teamname을 맨 아래 고정시키는건 위에 있는 요소에 margin bottom 해서 하기. teamname에 마진탑 주면 로그인페이지에서 teamname이 아래로 밀림 */
}

/* 가입후 시작 view css */
.inputBox {
    width: 200px; height: 41px;
    border-radius: 5px;
    border: none;
    margin: 5px;
    text-align: center;
    margin-bottom: 13px;
}

#loginBtn {
    background-color: white;
    border: none;
    border-radius: 6px;
    width: 110px; height: 42px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    font-family: 'NanumSquareRound';
    margin: 8px 0 20px 0;
}

.inlineBtn {
  display: inline-block;
  margin-bottom: 20px;
}

#signupBtn, #pwfindBtn {
  border: none;
  color: white;
  background-color: transparent;
  font-size: 16px;
  font-family: 'NanumSquareRound';
  cursor: pointer;
}

#signupBtn {
  margin-right: 10px;
}

#pwfindBtn {
  margin-left: 10px;
}

#logo_2 {
    width: 133px;
    height: 133px;
    display: block;
    margin: 0 auto;
    margin-top: 25px;
    margin-bottom: 22px;
}

#welcomeWord {
  margin-bottom: 24px;
}

.modal-black {
  width: 400px;
  height: 660px;
  background: rgba(217,217,217,0.7);
  position: fixed;
  right: 650px;
  bottom: 50px;
}

.modal-yellow {
  width: 223px;
  height: 110px;
  background: #F4E7B6;
  border-radius: 10px;
  padding: 16px;
  margin: 246px 68px;
}

.modal-yellow button {
  padding: 16px 0 0 0;
  border: none;
  background: #F4E7B6;
  color: #920000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
  cursor: pointer;
}

.modal-yellow h4 {
  padding: 20px 0 30px 0;
  border-bottom: 0.3px solid #000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
}
</style>
