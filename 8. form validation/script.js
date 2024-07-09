// [1.] js code to show/hide password and change icon and error box close
let pwShowHide = document.querySelector(".showHidePass");
let pwFields = document.querySelectorAll(".password");
let errorBoxClose = document.getElementById("errorBoxClose");
let errorBox = document.getElementById("errorBox");

pwShowHide.addEventListener("click", () => {
  pwShowHide.classList.toggle("active");

  pwFields.forEach((pwField) => {
    if (pwField.type === "password") {
      pwField.type = "text";
      pwShowHide.classList.add("fa-eye");
    } else {
      pwField.type = "password";
      pwShowHide.classList.remove("fa-eye");
    }
  });
});

// error box removing
errorBoxClose.addEventListener("click", () => {
  errorBox.classList.remove("showErrorBox");
});

// [2.] js code for form validation.
let form = document.getElementById("forms");
let subBtn = document.getElementById("subBtn");

// creating empty array for storing errors
let errorArr = [];

// function for clearing error in errorArray
function clearError() {
  // clearing error in errorArr
  errorArr = [];

  // clearing element inside orderList element
  orderList.innerHTML = "";
}

// function for showing error
function showError() {
  let nameField = document.getElementById("nameField").value.trim();
  let emailField = document.getElementById("emailField").value.trim();
  let passField = document.getElementById("passField").value.trim();
  let cnfPassField = document.getElementById("cnfPassField").value.trim();
  let checkField = document.getElementById("checkField");
  let orderList = document.getElementById("orderList");
  let errorBox = document.getElementById("errorBox");

  // validation for name field
  if (nameField == "") {
    errorArr.push("please enter your name");
  } else if (nameField.length < 3 || nameField.length > 20) {
    errorArr.push("minimum have three character and maximum 20 character");
  }

  // validation for email
  var regx = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})&/;
  if (emailField == "") {
    errorArr.push("please enter your email");
  } else if (regx.test(emailField)) {
    errorArr.push("please enter valid email");
  }

  // validation for password
  if (passField == "") {
    errorArr.push("Please enter and confirm your password");
  } else if (passField.length < 10) {
    errorArr.push("Password atlesat 10 character long");
  } else if (cnfPassField == "") {
    errorArr.push("Please confirm your password");
  } else if (passField !== cnfPassField) {
    errorArr.push("your password not matching");
  }

  // validation for checkbox
  if (checkField.checked == false) {
    errorArr.push("please agree to term and condition");
  }

  // for displaing error on html page
  for (let i = 0; i < errorArr.length; i++) {
    console.log(`<li>${errorArr[i]}</li>`);
    orderList.innerHTML += `<li>${errorArr[i]}</li>`;
  }

  // code for show and hide error box
  if (errorArr.length > 0) {
    errorBox.classList.add("showErrorBox");
  } else {
    errorBox.classList.remove("showErrorBox");
  }
}



form.addEventListener("submit", (event) => {
  // preventing form from submitting
  event.preventDefault();

  // calling clear error function
  clearError();

  // calling showError function
  showError();

  // submittin form
  let checkField = document.getElementById("checkField");
  if (errorArr.length == 0 & checkField.checked == true) {
    form.submit();
  }
});
