let userScore = 0;
let compScore = 0;
const [userScore_span, , compScore_span] = document.getElementsByClassName(
  'score'
);
const notification_div = document.getElementById('notification');
const userOptions_div = document.querySelectorAll('#user .icon');
const compImage = document.querySelector('#comp-choice img');
const [userNotif, compNotif] = document.getElementsByClassName('choice');
const button = document.querySelector('.game-button');
let buttonInner = button.innerHTML;
let gameState = false;
const userLabel = document.getElementById('you');
const compLabel = document.getElementById('comp');

notification_div.style.display = 'none';
reset();

function reset() {
  userNotif.style.display = 'none';
  compNotif.style.display = 'none';
  userScore = 0;
  compScore = 0;
  userScore_span.innerHTML = userScore;
  compScore_span.innerHTML = compScore;
  userLabel.style.backgroundColor = 'transparent';
  compLabel.style.backgroundColor = 'transparent';
  compImage.style.display = 'none';
}

function newGame() {
  buttonInner = 'NEW GAME';
  button.innerHTML = buttonInner;
  button.style.opacity = '1';
  button.style.cursor = 'pointer';
}

function startGame() {
  if (!gameState && buttonInner === 'START') {
    gameState = true;
    notification_div.style.display = 'block';
    notification_div.innerHTML = "let's go";
    button.style.opacity = '0';
    button.style.cursor = 'default';
  }
  if (!gameState && buttonInner === 'NEW GAME') {
    reset();
    buttonInner = 'START';
    button.innerHTML = buttonInner;
  }
}

button.addEventListener('click', startGame);

// get random value for computer
function compChoice() {
  const compOptions = ['rock', 'paper', 'scissors'];
  const random = Math.floor(Math.random() * 3);
  return compOptions[random];
}

function changeCompImage(choice) {
  compImage.setAttribute('src', `${choice}.png`);
}

// you choose & comp choose
function changeLabel(user, comp) {
  userNotif.style.display = 'block';
  compNotif.style.display = 'block';
  userNotif.innerHTML = user;
  compNotif.innerHTML = comp;
}

// win
function resultWin(object) {
  userScore++;
  userScore_span.innerHTML = userScore;
  object.classList.add('winClass');
  setTimeout(function() {
    object.classList.remove('winClass');
  }, 250);
  notification_div.innerHTML = "it's just luck";
}

// lose
function resultLose(object) {
  userScore--;
  compScore++;
  userScore_span.innerHTML = userScore;
  compScore_span.innerHTML = compScore;
  object.classList.add('loseClass');
  setTimeout(function() {
    object.classList.remove('loseClass');
  }, 250);
  notification_div.innerHTML = 'Tough Luck';
}

// draw
function resultDraw(object) {
  object.classList.add('drawClass');
  setTimeout(function() {
    object.classList.remove('drawClass');
  }, 250);
  notification_div.innerHTML = 'Alright!';
}

// stop game when reach 20
function stopWin() {
  gameState = false;
  notification_div.innerHTML = 'Okay, You win';
  userLabel.style.backgroundColor = 'rgba(35, 236, 9, 0.822)';
  newGame();
}

// stop game when lose
function stopLose() {
  gameState = false;
  notification_div.innerHTML = 'HA.HA..LOSER';
  compLabel.style.backgroundColor = 'rgba(35, 236, 9, 0.822)';
  newGame();
}

// play program
function play() {
  if (gameState) {
    const userValue = this.id;
    const obj = this;
    const compValue = compChoice();
    const compare = {
      rock: { rock: 'draw', paper: 'lose', scissors: 'win' },
      paper: { rock: 'win', paper: 'draw', scissors: 'lose' },
      scissors: { rock: 'lose', paper: 'win', scissors: 'draw' }
    };
    const result = compare[userValue][compValue]; // select result based on Compare Object
    changeLabel(userValue, compValue);
    changeCompImage(compValue);
    compImage.style.display = 'block';
    if (result === 'win') {
      resultWin(obj);
    } else if (result === 'lose') {
      resultLose(obj);
    } else {
      resultDraw(obj);
    }

    if (userScore === 10) {
      stopWin();
    } else if (compScore === 10 || userScore === -10) {
      stopLose();
    }
  }
}

// clickToPlay
userOptions_div.forEach(function(option) {
  option.addEventListener('click', play);
});
