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
            Q_list_page : true,
            Q_gather_page : false,
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