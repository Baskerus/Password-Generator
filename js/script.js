const rangeSlider = document.querySelector("#range");
const lengthDisplay = document.querySelector("#length-display");
const lowercaseToggle = document.querySelector("#lowercaseToggle");
const uppercaseToggle = document.querySelector("#uppercaseToggle");
const numbersToggle = document.querySelector("#numbersToggle");
const symbolsToggle = document.querySelector("#symbolsToggle");
const display = document.querySelector("#display");

lengthDisplay.innerText = rangeSlider.value;
let characters = "";
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
  /* Handles slide toggles */
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
  display.innerText = generatedPassword;
}

function generateString(length) {
  let result = " ";

  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
