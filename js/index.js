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
robotSay("Welcome to Orangeapp restuarant");
robotSay("What is your name？");

function res() {
  var words = $("#input").val();
  humanSay(words);
  $("#input").val("");
  /*
   * Write your code here
   */
  if(question == 1) {
    name = words;
    robotSay("Is this the first time to come here?yes or no?")
  }else if(question == 2) {
    isVisited = words;
      if(words == "yes" || words == "y" || words == "是" ||
         words == "no"  || words == "n" || words == "否"){
        robotSay("Welcome");
        robotSay("How do you feel our meal? (1-5)");
      }else{
        robotSay("I cannot understand, please type again?");
        return;
      }
  }else if(question == 3) {
    foodScore = words;
    if(words > 2){
      robotSay("We so glad you enjoy the meal.");
      robotSay("Which meal do you like the most?");
    }else{
      robotSay("Please tell us what should we improve.");
    }
  }else if(question == 4) {
    foodComment = words;
    robotSay("How do you feel our service? (1-5)");
  }else if(question == 5) {
    serviceScore = words;
    if(words > 2){
      robotSay("It is our pleasure to serve you.");
      robotSay("Which service do you think is the best?");
    }else{
      robotSay("Please tell us what should we improve.");
    }
  }else if(question == 6) {
    serviceComment = words;
    robotSay("Thanks for your feedback, hope to see you again.");
    
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