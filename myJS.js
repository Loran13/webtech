/*Discover Button Functionality
  First, arrays are made (from homepage and all subfolders)
  Then identical functions are used which are used in subfolders */
let countryList = [
  './index.html',
  './Continents/Europe.html',
  './Games.html'
];
function discover() {
  /* Gets random page from the array */
  let rand = Math.floor(Math.random() * countryList.length);
  parent.location = countryList[rand];
  return false;
}

/* Handles the main navigation dropdown */
$('.dropbtn').on('click', () => {
  $('.dropdown-content').toggle();
});



/* EUROPE PAGE FUNCTIONALITY */
/* Hides all tabs by default except the defaultTab
  See openRegion() for more explanation about the click */
$('.headerEU').hide();
$('#defaultTab').click();

/* This is the same random page finder as before,
  only this time we start from a subfolder and thus
  need another relative path to the pages */
let countryListEU = [
  '../index.html',
  './Europe.html',
  '../Games.html'
];
function discoverEU() {
  let rand = Math.floor(Math.random() * countryList.length);
  parent.location = countryListEU[rand];
  return false;
}

/* Tabheader functionality */
function openRegion(region, ele, color) {
  /* Hides all headers */
  $('.headerEU').hide();

  /* Sets button colors back to normal */
  let tabs;
  let i;
  tabs = document.getElementsByClassName("tabBtn");
  for (i = 0; i < tabs.length; i++) {
    tabs[i].style.backgroundColor = "";
  }

  /* Displays the element that was called along with its content */
  let content = region + "an";
  document.getElementById(content).style.display = "block"
  document.getElementById(region).style.display = "block";
  ele.style.backgroundColor = color;
}



/* GAMES CODE */
// Startup code for the game page
function start() {
  chooseFlags();
}

// List containing all the flag image locations
let flagList = [
  './images/AustrianFlag.png',
  './images/BelgianFlag.png',
  './images/DutchFlag.png',
  './images/FrenchFlag.png',
  './images/GermanFlag.png',
  './images/LiechtensteinFlag.png',
  './images/LuxembourgFlag.png',
  './images/MonacoFlag.png',
  './images/SwissFlag.png'
];

//This chooseFlags() gets run when the games page is loaded
function chooseFlags() {
  /* We choose a random flag from the flagList
  and display it at the #headerFlag position */
  let flagGuess;
  let rand = Math.floor(Math.random() * flagList.length);
  flagGuess = flagList[rand];
  $("#headerFlag").attr('src', flagGuess);

  /* We run chooseAnswers to set the buttons below
  the main flag */
  chooseAnswers(flagGuess);
}

/* List containing all country names of the countries
   of which an image is available */
let countries = [
  "Austria",
  "Belgium",
  "The Netherlands",
  "France",
  "Germany",
  "Liechtenstein",
  "Luxembourg",
  "Monaco",
  "Switzerland"
];

// The countryNames array holds values for each button
let countryNames = [];

// The correctAnswer holds the correct flag
let correctAnswer;

/* chooseAnswers function which sets all buttons */
function chooseAnswers(flag) {
  /* First, a switch statement is called to determine the right answer
     from the flagGuess called in chooseFlags()
     Each case checks the displayed flag, then pushes the name
     of said flag into the countryNames array and then deletes it from
     the countries array to prevent doubles
     Finally the correct answer is stored into correctAnswer */
  switch(flag) {
    case './images/AustrianFlag.png':
      countryNames.push("Austria");
      countries.splice(0, 1);
      correctAnswer = "Austria";
      break;
    case './images/BelgianFlag.png':
      countryNames.push("Belgium");
      countries.splice(1, 1);
      correctAnswer = "Belgium";
      break;
    case './images/DutchFlag.png':
      countryNames.push("The Netherlands");
      countries.splice(2, 1);
      correctAnswer = "The Netherlands";
      break;
    case './images/FrenchFlag.png':
      countryNames.push("France");
      countries.splice(3, 1);
      correctAnswer = "France";
      break;
    case './images/GermanFlag.png':
      countryNames.push("Germany");
      countries.splice(4, 1);
      correctAnswer = "Germany";
      break;
    case './images/LiechtensteinFlag.png':
      countryNames.push("Liechtenstein");
      countries.splice(5, 1);
      correctAnswer = "Liechtenstein";
      break;
    case './images/LuxembourgFlag.png':
      countryNames.push("Luxembourg");
      countries.splice(6, 1);
      correctAnswer = "Luxembourg";
      break;
    case './images/MonacoFlag.png':
      countryNames.push("Monaco");
      countries.splice(7, 1);
      correctAnswer = "Monaco";
      break;
    case './images/SwissFlag.png':
      countryNames.push("Switzerland");
      countries.splice(8, 1);
      correctAnswer = "Switzerland";
  }

  /* Next, 3 more answers are needed, so they are chosen
     at random by a random function which puts those names
     into the countryNames array and deletes them from
     countries to prevent duplicates */
  let ran = Math.floor(Math.random() * countries.length);
  countryNames.push(countries[ran]);
  countries.splice(ran, 1);
  ran = Math.floor(Math.random() * countries.length);
  countryNames.push(countries[ran]);
  countries.splice(ran, 1);
  ran = Math.floor(Math.random() * countries.length);
  countryNames.push(countries[ran]);
  countries.splice(ran, 1);

  // The array is then shuffled to get a random display order
  countryNames = shuffle(countryNames);

  // Finally all answers are put into the buttons
  document.getElementById("A").innerHTML = countryNames[0];
  document.getElementById("B").innerHTML = countryNames[1];
  document.getElementById("C").innerHTML = countryNames[2];
  document.getElementById("D").innerHTML = countryNames[3];
}

/* The shuffle(array) function is used to shuffle
   an array (used in randomizing the order of the buttons) */
function shuffle(array) {
  /* First, variables are declared which will help us later */
  var current = array.length;
  var temp;
  var randIndex;

  /* While loop keeps going untill everything is shuffled */
  while (0 < current) {
    /* First, we select a random element */
    randIndex = Math.floor(Math.random() * current);
    current -= 1;
    /* Then we swap that element with the next unshuffled one; */
    temp = array[current];
    array[current] = array[randIndex];
    array[randIndex] = temp;
  }

  /* Finally, we return the shuffled array */
  return array;
}

/* The next core is used to "play" the game */
/* Three variable are declared which will help us:
   Score: To keep track of the score
   Guesses: To keep track of remaining Guesses
   Lock: To prevent the user from guessing more than allowed
         or to prevent them from guessing when the correct
         answer is already guessed */
let score = 0;
let guesses = 2;
let lock = false;

/* Used for the flag-guessing game
   Displays border when guessed with color depending on
   if it is correct or not */
function isCorrect(ele) {
  /* First we check if the game is locked */
  if (!lock) {

    /* Remove all borders showing previous answers */
    $(event.currentTarget).siblings().removeClass('correct');
    $(event.currentTarget).siblings().removeClass('wrong');

    /* Next, we will execute a switch statement which finds which
       button was pressed. After that has been found it looks in
       the countryNames array to see if that button holds the name
       with the correctAnswer.
       If so: Lock the game and add the guesses leftover to score
       If not: Keep playing and subtract one from score */
    switch (ele.id) {
      case "A":
        if (countryNames[0] === correctAnswer) {
          $(event.currentTarget).addClass('correct');
          lock = true;
          score += guesses;
        } else {
          $(event.currentTarget).addClass('wrong');
          score -= 1;
        }
        break;
      case "B":
        if (countryNames[1] === correctAnswer) {
          $(event.currentTarget).addClass('correct');
          lock = true;
          score += guesses;
        } else {
          $(event.currentTarget).addClass('wrong');
          score -= 1;
        }
        break;
      case "C":
        if (countryNames[2] === correctAnswer) {
          $(event.currentTarget).addClass('correct');
          lock = true;
          score += guesses;
        } else {
          $(event.currentTarget).addClass('wrong');
          score -= 1;
        }
        break;
      case "D":
        if (countryNames[3] === correctAnswer) {
          $(event.currentTarget).addClass('correct');
          lock = true;
          score += guesses;
        } else {
          $(event.currentTarget).addClass('wrong');
          score -= 1;
        }
        break;
      }

      /* Subtract one from guesses */
      guesses -= 1;

      /* Check if this was the last guess
         If so: Lock the game and give all buttons the correct
         border (meaning one button gets set to .correct and the
         rest gets set to .wrong), revealing the correct answer */
      if (guesses == 0) {
        lock = true;
        $(event.currentTarget).siblings().addClass('wrong');
        switch (correctAnswer){
          case countryNames[0]:
            $("#A").removeClass('wrong');
            $("#A").addClass('correct');
            break;
          case countryNames[1]:
            $("#B").removeClass('wrong');
            $("#B").addClass('correct');
            break;
          case countryNames[2]:
            $("#C").removeClass('wrong');
            $("#C").addClass('correct');
            break;
          case countryNames[3]:
            $("#D").removeClass('wrong');
            $("#D").addClass('correct');
        }
      }

      /* Update the score and guesses */
      document.getElementById("score").innerHTML = "Score: " + score;
      document.getElementById("guess").innerHTML = "Guesses: " + guesses;
    }
}

/* This is the reset function for the "NEXT" button
   it allows users to play more than once and keep track of
   their score */
function randomize() {
  /* First, all borders are removed from the buttons to clear the styling */
  $(event.currentTarget).parents().siblings().children().removeClass('correct');
  $(event.currentTarget).parents().siblings().children().removeClass('wrong');

  /* Then, the arrays countries and countryNames are reset */
  countries = [
    "Austria",
    "Belgium",
    "The Netherlands",
    "France",
    "Germany",
    "Liechtenstein",
    "Luxembourg",
    "Monaco",
    "Switzerland"
  ];
  countryNames = [];

  /* guesses and lock are also reset to default values
     note that score does not get reset, as we want to keep counting
     the score */
  guesses = 2;
  lock = false;

  /* finally we run the startup again */
  start();
}
