const rangeSlider = document.querySelector("#range");
const lengthDisplay = document.querySelector("#length-display");

lengthDisplay.innerText = rangeSlider.value;

let hasLowercase = true;
let hasUppercase = false;
let hasNumbers = false;
let hasSymbols = false;

rangeSlider.addEventListener("input", () => {
  lengthDisplay.innerText = rangeSlider.value;
});

function toggleActiveClass() {
  /* Handles slide toggles */
  const currentToggle = event.target.parentNode;
  currentToggle.classList.toggle("active");
  if (event.target.hasAttribute("checked")) {
    event.target.removeAttribute("checked");
  }

  /* Checks for and activates password content */
  switch (true) {
    case currentToggle.classList.contains("lowercaseToggle"):
      hasLowercase = !hasLowercase;
      break;
    case currentToggle.classList.contains("uppercaseToggle"):
      hasUppercase = !hasUppercase;
      break;
    case currentToggle.classList.contains("numbersToggle"):
      hasNumbers = !hasNumbers;
      break;
    case currentToggle.classList.contains("symbolsToggle"):
      hasSymbols = !hasSymbols;
      break;
    default:
      break;
  }
}

function generatePassword() {
  console.log("GENERATED PASSWORD");
}
