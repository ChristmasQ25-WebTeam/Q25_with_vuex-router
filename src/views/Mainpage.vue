<template>
<div>
<!-- 회원별 박스 view -->
  <div v-if="ooops==true" id="ooopsBox_bg">
    <div id="ooopsBox">
      <div>
        <div>Ooops!</div>
        <div>
          <div class="ooops_line"></div>
          <div>
            아직 질문이 오픈되지 않았어요!
            <br>
            질문은 해당일 자정에 오픈됩니다.
            <br>
            조금만 기다려주세요:)
          </div>
          <div>
            <img src="@/assets/03_gift_opened_sticker.png" alt="">
          </div>
          <div class="ooops_line"></div>
        </div>
        <button @click="ooops=false">확인</button>
      </div>
    </div>
  </div>
  <div v-if="Q_list_page==true" id="Q_list_page">
    <div class="title">
      <img id="setting" src="../assets/09_setting.png" alt="설정" @click="togo_setting_page">
      <div><span class="userName">{{ userInfo.name }}</span>'s</div> 
      <div>Christmas Q25</div>
      <div id="title_line"></div>
      <p>당신의 1년을 정리하는 25개의 질문</p>
      <p> 선물상자는 1번부터 열어주세요 :) </p>
    </div>
    <div class="newcontents">
      <!-- 반복문활용 -->
      <div v-for="i in 8" :key="i">
        <div @click="open_question" v-for="j in 3" :key="j">
          <!-- <img src="./assets/13_oops.png" alt="" v-if="filled_sticker"> -->
          <img v-if="(3*(i-1)+j)<10" :src="require(`@/assets/06_gift0${3*(i-1)+j}.png`)" alt="" id='giftbox'>
          <img v-if="(3*(i-1)+j)>9" :src="require(`@/assets/06_gift${3*(i-1)+j}.png`)" alt="" id='giftbox'>
          {{3*(i-1)+j}}
        </div>
        <div  @click="open_question" v-if='i==8'>
          <img src="../assets/06_gift25.png" alt="" id="giftbox_25">
          25
        </div>
      </div>

      <!-- 그냥 나열 -->
      <!-- <div>
        <div id="box_1">
          <img src="" alt="">
          1
        </div>
        <div></div>
        <div></div>
      </div> -->

    </div>
    <button id="answer_group" @click="togo_answerGrouping_page">답변 모아보기</button>
  </div>
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

 </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState(['userInfo'])
    },
    data() {
        return{
            ooops : false,
            Q_list_page : true,
            Q_gather_page : false,

            nickName : '',


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
            ]
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
    open_question(event) {
      console.log(event.target.data);
      // if(this.answer==1){
      //   this.ooops=true;
      // }
      // else if(this.answer==null){
      //   this.Q_list_page=false;
      //   this.motion_page=true;

      // }

      // var numBer = event.path[0].nextSibling;
      // if(this.answer!=null){
      //   console.log(this.ooops = true)
        // console.log(this.$refs.getNum[index.index].innerText);

      // }
    },
    togo_setting_page() {
      this.setting_page=true;
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

/* 엘 */
#Q_list_page #setting {
  position: absolute;
  width: 24px;
  top: 25px;
  right: 30px;
}
.day_img{
  width: 200px;
  height: 200px;
}
#ooopsBox_bg {
  /* 배경블러처리 블랙, 화이트 고민 */
  background-color: #00000091;
  width: 100%;
  height: 100%;
  position: absolute;
  /* position: relative; */
}
#ooopsBox {
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: khaki; */
  display: flex;
  align-items: center;
  justify-content: center;
}
#ooopsBox > div {
  width: 224px;
  height: 250px;
  background-color: #F4E7B6;
  /* position: fixed; */
  position: absolute;
  border-radius: 6px;
  padding: 20px;

}
#ooopsBox > div > div:nth-child(1) {
  font-size: 21px;
  font-family: 'Sorts Mill Goudy', serif;
  font-weight: 700;
}
#ooopsBox > div > div > div:nth-child(3) >img {
  width: 70px;
  margin-top: 10px;
}
#ooopsBox > div > div > div:nth-child(2) {
  font-size: 13px;
  font-family: 'NanumSquareRound';
  font-weight: 500;
} 
.ooops_line {
  width: 200px;
  height: 0.3px;
  background-color: rgba(0, 0, 0, 0.548);
  margin: 13px;
}
#ooopsBox > div > button {
  width: 70px;
  height: 30px;
  color:  #F4E7B6;
  background-color: #920000;
  border: none;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 500;
  /* margin-top: 10px; */
  cursor: pointer;
}
#Q_list_page {
  overflow: scroll;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  font-family: 'Sorts Mill Goudy', serif;
  color: #FFF500;
  font-size: 30px;
  font-weight: 600;
  /* position: fixed; */
  top: 80px;
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  /* padding: 0px 60px 20px 60px; */
  
  /* background-color: #920000; */
}
.title > #title_line {
  height: 1px;
  width: 330px;
  background-color: rgba(255, 255, 255, 0.646);
  border-radius: 1px;
  margin: 34px 0 30px 0;

}
.title > p {
  font-family: 'NanumSquareRound';
  color: white;
  font-size: 16px;
  font-weight: normal;
}
.title > p:nth-child(5){
  color: rgba(255, 255, 255, 0.742);
  font-size: 13px;
  margin-top: 5px;
}
.newcontents {
  height: 400px;
  width: 350px;
  display: flex;
  /* position: sticky; */
  overflow: scroll;
  flex-direction: column;
  align-items: center;
  /* margin-top: 30px; */
  /* padding-top: 175px; */
  background-color: #9b1010;
  border-radius: 10px;
  padding-bottom: 20px;

}
.newcontents > p {
  font-family: 'NanumSquareRound';
  color: white;
}
.newcontents > div {
  font-family: 'OFL Sorts Mill Goudy TT';
  font-size: 21px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.newcontents > div > div {
  display: flex;
  flex-direction: column;
  color: white;
  cursor: pointer;
  margin: 0 16px;
}
#giftbox {
  width: 73px;
  height: 73px;
  margin: 16px 0 5px 0;
  line-height: 100px;
  
}
#giftbox_25{
  width: 100px;
  height: 100px;
  margin-top: 36px;
}
#answer_group {
  width: 120px;
  height: 40px;
  margin: 15px;
  font-weight: bold;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: white;
  color: rgb(16, 16, 16);
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
</style>