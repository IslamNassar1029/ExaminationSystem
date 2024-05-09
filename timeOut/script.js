var count=0;
// get student data 
const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
let studentsData = JSON.parse(localStorage.students);
var student = studentsData.find((obj) => obj["email"] === email);
let detailsStudent=document.querySelector(".container");

detailsStudent.innerHTML=`<h2 >Name is ${student.firstName} ${student.lastName}</h2>
<h2>Email is ${student.email}</h2>
<h2>Time out better luck next time</h2>`


