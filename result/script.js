var count=0;
// get student data 
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
let studentsData = JSON.parse(localStorage.students);
var student = studentsData.find((obj) => obj["email"] === email);
let detailsStudent=document.querySelector(".details");

let wrongQuestions=document.querySelector(".wrongQuestions");
console.log(student.result);

student.result.forEach(question => {
    if (question.choosenAnsewr!=-1&&question.answers[question.choosenAnsewr].correct==true) {
        count++
    }else{
        if(question.choosenAnsewr==-1){
            wrongQuestions.innerHTML+=`<div class="wrongQuestion">
            <h5>${question.title}</h5>
            <p class="right">Right answer is ${rightAnswer}</p>
            <p class="wrong">You didn't choose an answer</p>
            </div>`
        }else{
            var rightAnswer;
            for (let i = 0; i <question.answers.length ; i++) {
                if (question.answers[i].correct==true) {
                    rightAnswer = question.answers[i].answer;
                }
                
            }
            wrongQuestions.innerHTML+=`<div class="wrongQuestion">
            <h5>${question.title}</h5>
            <p class="right">Right answer is ${rightAnswer}</p>
            <p class="wrong">Your wrong answer is ${question.answers[question.choosenAnsewr].answer}</p>
            </div>`
        }
        
    }
    
});
if (count>=student.result.length/2) {
    document.querySelector("body").classList.add("rightImage")
    detailsStudent.innerHTML=`<h2 >Name is ${student.firstName} ${student.lastName}</h2>
    <h2>Email is ${student.email}</h2>
    <h2 class="right">Your result is ${count}/${student.result.length}</h2>`
} else {
    document.querySelector("body").classList.add("wrongImage")
    detailsStudent.innerHTML=`<h2 >Name is ${student.firstName} ${student.lastName}</h2>
    <h2>Email is ${student.email}</h2>
    <h2 class="wrong">Your result is ${count}/${student.result.length}</h2>`
}



