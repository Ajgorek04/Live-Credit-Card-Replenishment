// Wysuwanie karty z przodu

const cardnumber = document.querySelector("#cardnumber");
const valid = document.querySelector("#valid");
const nameid = document.querySelector("#nameid");
const surname = document.querySelector("#surname");

const cardfront = document.querySelector("#front");

function slideOutFrontCard() {
  cardfront.classList.add("front_js");
}

function slideInFrontCard() {
  cardfront.classList.remove("front_js");
}

cardnumber.addEventListener("focus", slideOutFrontCard);
valid.addEventListener("focus", slideOutFrontCard);
nameid.addEventListener("focus", slideOutFrontCard);
surname.addEventListener("focus", slideOutFrontCard);

cardnumber.addEventListener("blur", slideInFrontCard);
valid.addEventListener("blur", slideInFrontCard);
nameid.addEventListener("blur", slideInFrontCard);
surname.addEventListener("blur", slideInFrontCard);

// Koniec

// Wypisywanie danych na zywo
const cardnumber_p = document.querySelector("#cardnumber_p");

// Wypisywanie na zywo numeru karty
cardnumber.addEventListener("input", function (e) {
  // Pobierz wprowadzoną wartość z pola cardnumber
  let cardNumberValue = e.target.value;

  // Usuń wszystkie znaki, które nie są cyframi
  let deleteNotNumbers = cardNumberValue.replace(/[^0-9]/g, "");

  // Usun mozliwosc wprowadzania czegos innego niz cyrfy
  if (cardNumberValue !== deleteNotNumbers) {
    e.target.value = deleteNotNumbers;
    cardNumberValue = deleteNotNumbers;
  }

  // Dodawaj spacje co 4 cyfry na karcie
  let formattedValue = "";
  for (let i = 0; i < deleteNotNumbers.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += " ";
    }
    formattedValue += deleteNotNumbers[i];
  }

  // Ustaw nowe wartości
  cardnumber_p.textContent = formattedValue;
  cardnumber.value = formattedValue;

  cardnumber_p.style.color = "#222";
});

// Wypisywanie na zywo Valid thru
const cardvalid_p = document.querySelector("#cardvalid_p");

valid.addEventListener("input", function (e) {
  let cardValidValue = e.target.value;

  // Usuń wszystkie znaki, które nie są cyframi
  let deleteNotNumbers = cardValidValue.replace(/[^0-9]/g, "");

  // Sprawdź, czy wprowadzona wartość jest równa pozbawionym znaków cyfrom
  if (cardValidValue !== deleteNotNumbers) {
    // Jeśli wprowadzono inne znaki niż cyfry, zaktualizuj wartość pola zgodnie z poprawioną wartością
    e.target.value = deleteNotNumbers;
    cardValidValue = deleteNotNumbers;
  }

  // Dodaj '/' po 2 cyfrach
  let formattedValue = "";
  for (let i = 0; i < cardValidValue.length; i++) {
    if (i === 2 && cardValidValue[i - 1] !== "/") {
      formattedValue += "/";
    }
    formattedValue += cardValidValue[i];
  }

  e.target.value = formattedValue;
  cardvalid_p.textContent = formattedValue;

  cardvalid_p.style.color = "#222";

  const valid_p = document.querySelector("#valid_p");
  valid_p.style.color = "#222";
});

// Wypisywanie na zywo name and surname

const namee = document.querySelector(".p_name");

nameid.addEventListener("input", function (e) {
  let nameValue = e.target.value;

  // To dziala tak ze zamienia kazdy inny znak niz litery na "" czyli nic
  let onlyLetters = nameValue.replace(/[^a-zA-Z]/g, "");

  namee.textContent = onlyLetters;
  e.target.value = onlyLetters;

  namee.style.color = "#222";
});

const surnamee = document.querySelector(".p_surname");

surname.addEventListener("input", function (e) {
  let surnameValue = e.target.value;

  // To dziala tak ze zamienia kazdy inny znak niz litery na "" czyli nic
  let onlyLetters = surnameValue.replace(/[^a-zA-Z]/g, "");

  surnamee.textContent = onlyLetters;
  e.target.value = onlyLetters;

  surnamee.style.color = "#222";
});

// Koniec

// Obracanie Karty po focus na input z cvv

const cvv_input = document.querySelector("#cvv_input");

cvv_input.addEventListener("focus", function () {
  const card = document.querySelector(".card");
  cardfront.classList.add("front_js");
  card.classList.add("flipped");
});

cvv_input.addEventListener("blur", function () {
  const card = document.querySelector(".card");
  cardfront.classList.remove("front_js");
  card.classList.remove("flipped");
});

// Koniec

// Zmienianie cvv
cvv_input.addEventListener("input", function (e) {
  let cvvValue = e.target.value;

  let deleteNotNumbers = cvvValue.replace(/[^0-9]/g, "");

  // Usun mozliwosc wprowadzania czegos innego niz cyrfy
  if (cvvValue !== deleteNotNumbers) {
    e.target.value = deleteNotNumbers;
    cvvValue = deleteNotNumbers;
  }

  // Podmienianie na karcie
  const cvv_number = document.querySelector("#cvv_number");

  cvv_number.style.color = "#222";
  cvv_number.textContent = cvvValue;
});

// Koniec

// Sprawdzanie czy wszytkie pola sa wypelnione
const button = document.querySelector("#checkout");

if (cardnumber.value != "") {
  console.log("asf");
}
// Sprawdzanie czy pola nie sa puste

function checkFields() {
  if (
    cardnumber.value !== "" &&
    cardnumber.value.length === 19 &&
    valid.value !== "" &&
    valid.value.length === 5 &&
    cvv_input.value !== "" &&
    cvv_input.value.length === 3 &&
    nameid.value !== "" &&
    surname.value !== ""
  ) {
    button.style.backgroundColor = "#0505ff";
    return true;
  } else {
    button.style.backgroundColor = "#66a1ff";
    return false;
  }
}

cardnumber.addEventListener("input", checkFields);
valid.addEventListener("input", checkFields);
cvv_input.addEventListener("input", checkFields);
nameid.addEventListener("input", checkFields);
surname.addEventListener("input", checkFields);

const success = document.querySelector(".success");

function finalCheckout() {
  if (checkFields()) {
    const html_card = document.querySelector(".card");
    html_card.remove();

    const container = document.querySelector(".container");
    container.remove();

    success.style.display = "flex";

    success.classList.add("slide-in");
  } else {
    const error = document.querySelector(". error");

    error.textContent = "Error: You have to fill all empty fields";
  }
}

button.addEventListener("click", finalCheckout);

const tryAgain = document
  .querySelector("#tryagain")
  .addEventListener("click", newCard);

function newCard() {
  success.classList.add("slide-out");
  setTimeout(function () {
    location.reload();
  }, 1000);
}
