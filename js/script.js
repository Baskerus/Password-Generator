const rangeSlider = document.querySelector("#range");
const lengthDisplay = document.querySelector("#length-display");
const lowercaseToggle = document.querySelector("#lowercaseToggle");
const uppercaseToggle = document.querySelector("#uppercaseToggle");
const numbersToggle = document.querySelector("#numbersToggle");
const symbolsToggle = document.querySelector("#symbolsToggle");
const display = document.querySelector("#display");

lengthDisplay.innerText = rangeSlider.value;
let characters = "abcdefghijklmnopqrstuvwxyz";
let passwordStrength = 0;
let hasLowercase = true;
let hasUppercase = false;
let hasNumbers = false;
let hasSymbols = false;

/* ----------- Listeners ----------- */

/* Password length slider */
rangeSlider.addEventListener("input", () => {
  lengthDisplay.innerText = rangeSlider.value;
});
rangeSlider.addEventListener("input", () => {
  lengthDisplay.classList.add("flashBlue");
  setTimeout(() => {
    lengthDisplay.classList.remove("flashBlue");
  }, 400);
});

/* ----------- Functions ----------- */

function toggleProperties() {
  const currentToggle = event.target.parentNode;
  currentToggle.classList.toggle("active");
  if (event.target.hasAttribute("checked")) {
    event.target.removeAttribute("checked");
  }

  /* Inserts content into the generator character set */
  characters = "";
  if (lowercaseToggle.classList.contains("active")) {
    characters = "abcdefghijklmnopqrstuvwxyz";
  }
  if (uppercaseToggle.classList.contains("active")) {
    characters = characters + "ABCDEFGHIJKLMNOPQRSTUVWXZY";
  }
  if (numbersToggle.classList.contains("active")) {
    characters = characters + "0123456789";
  }
  if (symbolsToggle.classList.contains("active")) {
    characters = characters + "{|}~!#$%&'()*+,-./:;<=>?@[]_`";
  }
}

function generatePassword() {
  let passwordLength = rangeSlider.value;
  const generatedPassword = generateString(passwordLength);
  display.innerHTML = `${generatedPassword}<img src="/images/iconmonstr-clipboard-4-12.png" alt="">`;
  checkPasswordStrength(generatedPassword);
}

function generateString(length) {
  /* Generates random string from characters array */
  let result = " ";

  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function checkPasswordStrength(password) {
  let passwordStrength = 0;

  /* Adds "points" to password strength based on toggled type of characters */
  if (lowercaseToggle.classList.contains("active")) {
    passwordStrength = passwordStrength + 2;
  }
  if (uppercaseToggle.classList.contains("active")) {
    passwordStrength = passwordStrength + 2;
  }
  if (numbersToggle.classList.contains("active")) {
    passwordStrength = passwordStrength + 2;
  }
  if (symbolsToggle.classList.contains("active")) {
    passwordStrength = passwordStrength + 2;
  }

  /* Multiplies points based on password length */
  if (password.length < 6) {
    passwordStrength = passwordStrength * 1;
  } else if (password.length < 7) {
    passwordStrength = passwordStrength * 2;
  } else if (password.length > 7 && password.length < 12) {
    passwordStrength = passwordStrength * 3;
  } else if (password.length > 11 && password.length < 16) {
    passwordStrength = passwordStrength * 4;
  } else if (password.length > 15 && password.length < 20) {
    passwordStrength = passwordStrength * 10;
  } else if (password.length > 19) {
    passwordStrength = passwordStrength * 12;
  }

  gradePassword(passwordStrength, password);
}

function gradePassword(passwordStrength, password) {
  /* Grades the password based on passwordStrength points */
  if (passwordStrength < 6 || password.length < 7) {
    console.log("WEAK");
  } else if (passwordStrength < 11) {
    console.log("MEDIUM");
  } else if (passwordStrength < 25) {
    console.log("STRONG");
  } else if (passwordStrength === 96 && password.length == 29) {
    console.log("UNBREAKABLE");
  } else if (passwordStrength > 23) {
    console.log("VERY STRONG");
  }
}
