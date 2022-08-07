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

<!-- 자몽 : 비번찾기 view -->
  <div v-if="pw_find_page == true">

<!--이메일이 있는 경우 모달창 -->
    <div class="modal_bg" v-if="isEmail">
      <div class="pw_find_modalbox">
        <div class="password_represent">
          <span class="jm_modal_title">임시 비밀번호를</span>
          <span class="jm_modal_title">발송하였습니다</span>
          <span class="mail">메일함을 확인해주세요</span>
          <hr />
          <span @click="close" class="ok">확인</span>
        </div>
      </div>
    </div>

    <!--이메일 없는 경우 모달창 -->
    <div class="modal_bg" v-if="isEmailError">
      <div class="no_email_modalbox">
        <div class= "password_represent">
          <span class="jm_modal_title">등록되지 않은</span>
          <span class="jm_modal_title">이메일입니다</span>
          <hr>
        <span @click="close" class="ok">확인</span>
        </div>
      </div>
      </div>

    <!--임시 비밀번호 발송 메인창-->

    <header class="home_icon">
      <i class="material-icons" @click="pwToHomeBtn">keyboard_arrow_left</i>
      <span class="back">홈으로</span>
    </header>

    <div class="key_icon">
      <img alt="Vue logo" src="../assets/04_key.png" />
    </div>

    <div class="password_guide">
      <div class="info1">이메일을 입력해주세요!</div>
      <div class="info1">임시 비밀번호가 발송됩니다.</div>
    </div>

    <div>
      <input
        type="email"
        placeholder="이메일을 입력해주세요"
        v-model="email"
        id="email_inputBox2"
        name="userEmail"
        required
      />
    </div>

      <button class="jm_finish-btn" @click="login({email})">완료</button>
</div>


</div>
</template>
<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return  {
      email: null,
      password : null,
      login_page: true,
      signUp_page: false,
      pw_find_page: false,
      pk_find_modal: false,
      no_email_modal: false,

      email: null,
      password : null,
      nickName: '',
      질문데이터: '부여된 랜덤 질문 리스트 데이터',
      ClickButton: false,
      nickOpen: false,
      pwOpen: false,
      chkPw: true,
      chkNum: /[0-9]/,
      chkEng: /[a-zA-Z]/,
      chkEmailForm: /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      chkEmail: false,
      emailOpen: false,
      pwformOpen: false,
      emailformOpen: false

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
    pwToHomeBtn(){
      this.pw_find_page=false;
      this.login_page=true;
    },

    submit (e) {
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


/* 자몽 - 임시 비밀번호 찾기 css */
header {
  display: flex;
  justify-content: flex-start;
  padding: 10px 0px 0px 0px;
}

.home_icon .material-icons {
  color: #fff;
  font-size: 42px;
  font-weight: 800;
}

/* .home_icon img {
  width: 20px;
  padding-right: 15px;
} */

.home_icon .back {
  color: white;
  padding-top: 8px;
  padding-right: 260px;
  font-size: 20px;
  font-family: "NanumSquareRound";
  font-weight: 800;
}

#email_inputBox2 {
  width: 220px;
  height: 25px;
  border-radius: 5px;
  border: none;
  margin: 5px;
  text-align: center;
  margin-top: 50px;
}

.key_icon img {
  padding-top: 100px;
  width: 120px;
}
.password_guide {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  font-size: 18px;
  color: white;
}

.jm_finish-btn {
  font-family: "NanumSquareRound";
  font-size: 16px;
  font-weight: 800;
  background: #fff;
  border: none;
  border-radius: 6px;
  width: 168px;
  height: 42px;
  margin-top: 100px;
}

/*임시 비밀번호 찾기 - 모달창 css*/

.modal_bg {
  width:100%;
  height: 100%;
  background: rgba(79, 79, 79, 0.7);
  position: fixed;
  right: 275px;
  bottom: 10;
  left: 0;
  right: 0;
  top: 0;
  margin: auto;
}


.no_email_modalbox{
    position: fixed;
    top: -140px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background:#F4E7B6;
    border-radius: 8px;
    width: 260px;
    height: 140px;
}

/*.pw_find_modalbox {
  position: fixed;
  top: -140px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background: #f4e7b6;
  border-radius: 8px;
  width: 260px;
  height: 170px;
}*/
.modal_bg .password_represent {
  display: flex;
  flex-direction: column;
  padding: 15px;
}
.modal_bg .password_represent .jm_modal_title {
  font-family: "NanumSquareRound";
  color: black;
  font-size: 18px;
  font-weight: bold;
}
.modal_bg .password_represent .mail {
  font-family: "NanumSquareRound";
  color: black;
  font-size: 15px;
  font-weight: 1000;
  margin-top: 10px;
}
.modal_bg hr {
  background-color: rgb(57, 56, 56);
  border: 0;
  height: 0.8px;
  margin-top: 10px;
}

.modal_bg .password_represent .ok {
  font-size: 13px;
  font-weight: bold;
  color: #920000;
  margin-top: 30px;
}

</style>
