var btn = document.getElementById("stoping");
var btnReset = document.getElementById("reseting");
//
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");
//
var errorEmail = document.getElementById("errorEmail");
var errorPassword = document.getElementById("errorPassword");
//
//reset input
  inputEmail.value="";
  inputPassword.value="";


//
function navigatToExam(emailOut) {
    window.location.href = `exam.html?email=${emailOut}`;
}
//local storage
var studentsData = JSON.parse(localStorage.students);
//
function valid(e) {
  if (inputEmail.value == "") {
    e.preventDefault();
    errorEmail.textContent = "this field is required";
    errorEmail.style.visibility = "visible";
  }
  ///^[a-zA-Z0-9._-]+@gmail\.com$/
  else if (
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputEmail.value)
  ) {
    e.preventDefault();
    errorEmail.textContent = " enter email form";
    errorEmail.style.visibility = "visible";
  } else {
    errorEmail.style.visibility = "hidden";
    var emailOut = "";
    var emailOut = inputEmail.value;
  }

  if (inputPassword.value == "") {
    e.preventDefault();
    errorPassword.textContent = "this field is required";
    errorPassword.style.visibility = "visible";
  } else if (inputPassword.value.length < 8) {
    e.preventDefault();
    errorPassword.textContent = " Password must be more than or equal 8 ";
    errorPassword.style.visibility = "visible";
  } else {
    errorPassword.style.visibility = "hidden";
    var passwordOut = "";
    var passwordOut = inputPassword.value;
  }

  if (emailOut && passwordOut) {
    var student = studentsData.find((obj) => obj["email"] === emailOut);
    if (student.tookExam>=4) {
      let body= document.querySelector("body")
      body.innerHTML=`<div class="container">
      <h1 style="color: red;">You Only Have Three Trails To This Exam</h1>
      </div>`
    }else{
      if (!student) {
        e.preventDefault();
        errorPassword.textContent = " Email or Password is invalid";
        errorPassword.style.visibility = "visible";
      } else {
        if (student["password"] !== passwordOut) {
          e.preventDefault();
          errorPassword.textContent = " Email or Password is invalid";
          errorPassword.style.visibility = "visible";
        }else{
          errorPassword.style.visibility = "hidden";
          studentsData.map(obj=>{
              if (obj["email"] === emailOut) {
              obj["tookExam"]++;
              alert(`login successfully Trail Number ${obj["tookExam"]-1} `)
  
              }
          })
          inputEmail.value="";
          inputPassword.value="";
          localStorage.setItem("students", JSON.stringify(studentsData));
            navigatToExam(emailOut);
        }
      }
    }

  }
}
btnReset.addEventListener("click", function () {
  inputEmail.value = "";
  inputPassword.value = "";
  errorPassword.style.visibility = "hidden";
  errorEmail.style.visibility = "hidden";

});
btn.addEventListener("click", function (event) {
  valid(event);
});

