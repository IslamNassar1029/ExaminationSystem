var btn = document.getElementById("stoping")
var btnReset = document.getElementById("reseting")
//
var inputFirstName = document.getElementById("inputFirstName")
var inputLastName = document.getElementById("inputLastName")
var inputEmail = document.getElementById("inputEmail")
var inputPassword = document.getElementById("inputPassword")
var inputRPassword = document.getElementById("inputRPassword")
//
var errorFirstName = document.getElementById("errorFirstName");
var errorLastName = document.getElementById("errorLastName");
var errorEmail = document.getElementById("errorEmail");
var errorPassword = document.getElementById("errorPassword");
var errorRPassword = document.getElementById("errorRPassword");
//navigat to login
function navigatToLogin() {
    window.location.replace('login.html')
}
//local storage 
function studentdataFunc(firstNameOut,lastNameOut,emailOut,passwordOut) {
    let StudentsData;
        if (localStorage.students != null) {
        StudentsData = JSON.parse(localStorage.students);
        } else {
        StudentsData = [];
        }
        var newStudent = {
            firstName: firstNameOut,
            lastName: lastNameOut,
            email: emailOut,
            password: passwordOut,
            tookExam: 1,
            result:[]
          };
        StudentsData.push(newStudent);
        localStorage.setItem("students", JSON.stringify(StudentsData));
        
}
// validation
function valid(e){

    if(inputFirstName.value==""){
        e.preventDefault();
        errorFirstName.textContent = "this field is required";
        errorFirstName.style.visibility = 'visible';

    }
    else if(!( /^[a-zA-Z]+$/.test(inputFirstName.value))){
        e.preventDefault();
        errorFirstName.textContent = " enter characters";
        errorFirstName.style.visibility = 'visible';
        
    }
    else{
        errorFirstName.style.visibility = "hidden";
        var firstNameOut = "";
        var firstNameOut = inputFirstName.value;
        
    }

    if(inputLastName.value==""){
        e.preventDefault();
        errorLastName.textContent = "this field is required";
        errorLastName.style.visibility = 'visible';

    }
    else if(!( /^[a-zA-Z]+$/.test(inputLastName.value))){
        e.preventDefault();
        errorLastName.textContent = " enter characters";
        errorLastName.style.visibility = 'visible';
        
    }
    else{
        errorLastName.style.visibility = "hidden";
        var lastNameOut = "";
        var lastNameOut = inputLastName.value;
       
    }
    
    if(inputEmail.value==""){
        e.preventDefault();
        errorEmail.textContent = "this field is required";
        errorEmail.style.visibility = 'visible';

    }
    ///^[a-zA-Z0-9._-]+@gmail\.com$/
    else if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputEmail.value))){
        e.preventDefault();
        errorEmail.textContent = " enter email form";
        errorEmail.style.visibility = 'visible';
        
    }
    else if(localStorage.students != null&& ( JSON.parse(localStorage.students).some(student => student["email"] == inputEmail.value))){
        
        e.preventDefault();
        errorEmail.textContent = "Email must be unique";
        errorEmail.style.visibility = 'visible';
        
    }
    else{
        errorEmail.style.visibility = "hidden";
        var emailOut = "";
        var emailOut = inputEmail.value;
        
    }

    if(inputPassword.value==""){
        e.preventDefault();
        errorPassword.textContent = "this field is required";
        errorPassword.style.visibility = 'visible';

    }
    else if(inputPassword.value.length<8){
        e.preventDefault();
        errorPassword.textContent = " Password must be more than or equal 8 ";
        errorPassword.style.visibility = 'visible';
        
    }
    else{
        errorPassword.style.visibility = "hidden";
        var passwordOut = "";
        var passwordOut = inputPassword.value;
        
    }

    if(inputRPassword.value==""){
        e.preventDefault();
        errorRPassword.textContent = "this field is required";
        errorRPassword.style.visibility = 'visible';

    }

    else if(inputRPassword.value.length<8){
        e.preventDefault();
        errorRPassword.textContent = " Password must be more than or equal 8 ";
        errorRPassword.style.visibility = 'visible';
        
    }
    else if(inputRPassword.value != passwordOut){
        e.preventDefault();
        errorRPassword.textContent = "Password doesn't match Re-enter";
        errorRPassword.style.visibility = 'visible';
        
    }
    else {
        var RPasswordOut=inputRPassword.value;
        errorRPassword.style.visibility = "hidden";
    }

    if(firstNameOut&&lastNameOut&&emailOut&&passwordOut&&RPasswordOut){
        alert("registertion was succesfull")
        studentdataFunc(firstNameOut,lastNameOut,emailOut,passwordOut)
        navigatToLogin();
    }
}
//
btnReset.addEventListener("click",function () {
    inputFirstName.value = "";
    inputLastName.value = "";
    inputEmail.value = "";
    inputPassword.value = "";
    inputRPassword.value = "";
    errorPassword.style.visibility = "hidden";
    errorEmail.style.visibility = "hidden";
    errorRPassword.style.visibility = "hidden";
    errorFirstName.style.visibility = "hidden";
    errorLastName.style.visibility = "hidden";
    
}) 
//
btn.addEventListener("click",function (event) {
    valid(event);
})
