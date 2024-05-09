//global
questionIndex=0;

//elements
let questionTitle =document.querySelector(".examPart .question");
let questionanswers =document.querySelector(".examPart .answers");
let markedQuestions =document.querySelector(".markedQuestions");
let nextBtn =document.getElementById("next");
let previousBtn =document.getElementById("previous");
let markBtn =document.getElementById("mark");
let submitBtn =document.getElementById("submit");
let questionNumOnPage=document.querySelector(".movebetweenQuestion span")
let countdown=document.querySelector(".countdown span")
// get student data 
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
let studentsData = JSON.parse(localStorage.students);

function Question(_title,answers,_choosenAnsewr) {
  this.title=_title;
  this.answers=[]
  for (let i = 0; i < 8; i+=2) {
    this.answers.push(new Answer(answers[i],answers[i+1]))
  }
  this.choosenAnsewr=_choosenAnsewr;
}
function Answer(ans,corr) {
  this.answer=ans;
  this.correct=corr;
  
}
let questions=[
   new Question("What is the capital of France?",["Berlin",false,"Madrid",false,"paris",true,"rome",false],-1),
   new Question('Which planet is known as the "Red Planet"?',["Venus",false,"Mars",true,"Jupiter",false,"Saturn",false],-1),
   new Question("What is the main ingredient in guacamole?",["Tomato",false,"Avocado",true,"Onion",false,"Cilantro",false],-1),
   new Question("In what year did Christopher Columbus first reach the Americas?",["1492",true,"1620",false,"1776",false,"1848",false],-1),
   new Question("Which of the following is a renewable source of energy?",["Coal",false,"Natural Gas",false,"Solar Power",true,"Nuclear Power",false],-1),

];
{// let questions=[
//   {
//     title: "What is the capital of Canada?",
//     answers:[{answer:"To Make Text Bold",correct:false},{answer:"To Make Text Italic",correct:false},{answer:"To Add Breakline",correct:true},{answer:"To Create Horizontal Line",correct:false}] ,
//     choosenAnsewr:-1,
//   },
//   {
//     title: "How Can We Make Element Text Bold",
//     answers:[{answer:"To Make Text Bold",correct:false},{answer:"To Make Text Italic",correct:false},{answer:"To Add Breakline",correct:true},{answer:"To Create Horizontal Line",correct:false}] ,
//     choosenAnsewr:-1,
//   },
//   {
//     title: "What Is The Right Hierarchy For Creating Part Of Page",
//     answers:[{answer:"To Make Text Bold",correct:false},{answer:"To Make Text Italic",correct:false},{answer:"To Add Breakline",correct:true},{answer:"To Create Horizontal Line",correct:false}] ,
//     choosenAnsewr:-1,
//   },
//   {
//     title: "How Can We Include External Page Inside Our HTML Page",
//     answers:[{answer:"To Make Text Bold",correct:false},{answer:"To Make Text Italic",correct:false},{answer:"To Add Breakline",correct:true},{answer:"To Create Horizontal Line",correct:false}] ,
//     choosenAnsewr:-1,
//   },
//   {
//     title: "What Is The Tag That Not Exists in HTML",
//     answers:[{answer:"To Make Text Bold",correct:false},{answer:"To Make Text Italic",correct:false},{answer:"To Add Breakline",correct:true},{answer:"To Create Horizontal Line",correct:false}] ,
//     choosenAnsewr:-1,
//   }
// ]
}
//randam data
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(questions);
//timer
function timer() {
   examTime=900
  //examTime=10
  let minutes, seconds;
    countDownInterval = setInterval(function () {
      minutes = parseInt(examTime / 60);
      seconds = parseInt(examTime % 60);

      minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      countdown.innerHTML = `${minutes}:${seconds}`;

      if (--examTime < 0) {
        clearInterval(countDownInterval);
        alert("time out")
        window.location.replace(`failed.html?email=${email}`)
      }
    }, 1000);
}
timer();
//show data 
function showData(question,index) {
  questionTitle.innerHTML=`<h2>${question.title}</h2>`;
  questionTitle.id=`${index}`;
  questionanswers.innerHTML="";
  questionNumOnPage.innerHTML=index+1
  for (let i = 0; i < 4; i++) {
    if (i==questions[questionIndex].choosenAnsewr) {
      questionanswers.innerHTML+=`<div class="answer">
      <input onchange="changeAnswer(${i})" type="radio" id="${i}" name="questions" checked  />
      <label >${question.answers[i].answer}</label>
      </div>`
    }else{
      questionanswers.innerHTML+=`<div class="answer">
      <input onchange="changeAnswer(${i})" type="radio" id="${i}" name="questions"  />
      <label >${question.answers[i].answer}</label>
      </div>`
    }
  
  }
  if(index==0){
    previousBtn.disabled = true;
  }else{
    previousBtn.disabled = false;
  }
  if(index==questions.length-1){
    
    nextBtn.disabled = true;
  }else{
    nextBtn.disabled = false;
  }
  let markedQuestion =document.querySelector(`.markedQuestions h3[id="${index}"]`);
  
  if (markedQuestion!=null) {    
    markBtn.disabled = true;
  }else{
    markBtn.disabled = false;
  }
  

}
showData(questions[questionIndex],questionIndex);
//changeAnswer function
function changeAnswer(idInput) {
       questions[questionIndex].choosenAnsewr=idInput;
}

//next function
function next() {
  questionIndex++
  showData(questions[questionIndex],questionIndex);
}
nextBtn.addEventListener("click",next)
//previous function
function previous() {
  questionIndex--
  showData(questions[questionIndex],questionIndex);
}
previousBtn.addEventListener("click",previous)
//marked function
function mark() {
  markedQuestions.innerHTML+=`<h3 id="${questionIndex}">Question ${questionIndex+1} <i onclick="goToQuestion(${questionIndex})" class="fa-brands fa-google-scholar"></i>  <i onclick="delet(${questionIndex})" class="fa-solid fa-trash"></i></h3>`
  markBtn.disabled = true;
}
markBtn.addEventListener("click",mark)
//marked question Delete
function delet(questionNum) {
  let markedQuestion =document.querySelector(`.markedQuestions h3[id="${questionNum}"]`);
  markedQuestion.remove();
  markBtn.disabled = false;

}
//marked question go
function goToQuestion(questionNum) {
  questionIndex=questionNum;
  showData(questions[questionIndex],questionIndex);
}
//submit function
function submit() {

  studentsData.map(obj=>{
      if (obj["email"] === email) {
      obj["result"]=questions;
      }
  })
  alert("submit successfully")
  localStorage.setItem("students", JSON.stringify(studentsData));
  window.location.replace(`result.html?email=${email}`)
}
submitBtn.addEventListener("click",submit)

