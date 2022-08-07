<template>
<div>
  <!-- 리지 : 로그인창 view -->
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

    <!--모달창(임시비밀번호)-->
    <!--<div class="modal_bg" v-if="pk_find_modal == true">
      <div class="pw_find_modalbox">
        <div class="password_represent">
          <span class="jm_modal_title">임시 비밀번호를</span>
          <span class="jm_modal_title">발송하였습니다</span>
          <span class="mail">메일함을 확인해주세요</span>
          <hr />
          <span @click="pk_find_modal = false" class="ok">확인</span>
        </div>
      </div>
    </div>-->

    <!--이메일 없는 경우 모달창 ) API작업후 추가-->
    <div class="modal_bg" v-if="no_email_modal == true">
      <div class="no_email_modalbox">
        <div class= "password_represent">
          <span class="jm_modal_title">등록되지 않은</span>
          <span class="jm_modal_title">이메일입니다</span>
          <hr>
        <span @click="no_email_modal= false" class="ok">확인</span>
        </div>
      </div>
      </div>

    <!--임시 비밀번호 발송 메인창-->

    <header class="home_icon">
      <!--<i @click="home_button" class="material-icons">keyboard_arrow_left</i>-->
      <!-- <img @click="home_button" alt="Vue logo" src="./assets/left-arrow.png" /> -->
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

      <button class="jm_finish-btn" @click="no_email_modal = true">완료</button>
</div>

<!-- 미니 : 회원가입 view-->
  <div v-if="signUp_page==true" id="signUp_page">
    <div class="modal">
      <div class="modal_background check-password_form" v-if="pwformOpen == true">
        <div class="modal_box">
          <h4>비밀번호 형식을 확인해주세요</h4>
          <button @click="check">확인</button>
        </div>
      </div>
      <div class="modal_background check-password" v-if="pwOpen == true">
        <div class="modal_box">
          <h4>비밀번호를 입력해주세요</h4>
          <button @click="check">확인</button>
        </div>
      </div>
      <div class="modal_background check-email_form" v-if="emailformOpen == true">
        <div class="modal_box">
          <h4>이메일 형식을 확인해주세요</h4>
          <button @click="check">확인</button>
        </div>
      </div>
      <!-- api 연동 후 사용할 것 -->
      <!-- <div class="modal_background check-email" v-if="emailOpen == true">
        <div class="modal_box">
          <h4>이미 등록된 이메일입니다</h4>
          <button @click="check">확인</button>
        </div>
      </div> -->
      <div class="modal_background check-nickname" v-if="nickOpen == true">
        <div class="modal_box">
          <h4>닉네임을 입력해주세요</h4>
          <button @click="check">확인</button>
        </div>
      </div>
    </div>

    <div class="content">
      <div id="wrap1">
        <i class="material-icons" @click="togo_login_page">keyboard_arrow_left</i>
        <span @click="togo_login_page">홈으로</span>
      </div>
      <div id="wrap2">
        <h3>Order</h3>
        <ul>
          <li>
            <div class="label-box">
              <span>페이지에 표기될 닉네임을 입력해주세요!</span>
            </div>
            <div class="input-box">
              <input type="text" class="inputText" v-model="nickName" placeholder="닉네임을 입력해주세요!">
            </div>
          </li>
          <li>
            <div class="label-box">
              <span>이메일을 입력해주세요!</span>
            </div>
            <div class="input-box email-input">
              <input type="email" class="inputText" v-model="email" placeholder="이메일을 입력해주세요!">
              <br>
              <!-- <button class="overlap-btn" @click="chkOverlap">중복확인</button>
              <img src="../src/assets/05_check.png" alt="중복확인" v-if="chkEmail == true"> -->
            </div>
          </li>
          <li>
            <div class="label-box">
              <span>아무나 작성할 수 없도록!<br>비밀번호를 입력해주세요</span>
            </div>
            <div class="input-box pw-input">
              <input type="password" class="inputText" id="inputPW" v-model="password" placeholder="비밀번호를 입력해주세요!" @change="chkInput">
              <p :class="[chkPw === false ? 'unchk' : 'chk']">*영문/숫자 포함 6자 이상</p>
            </div>
          </li>
        </ul>
        <p>confirm</p>
        <img id="stamp_img" src="../assets/02_stamp.png" alt="스탬프" v-if="pwformOpen == false && pwOpen == false && emailOpen == false && nickOpen == false">
      </div>
      <div id="wrap3">
        <button class="finish-btn" @click="submit">완료</button>
      </div>
    </div>

  </div>

</div>
</template>
<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      signUp_page: false,
      complete_page: false,
      login_page: true,
      pw_find_page: false,
      pk_find_modal: false,
      no_email_modal: false,

      email: '',
      password : '',
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

    togo_login_page(){
      this.start_page=false;
      this.login_page=true;
      this.signUp_page = false;
    },

    submit (e) {
      e.preventDefault();
      if (this.nickName == ''){
        this.nickOpen = true;
        this.emailformOpen = false;
        // this.emailOpen = false;
        this.pwOpen = false;
        this.pwformOpen = false;
      }
      else if (!this.chkEmailForm.test(this.email)){
        this.emailformOpen = true;
        this.pwOpen = false;
        this.pwformOpen = false;
      }
      // else if (this.chkEmail == false){
      //   this.emailOpen = true;
      //   this.pwOpen = false;
      //   this.pwformOpen = false;
      // }
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

    check () {
      this.nickOpen = false;
      this.pwOpen = false;
      this.emailOpen = false;
      this.pwformOpen = false;
      this.emailformOpen = false;
      this.byeemailOpen = false;
      this.byepwOpen = false;
      this.oldpwOpen = false;
      this.newpwOpen = false;
      this.setting_page = false;
    },

    chkInput () {
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
  width: 100%;
  height: 100%;
  background: rgba(217,217,217,0.7);
  position: fixed;
  top: 0; left: 0; right: 0;
}

.modal-yellow {
  width: 223px;
  height: 110px;
  background: #F4E7B6;
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 16px;
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

/* 미니 */
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
ul, li {list-style: none;}
span {vertical-align: baseline;}

.modal {
  position: relative;
  z-index: 2;
}
.content {
  position: relative;
  z-index: 1;
}

.modal_background {
  width:100%;
  height: 100%;
  background: #00000091;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.modal_background .modal_box {
  width: 210px;
  height: 100px;
  background: #F4E7B6;
  border-radius: 10px;
  padding: 16px;
  margin: auto;
  margin-top: 335px;
}
.modal_background .modal_box h4 {
  padding: 17px 0 27px 0;
  border-bottom: 0.3px solid #000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
}
/* .modal_background.check-email .modal_box h4 {
  padding: 6px 0 18px 0;
  border-bottom: 0.3px solid #000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
} */
.modal_background.check-oldpw .modal_box h4 {
  padding: 10px 0 14px 0;
  border-bottom: 0.3px solid #000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
}
.modal_background .modal_box button {
  padding: 16px 0 0 0;
  border: none;
  background: #F4E7B6;
  color: #920000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
}
#wrap1 {
  text-align: left;
  height: 60px;
  position: relative;
}
#wrap1 .material-icons {
  position: absolute;
  top: 8px;
  /* left: 10px; */
  right: 295px;
  display: inline-block;
  color: #fff;
  font-size: 42px;
  font-weight: 800;
}
#wrap1 span {
  position: absolute;
  top: 16px;
  /* left: 50px; */
  right: 238px;
  display: inline-block;
  color: #fff;
  font-size: 21px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
  padding: 0 0 26px 0;
}

#wrap2 {
  /* text-align: center;
  padding: 10px 0; */
  position: relative;
  width: 290px;
  height: 474px;
  padding: 16px;
  border-radius: 5px;
  background-color: #F4E7B6;
  font-family: 'NanumSquareRound';
}
#wrap2 h3 {
  font-family: 'Sorts Mill Goudy', serif;
  font-weight: 500;
  font-size: 32px;
  border-bottom: 0.3px solid #000;
  padding: 10px;
}

#wrap2 ul {
  padding: 28px 0 0 0;
}
#wrap2 li .label-box span {
  font-weight: 800;
  font-size: 16px;
}
#wrap2 li .input-box {
  position: relative;
  padding: 18px 0 46px 0;
}

/* #wrap2 li .input-box.email-input {
  position: relative;
  padding: 18px 0 28px 0;
} */
#wrap2 li .input-box.pw-input {
  position: relative;
  padding: 18px 0 26px 0;
}
#wrap2 li .input-box .inputText {
  width: 200px;
  height: 25px;
  border: none;
  border-radius: 5px;
}
#wrap2 li .input-box .inputText::placeholder {
  font-family: 'NanumSquareRound';
  text-align: center;
  font-weight: 800;
  color: #d9d9d9;
}
#wrap2 li .input-box .overlap-btn {
  margin: 10px 0 0 0;
  font-family: 'NanumSquareRound';
  border: none;
  border-radius: 6px;
  background: #920000;
  width: 49px;
  height: 24px;
  color: #fff;
  font-size: 8px;
  font-weight: 800;
}
#wrap2 li .input-box img {
  position: absolute;
  color: #920000;
  width: 15px;
  height: 15px;
  top: 57px;
  padding: 0 0 0 12px;
}
#wrap2 li .input-box p {
  font-size: 12px;
  font-weight: 800;
  padding: 13px 0 0 0;
}
#wrap2 li .input-box .chk {

}
#wrap2 li .input-box .unchk {
  color: #920000;
}
#wrap2 > p {
  font-family: 'Sorts Mill Goudy', serif;
  font-weight: 500;
  font-size: 16px;
  color: #000;
  text-align: right;
  padding: 0 35px 0 0;
}
#wrap2 #stamp_img {
  width: 38px;
  position: absolute;
  right: 27px;
  bottom: 7px;
}

#wrap3 {
  text-align: center;
  padding: 16px 0;
}
#wrap3 .finish-btn {
  font-family: 'NanumSquareRound';
  font-size: 16px;
  font-weight: 800;
  background: #fff;
  border: none;
  border-radius: 6px;
  width: 168px;
  height: 42px;
}

#signUp_page {
  /* padding: 25px;
  border-radius: 5px;
  background-color: #F4E7B6; */
}

</style>
