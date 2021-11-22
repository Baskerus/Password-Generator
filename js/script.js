const rangeSlider = document.querySelector("#range");
const lengthDisplay = document.querySelector("#length-display");
const lowercaseToggle = document.querySelector("#lowercaseToggle");
const uppercaseToggle = document.querySelector("#uppercaseToggle");
const numbersToggle = document.querySelector("#numbersToggle");
const symbolsToggle = document.querySelector("#symbolsToggle");
const display = document.querySelector("#display");
const passwordDisplay = document.querySelector("#password-display");
const strengthIndicatorText = document.querySelector("#indicator-text");
const displayStrength = document.querySelector("#password-strength");
const copy = document.querySelector("#copy-icon");
const generateButton = document.querySelector("#generate-btn");
const infoModal = document.querySelector("#info-modal");

lengthDisplay.innerText = rangeSlider.value;
let characters = "abcdefghijklmnopqrstuvwxyz"; //Password character set

/* ----------- Listeners ----------- */

generateButton.addEventListener("click", () => {
  flashScale(generateButton);
});

/* Password length slider */
rangeSlider.addEventListener("input", () => {
  lengthDisplay.innerText = rangeSlider.value;
});
rangeSlider.addEventListener("input", () => {
  flashTextBlue(lengthDisplay);
});

document.addEventListener("click", () => {
  if (event.target != infoModal && event.target.id != "info-icon") {
    if (infoModal.classList.contains("active")) {
      document.querySelector(".container").classList.toggle("blur");
    }
    infoModal.classList.remove("active");
  }
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

  display.innerHTML = `<div class="flashScale" id="password-display">${generatedPassword}</div><img onclick="copyToClipboard();" id="copy-icon" src="/images/iconmonstr-clipboard-4-12.png" alt="">`;
  checkPasswordStrength(generatedPassword);
  displayPasswordStrength();
  display.style.color = "rgb(45, 24, 231)";

  /* Addresses a bug where it doesn't display the complete password */
  if (display.innerText.length + 1 < generatedPassword.length) {
    generatePassword();
  }
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
    passwordStrength = passwordStrength + 3;
  }
  if (uppercaseToggle.classList.contains("active")) {
    passwordStrength = passwordStrength + 4;
  }
  if (numbersToggle.classList.contains("active")) {
    passwordStrength = passwordStrength + 4;
  }
  if (symbolsToggle.classList.contains("active")) {
    passwordStrength = passwordStrength + 7;
  }

  passwordStrength = passwordStrength + password.length;
  gradePassword(passwordStrength, password);
}

function gradePassword(passwordStrength, password) {
  /* Grades the password based on passwordStrength points */
  if (passwordStrength < 12 || password.length < 7) {
    passwordGrade = "Weak";
  } else if (passwordStrength < 16 || password.length < 9) {
    passwordGrade = "Medium";
  } else if (passwordStrength < 29) {
    passwordGrade = "Strong";
  } else if (passwordStrength === 96 && password.length == 29) {
    passwordGrade = "Unbreakable";
  } else if (passwordStrength > 29) {
    passwordGrade = "Very Strong";
  }
}

function displayPasswordStrength() {
  displayStrength.style.display = "flex";
  strengthIndicatorText.innerText = passwordGrade;

  switch (passwordGrade) {
    case "Weak":
      strengthIndicatorText.style.color = "red";
      break;
    case "Medium":
      strengthIndicatorText.style.color = "orange";
      break;
    case "Strong":
      strengthIndicatorText.style.color = "green";
      break;
    case "Very Strong":
      strengthIndicatorText.style.color = "lightgreen";
      break;
  }
}

function copyToClipboard() {
  let textArea = document.createElement("textarea");
  textArea.value = display.innerText;
  document.body.appendChild(textArea);
  textArea.select();

  document.body.removeChild(textArea);

  flashBorderBlue(display);

  // The following doesn't work on mobile!
  if (display.innerText !== "PRESS GENERATE") {
    navigator.clipboard.writeText(display.innerText);
    flashBorderBlue(display);
  }
}

function toggleActiveClass(element) {
  element.classList.toggle("active");
  document.querySelector(".container").classList.toggle("blur");
}

/* Animations */

function flashBorderBlue(element) {
  element.animate(
    [
      // keyframes
      {
        border: "2px solid blue",
        color: "gray",
      },
      {
        border: "2px solid lightgray",
        color: "blue",
      },
    ],
    {
      // timing options
      duration: 100,
      iterations: 1,
    }
  );
}

function flashTextBlue(element) {
  element.animate(
    [
      // keyframes
      {
        color: "blue",
        transform: "scale(1.0)",
      },
      {
        color: "blue",
        transform: "scale(1.3)",
      },
    ],
    {
      // timing options
      duration: 80,
      iterations: 1,
    }
  );
}

function flashScale(element) {
  element.animate(
    [
      // keyframes
      {
        transform: "scale(1.03)",
      },
      {
        transform: "scale(1.0)",
      },
    ],
    {
      // timing options
      duration: 200,
      iterations: 1,
    }
  );
}
