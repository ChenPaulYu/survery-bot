// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDublDYDws4SBSD976FC8hwhoVAWoTtinU",
    authDomain: "zonesound-b40d4.firebaseapp.com",
    databaseURL: "https://zonesound-b40d4.firebaseio.com",
    projectId: "zonesound-b40d4",
    storageBucket: "zonesound-b40d4.appspot.com",
    messagingSenderId: "133205700802"
  };
  firebase.initializeApp(config);



var db = firebase.database();
var surveyRef = db.ref('Survey');

/*
 * Write your code here
 */
var Name;
var isVisited;
var foodScore;
var foodComment;
var serviceScore;
var serviceComment;
var question = 1;
robotSay("感謝光臨橘子蘋果餐廳");
robotSay("請問你的名字是？");

function res() {
  var words = $("#input").val();
  humanSay(words);
  $("#input").val("");
  /*
   * Write your code here
   */
  if(question == 1) {
    name = words;
    robotSay("請問你是第一次用餐嗎?yes or no?")
  }else if(question == 2) {
    isVisited = words;
      if(words == "yes" || words == "y" || words == "是" ||
         words == "no"  || words == "n" || words == "否"){
        robotSay("很高興你的光臨");
        robotSay("請問你滿意今日的餐點嗎?1-5分,1分為不滿意,5分為滿意");
      }else{
        robotSay("我聽不太懂,請你再輸入一次");
        return;
      }
  }else if(question == 3) {
    foodScore = words;
    if(words > 2){
      robotSay("很高興你喜歡我們的餐點");
      robotSay("請問你最喜歡哪個餐點?");
    }else{
      robotSay("請問你覺得哪裡需要改進?");
    }
  }else if(question == 4) {
    foodComment = words;
    robotSay("請問你滿意今日的服務嗎?1-5分,1分為不滿意,5分為滿意");
  }else if(question == 5) {
    serviceScore = words;
    if(words > 2){
      robotSay("很高興你喜歡我們的服務");
      robotSay("請問你最喜歡哪個服務?");
    }else{
      robotSay("請問你覺得哪裡需要改進?");
    }
  }else if(question == 6) {
    serviceComment = words;
    robotSay("感謝你的回覆,期待你的再次光臨");
    
    surveyRef.push({
      name: name,
      isVisited: isVisited,
      foodScore: foodScore,
      foodComment: foodComment,
      serviceScore: serviceScore,
      serviceComment: serviceComment
    });
  }
  question = question + 1;
}; // end of res function

$("#submit").click(function(){
  res();
  $("#chat").scrollTop(100000);
}); // 當按鈕被點下
$('#input').on('keydown',function(e) {
  if(e.which == 13) { // 當Enter被按下
    res();
    $("#chat").scrollTop(100000);
  }
});

//機器人說話
function robotSay(words){
  $("#chat").append(
    `<div class='robot-bubble'>
      ${words}
    </div><br>`);
}

//人類說話
function humanSay(words){
  $("#chat").append(
    `<div class='human-bubble'>
      ${words}
    </div><br>`);
}