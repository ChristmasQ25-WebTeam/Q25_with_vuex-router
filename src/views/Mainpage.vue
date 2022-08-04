<template>
<div>
<!-- 답변 모아보기 view -->
  <div v-if="Q_gather_page==true">
      <button @click="togo_Qlist_page" id="backBtn">&lt;</button>
      <br><br>
      <div class="title">
          <div><span class="userName">{{ userInfo.name }}</span>'s</div>
          <div>Christmas Q25</div>
          <p>- 당신의 1년을 정리하는 25개의 질문 -</p>
          <div id="title_line"></div>
      </div>

    <div id="contentsBox">
      <div v-for="(question,i) in questionList" :key="question">
        <div class="questionBox">
          <div class="questionBox_line">
            <div class="questions">
            <span id="Q_inquestion">Q{{i+1}}. &nbsp;</span>
            <span>{{question}}</span><br>
            <span id="Q_inquestion">A. &nbsp;</span>
            </div>
            <img src="../assets/02_stamp.png" id="stampimg2">
          </div>
        </div>
      </div>
    </div>
      <div>
        <span><img src="../assets/07_download.png" id="downloadIcon"></span>
      </div>
  </div>

<!-- 자몽: 질문 답변하기 디자인 view -->
<!--글 발행기능 아직 구현 X => 공부필요-->
  <div v-if="qna_request_page==true">

<div class ="qna_requset_header">
 <!-- <i  class="material-icons">keyboard_arrow_left</i>-->
  <span class="request_day_number">{{question_25_content[gift_select].question_day}}</span>
</div>

<div class="qna_request_header_hr">
<hr>
</div>

<div class="request_img_icon">
<img src="../assets/08_question_pic01.png" alt="">
</div>

<div class="request_question">
  <span class = "question_number">{{question_25_content[gift_select].question_num}}</span>
  <span class = "question_contents">{{question_25_content[gift_select].question}}</span>
</div>

<!--답변창 180글자까지만 작성 가능  -->
<form id= "request_textarea" action="" method="POST">
<textarea v-model="qna_request" cols="40" rows="10"  placeholder="행복했던 순간을 떠올려보세요:)" maxlength="180"></textarea>
<br/>
<span id="counter">({{qna_request.length}}자 / 최대 180자)</span>
</form>

<div class="requset_share">
  <span class ="text">이미지 공유하기</span>
  <img src="../assets/07_download.png" alt="">
</div>

<div id="jm_button">
<button class="jm_finish-btn2" @click="submit">완료</button>
</div>
  </div>

  <!-- 미니 : 비번변경 view -->
  <div v-if="changePw_page==true" id="changePw_page">
    <div class="modal">
      <div class="modal_background" v-if="newpwOpen == true">
        <div class="modal_box">
          <h4>비밀번호 형식을 확인해주세요</h4>
          <button @click="check">확인</button>
        </div>
      </div>
      <div class="modal_background check-oldpw" v-if="oldpwOpen == true">
        <div class="modal_box">
          <h4>기존 비밀번호가<br>일치하지 않습니다</h4>
          <button @click="check">확인</button>
        </div>
      </div>
      <div class="modal_background" v-if="changepwOpen == true">
        <div class="modal_box">
          <h4>비밀번호가 변경되었습니다</h4>
          <button @click="togo_Qlist_page">확인</button>
        </div>
      </div>
    </div>
    <div class="content">
      <div id="wrap1">
        <i class="material-icons" @click="togo_setting_page">keyboard_arrow_left</i>
      </div>
      <div id="wrap2">
        <h3>Change</h3>
        <img id="changePw_img" src="../assets/04_key.png" alt="비번변경">
        <ul>
          <li>
            <div class="label-box">
              <span>기존의 비밀번호를 입력해주세요!</span>
            </div>
            <div class="input-box">
              <input type="password" class="inputText" v-model="old_pw" placeholder="기존 비밀번호를 입력해주세요!">
            </div>
          </li>
          <li>
            <div class="label-box">
              <span>새 비밀번호를 입력해주세요!</span>
            </div>
            <div class="input-box newPw-input">
              <input type="password" class="inputText" v-model="new_pw" placeholder="새 비밀번호를 입력해주세요!" @change="chkInput_new">
              <p :class="[chknewPw === false ? 'unchk' : 'chk']">*영문/숫자 포함 6자 이상</p>
            </div>
          </li>
        </ul>
        <p>confirm</p>
        <img id="stamp_img" src="../assets/02_stamp.png" alt="스탬프">
      </div>
      <div id="wrap3">
        <button class="finish-btn" @click="changepw_submit">완료</button>
      </div>
    </div>
  </div>

  <!-- 미니 : 회원탈퇴 view -->
  <div v-if="goodbye_page==true" id="goodbye_page">
    <div class="modal">
      <div class="modal_background" v-if="byeemailOpen == true">
        <div class="modal_box">
          <h4>이메일이 일치하지 않습니다</h4>
          <button @click="check">확인</button>
        </div>
      </div>
      <div class="modal_background" v-if="byepwOpen == true">
        <div class="modal_box">
          <h4>잘못된 비밀번호입니다</h4>
          <button @click="check">확인</button>
        </div>
      </div>
    </div>
    <div class="content">
      <div id="wrap1">
        <i class="material-icons" @click="togo_setting_page">keyboard_arrow_left</i>
      </div>
      <div id="wrap2">
        <h3>Bye, Bye</h3>
        <img id="goodbye_img" src="../assets/10_goodbye.png" alt="회원탈퇴">
        <ul>
          <li>
            <div class="label-box">
              <span>이메일을 입력해주세요!</span>
            </div>
            <div class="input-box">
              <input type="email" class="inputText" v-model="bye_email" placeholder="이메일을 입력해주세요!">
            </div>
          </li>
          <li>
            <div class="label-box">
              <span>비밀번호를 입력해주세요!</span>
            </div>
            <div class="input-box">
              <input type="password" class="inputText" v-model="bye_pw" placeholder="비밀번호를 입력해주세요!">
            </div>
          </li>
          <li>
            <div class="label-box">
              <span>비밀번호를 다시 한 번 입력해주세요!</span>
            </div>
            <div class="input-box repw-input">
              <input type="password" class="inputText" v-model="bye_repw" placeholder="비밀번호를 입력해주세요!" @change="chkRePw">
              <img src="../assets/05_check.png" alt="중복확인" v-if="RePw == true">
            </div>
          </li>
        </ul>
        <p>confirm</p>
        <img id="stamp_img" src="../assets/02_stamp.png" alt="스탬프">
      </div>
      <div id="wrap3">
        <button class="finish-btn" @click="bye_submit">완료</button>
      </div>
    </div>
  </div>
  <div v-if="goodbye_finish_page==true" id="goodbye_finish_page">
    <div class="title">Christmas Q25</div>
    <div class="subtitle">- 당신의 1년을 정리하는 25개의 질문 -</div>
    <img src="../assets/01_wreath.png">
    <span>탈퇴가 완료되었습니다<br>이용해주셔서 감사했어요 :)<br>행복한 연말 보내세요!</span>
    <button class="togo_home" @click="togo_home">홈으로</button>
    <div class="teamname">teamname</div>
  </div>

  <!-- 미니 : 설정 view -->
  <div v-if="setting_page==true" id="setting_page">
    <div class="modal">
      <div class="modal_background">
        <div class="modal_box">
          <h4 class="changepw-btn" @click="togo_changePw_page">비밀번호 변경</h4>
          <h4 class="goodbye-btn" @click="togo_goodbye_page">회원 탈퇴</h4>
          <button @click="check">닫기</button>
        </div>
      </div>
    </div>
  </div> 

 </div>
</template>

<script>
/* eslint-disable */
import question_25 from '../assets/question_25.js';
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['userInfo'])
    },
    data() {
        return{
            Q_list_page : false,
            Q_gather_page : false,
            qna_request_page:true,
            start_page : true,
            introduction_page : false,
            pw_find_page : false,
            signUp_page : false,
            complete_page : false,
            login_page : false,
            goodbye_page : false,
            goodbye_finish_page : false,
            changePw_page : false,
            setting_page : false,
            qna_request_page:false,
            qna_request:[],
            question_25_content:question_25,
            gift_select:0,

            questionList: [
            '한 해 동안 가장 잘했다고 생각되는 결정 3가지',
            '올해 읽었던 책이나 본 영화, 공연 중 가장 인상깊었던 것과 그 이유는?',
            '내년의 목표는 무엇이고 내년의 나는 어떤 사람이 되면 좋을까요?',
            '올해의 장소를 꼽아본다면, 어디로 꼽고 싶나요?',
            '이번 크리스마스에 하고 싶은 일이 있다면 무엇인가요? 어떤 하루가 되길 바라나요?',
            '이번년도에 있었던 가장 행복한 일은 무엇인가요?',
            '올해 나에게 가장 영향을 많이 끼친 사람이 있다면 누구인가요? 그 이유는?',
            '이번년도에 깨달은 교훈이 있나요?',
            '올해 가장 힘이 되었던 노래는 무엇인가요?',
            '올해를 떠올려보았을 때 생각나는 감정은 무엇인가요? 그 이유는 무엇인가요?',
            '올해 새롭게 관심을 가지게 된 것이 있나요?',
            '나와 함께해준 사람(들)에게 전하지 못한 말이 있다면?',
            '스스로에게 가장 성장통을 많이 준 올해의 경험이 있다면?',
            '1년중 가장 인상깊었던 사건이 있다면 무엇인가요?',
            '올해 가장 많이 성장한 부분은 무엇인가요?'
            ],
            email : '',
            nickName : '',
            질문데이터 : '부여된 랜덤 질문 리스트 데이터',
            ClickButton : false,
            nickOpen: false,
            password: '',
            pwOpen: false,
            chkPw: true,
            chkNum: /[0-9]/,
            chkEng: /[a-zA-Z]/,
            chkEmailForm: /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            chkEmail: false,
            emailOpen: false,
            pwformOpen: false,
            RePw: false,
            bye_email: '',
            bye_pw:'',
            bye_repw:'',
            byeemailOpen: false,
            byepwOpen: false,
            old_pw: '',
            new_pw: '',
            newpwOpen: false,
            oldpwOpen: false,
            changepwOpen: false,
            emailformOpen: false,
            chknewPw: true,
        }
    },
    methods: {
    togo_answerGrouping_page(){
      this.Q_list_page=false;
      this.Q_gather_page=true;
    },
    togo_Qlist_page(){
      this.Q_list_page=true;
      this.Q_gather_page=false;
    },
    introBtnOn() {
      this.start_page=false;
      this.introduction_page=true;
    },
    introBtnOff(){
      this.start_page=true;
      this.introduction_page=false;
    },
    signUpBtnOn(){
      this.login_page=false;
      this.signUp_page=true;
    },
    // 닫기버튼이 아직 없어서 적용못함
    signUpBtnOff(){
      this.signUp_page=false;
    },
    pwBtnOn(){
      this.login_page=false;
      this.pw_find_page=true;
      this.Q_list_page = false;
    },
    togo_login_page(){
      this.start_page=false;
      this.login_page=true;
      this.signUp_page = false;
    },
    togo_home(){
      this.goodbye_finish_page = false;
      this.start_page = true;
      this.pw_find_page = false;
    },
    togo_changePw_page(){
      this.Q_list_page = false;
      this.setting_page = false;
      this.changePw_page = true;
    },
    togo_goodbye_page(){
      this.Q_list_page = false;
      this.setting_page = false;
      this.goodbye_page = true;
    },
    togo_setting_page(){
      this.Q_list_page = true;
      this.setting_page = true;
      this.changePw_page = false;
      this.goodbye_page = false;
    },

    home_button(){
      this.pw_find_page=false;
      this.login_page=true;
    },

    random_Q(){
      console.log(this.nickName)
    },

    
    bye_submit(e){
      e.preventDefault();
      // api 받아와서 수정해야함
      if(this.bye_email == ''){
        this.byeemailOpen = true;
        this.byepwOpen = false;
      }
      else if(this.bye_pw == ''){
        this.byepwOpen = true;
      }
      else if(this.bye_email !== '' && this.bye_pw !== '' && this.bye_repw !== ''){
        this.goodbye_page = false;
        this.goodbye_finish_page = true;
      }
    },
    changepw_submit(e){
      e.preventDefault();
      if(this.chknewPw == false){
        this.newpwOpen = true;
        this.oldpwOpen = false;
        this.changepwOpen = false;
      }
      // api 받아와서 수정해야함
      else if(this.old_pw == ''){
        this.oldpwOpen = true;
        this.changepwOpen = false;
      }
      else if(this.chknewPw == true && this.old_pw !== ''){
        this.changepwOpen = true;
      }
    },
    check(){
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
    chkInput_new(){
      if (this.new_pw.length < 6){
        this.chknewPw = false;
      }
      if(!this.chkNum.test(this.new_pw)){
        this.chknewPw = false;
      }
      if(!this.chkEng.test(this.new_pw)){
        this.chknewPw = false;
      }
      if(this.new_pw.length > 5 && this.chkNum.test(this.new_pw) && this.chkEng.test(this.new_pw))
        this.chknewPw = true;
    },
    chkOverlap(){
      this.chkEmail = true;
    },
    chkRePw(){
      if(this.bye_pw == this.bye_repw){
        this.RePw = true;
      }
      else{
        this.RePw = false;
      }
    },


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

/* 답변 모아보기view css */
#contentsBox {
  width: 360px;
  height: 440px;
  overflow: auto;
}

#backBtn {
  background-color: #920000;
  color: white;
  border: none;
  font-family: 'NanumSquareRound';
  font-size: 43px;
  font-weight: bold;
  cursor: pointer;
  float: left;
  display: block;
  line-height: 60%;
}

.questionBox {
  width: 300px;
  height: 145px;
  background-color: #F4E7B6;
  border-radius: 5px;
  font-family: 'NanumSquareRound';
  font-size: 14px;
  padding: 5px;
  display: inline-block;
  text-align: justify;
  margin: 5px;
}

.questionBox_line {
  width: 290px;
  height: 135px;
  border: 3px solid #920000;
  border-radius: 10px;
  background-color: #F4E7B6;
  margin: 0 auto;
  margin-top: 2px;
  position: fixed;
  position: sticky;
}

.questions {
  margin: 15px;
  font-weight: bold;
}

#Q_inquestion {
  color: #920000;
  font-family: 'Sorts Mill Goudy', serif;
}

#stampimg2 {
  width: 53px;
  height: 59px;
  float: right;
}

::-webkit-scrollbar {
display: none;
}

#downloadIcon {
  width: 25px;
  height: 25px;
  margin: 20px 30px 30px 30px;
  cursor: pointer;
  float: right;
}


/* 자몽 - 질문 답변하기 css */

.qna_requset_header{
  display: flex;
  align-content: center;
  justify-content:space-evenly;
  padding-right:145px;
}

.qna_requset_header .material-icons {
  color: #fff;
  font-size: 42px;
  font-weight: 800;
}
.qna_request_header_hr hr {
  background-color: rgb(215, 213, 213);
  border: 0;
  height: 0.8px;
  margin-top: 10px;
  width:120px;
  margin-left : auto;
  margin-right : auto;
}

.qna_requset_header .request_day_number{
  padding-left:90px;

}

.request_img_icon img{
  width: 170px;
  height: 170px;
  padding-top: 20px;
}

.request_day_number {
  font-size: 30px;
  color: #FFFFFF;
  font-family: "NanumSquareRound";
  font-weight: 800
}

.question_number{
  padding: 6px;
}

.question_contents{
  margin-left : auto;
  margin-right : auto;
  }
.request_question{
  display: flex;
  flex-direction: column;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 18px;
}

textarea:focus {outline: none;}
textarea::placeholder {
	color: #ccc;
  padding: 20px 5px;
}

#request_textarea{
  margin-top: 30px;
}

#request_textarea textarea{
  width:270px;
  height: 160px;
  border-radius: 2%;
  border: none;
  resize: none;
}
#request_textarea #counter{
color:rgb(153, 151, 151);
font-size: 11px;
padding-left:180px;
}

.jm_finish-btn2{
  font-family: "NanumSquareRound";
  font-size: 16px;
  font-weight: 800;
  background: #fff;
  border: none;
  border-radius: 6px;
  width: 120px;
  height: 42px;
  margin-top: 40px;
}

.requset_share{
  font-family: "NanumSquareRound";
  display: flex;
  justify-content: center;
  color: #fff;
  padding:3px 0px 0px 130px ;

}
.requset_share img{
  width: 20px;
  height:20px;
  padding-left: 15px;
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
  width: 360px;
  height: 640px;
  background: rgba(217,217,217,0.7);
  position: absolute;
  left: -19px;
}
#setting_page .modal_background {
  width: 360px;
  height: 640px;
  background: rgba(217,217,217,0.7);
  position: absolute;
  left: -180px;
}
.modal_background .modal_box {
  width: 210px;
  height: 100px;
  background: #F4E7B6;
  border-radius: 10px;
  padding: 16px;
  margin: 246px 59px;
}
#setting_page .modal_background .modal_box {
  width: 210px;
  height: 110px;
  background: #F4E7B6;
  border-radius: 10px;
  padding: 16px;
  margin: 62px 0 0 100px;
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
#setting_page .modal_background .modal_box .changepw-btn {
  padding: 4px 0 12px 0;
  border-bottom: 0.3px solid #000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
}
#setting_page .modal_background .modal_box h4 {
  padding: 12px 0;
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
#setting_page .modal_background .modal_box button {
  padding: 12px 0 0 0;
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
#goodbye_page #wrap2 h3 {
  font-family: 'Sorts Mill Goudy', serif;
  font-weight: 500;
  font-size: 32px;
  border-bottom: 0.3px solid #000;
  padding: 6px;
}
#wrap2 #changePw_img {
  width: 84px;
  padding: 38px 0 0 0;
}
#wrap2 #goodbye_img {
  width: 105px;
  padding: 12px 0 0 0;
}
#wrap2 ul {
  padding: 28px 0 0 0;
}
#changePw_page #wrap2 ul {
  padding: 38px 0 0 0;
}
#goodbye_page #wrap2 ul {
  padding: 8px 0 0 0;
}
#wrap2 li {

}
#wrap2 li .label-box {

}
#wrap2 li .label-box span {
  font-weight: 800;
  font-size: 16px;
}
#wrap2 li .input-box {
  position: relative;
  padding: 18px 0 46px 0;
}
#goodbye_page #wrap2 li .input-box {
  position: relative;
  padding: 18px 0 28px 0;
}
/* #wrap2 li .input-box.email-input {
  position: relative;
  padding: 18px 0 28px 0;
} */
#wrap2 li .input-box.pw-input {
  position: relative;
  padding: 18px 0 26px 0;
}
#changePw_page #wrap2 li .input-box.newPw-input {
  position: relative;
  padding: 18px 0;
}
#goodbye_page #wrap2 li .input-box.repw-input {
  position: relative;
  padding: 18px 0 15px 0;
}
#goodbye_page #wrap2 li .input-box.repw-input img {
  position: absolute;
  color: #920000;
  width: 15px;
  height: 15px;
  top: 23px;
  padding: 0 0 0 6px;
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

#goodbye_finish_page .title {
  font-family: 'Sorts Mill Goudy', serif;
  color: #FFF500;
  font-size: 42px;
  font-weight: 500;
  padding: 54px 0 10px 0;
  margin-bottom: 0;
}
#goodbye_finish_page .subtitle {
  font-family: 'NanumSquareRound';
  color: #fff;
  font-size: 16px;
  font-weight: 800;
}
#goodbye_finish_page img {
  width: 200px;
  padding: 50px 80px 30px 80px;
}
#goodbye_finish_page span {
  font-family: 'NanumSquareRound';
  color: #fff;
  font-size: 21px;
  font-weight: 800;
}
#goodbye_finish_page .togo_home {
  display: block;
  width: 112px;
  height: 42px;
  border: none;
  border-radius: 6px;
  color: #000;
  background: #fff;
  font-family: 'NanumSquareRound';
  font-size: 16px;
  font-weight: 800;
  margin: 33px 124px 14px 124px;
}
#goodbye_finish_page .teamname {
  font-family: 'NanumSquareRound';
  font-size: 16px;
  font-weight: 800;
  color: #fff;
}



/* - 메인컬러
    - 배경색(red) : 920000
- 서브컬러
    - yellow : FFF500
    - white : FFFFFF
    - black : 000000
    - beige : F4E7B6
- 폰트 컬러
    - yellow : FFF500
    - white : FFFFFF
    - black : 000000
    - gray : D9D9D9 */
</style>