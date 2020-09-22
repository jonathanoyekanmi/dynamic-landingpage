// Random Background Image on reload
const container = document.querySelector('.container');
const bgImg = [
  "linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url('imgs/bg1.jpg')",
  "linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url('imgs/bg2.jpg')",
  "linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url('imgs/bg3.jpg')",
  "linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url('imgs/bg4.jpg')",
  "linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url('imgs/bg5.jpg')",
  "linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url('imgs/bg6.jpg')"
];

function randomBg() {
  const randomBgImg = Math.floor(Math.random() * bgImg.length);
  container.style.backgroundImage = bgImg[randomBgImg];
}


// Call for random quote on each reload using an API
let random_quote = document.getElementById('random_quote');
function randomQuote() {
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/?",
    dataType: "jsonp",
    data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
    success: function (response) {
      random_quote.innerHTML = response.quoteText + "<br/>&dash; "
        + response.quoteAuthor + " &dash;"
    }
  });
}


$(function () {
  randomQuote();
});


// Get the current time display
const time = document.getElementById('time');
const greeting = document.getElementById('greeting');
const name = document.getElementById('name');
const focus = document.getElementById('focus');


//Display time
function displayTime() {
  let today = new Date();
  let hour = today.getHours();
  let min = today.getMinutes();


  // Display either AM or PM
  const amPM = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  //Display Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)} ${amPM}`;

  setTimeout(displayTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Greetings
function greet() {
  let today = new Date();
  let hour = today.getHours();
  if (hour < 12) {
    greeting.innerHTML = "Good Morning";
  } else if (hour < 18) {
    greeting.innerHTML = "Good Afternoon";
  } else {
    greeting.innerHTML = "Good Evening";
  }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.innerHTML = '[Enter Name]';
  } else {
    name.innerHTML = localStorage.getItem('name');
  }
}

// Set Name into LocalStorage
function setName(e) {
  if (e.type === 'keypress') {
    // For pressing the Enter key
    if (e.which == 13 || e.keyCode == 3) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

function getGoal() {
  if (localStorage.getItem('focus') === null) {
    focus.innerHTML = '[Write your goal for today]';
  } else {
    focus.innerHTML = localStorage.getItem('focus');
  }
}


// Set Goal into LocalStorage
function setGoal(e) {
  if (e.type === 'keypress') {
    // For pressing the Enter key
    if (e.which == 13 || e.keyCode == 3) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}


focus.addEventListener('keypress', setGoal);
focus.addEventListener('blur', setGoal);

// Run all function
displayTime();
greet();
getName();
getGoal();




