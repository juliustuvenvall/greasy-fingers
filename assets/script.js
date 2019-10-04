var fingerContainer = document.querySelector(".fingers");
var finger = document.querySelector(".finger");
var tavla = document.querySelector(".tavla img");
var scoreContainer = document.querySelector(".score h2");
var scoreContainer2 = document.querySelector(".score2 h1");



var gameOverScreen = document.querySelector(".gameover");

var timer = document.querySelector(".time h2");
var timeElapsed = 0;
var startTime = 30;
var score = 0;
var tavlor = ["https://cdn.glitch.com/c3da3878-bf2c-4d3b-a00d-2347c0e0dd9b%2FBILD_1_2.jpg?v=1570183661556","https://cdn.glitch.com/c3da3878-bf2c-4d3b-a00d-2347c0e0dd9b%2FBILD_1_3.jpg?v=1570184220838","https://cdn.glitch.com/c3da3878-bf2c-4d3b-a00d-2347c0e0dd9b%2FBILD_1_4.jpg?v=1570184463387","https://cdn.glitch.com/c3da3878-bf2c-4d3b-a00d-2347c0e0dd9b%2FBILD_1_5.jpg?v=1570184781833","https://cdn.glitch.com/c3da3878-bf2c-4d3b-a00d-2347c0e0dd9b%2FBILD_1_6.jpg?v=1570184904157"]
var interval;
var increaseInterval;
var speedIncrease = 0;
var countFingers = 0;

if (document.querySelector('.start-button')) document.querySelector('.start-button').addEventListener('click', startGameListener);

function startGameListener(e){
  document.body.classList.add('playing');
  startaSpelet();
}

if (tavla) tavla.parentNode.addEventListener("click", function(){
  gameOver();
});

function startaSpelet(){
  startTimer();
  slumpaTavla();
  interval = setInterval(gameloop,800-speedIncrease);
  increaseInterval = setInterval(function(){
    speedIncrease += 70;
    clearInterval(interval);
    interval = setInterval(gameloop,800-speedIncrease);
  },3000);
}

function gameloop(){
  slumpaFinger();
    countFingers++;
    if (countFingers==6) {
      gameOver();
    } 
}

function gameOver(){
  gameOverScreen.style.display = "block";
}

function startTimer(){
  setInterval(function(){
    timer.innerHTML = startTime - timeElapsed;
    timeElapsed++;
    if (startTime - timeElapsed == 0){
      gameOver();
    }
  },1000);
}
function slumpaTavla(){
  var index = getRand(0,tavlor.length-1); 
  tavla.src = tavlor[index];
}
function slumpaFinger(){
  let nyttFinger = finger.cloneNode(true);
  fingerContainer.appendChild(nyttFinger);
  nyttFinger.style.left = getRand(window.innerWidth*0.15,window.innerWidth*0.85) + "px";
  var rot = getRand(0,360);
  var hojd = getRand(580,950);
  nyttFinger.style.transform = "translate(0px, " + hojd + "px)" + " rotate(" + rot + "deg) translate(0px, 1400px)";
  setTimeout(function(){
    nyttFinger.style.transition = 'transform 0.5s';
    nyttFinger.style.transform = "translate(0px,"+ hojd + "px) rotate(" + rot + "deg) translate(0px, 0px)";
  },200);
  var fingerScore = 1000;
  setInterval(function(){
    if (fingerScore > 0){
      fingerScore = fingerScore - 2;
    }
  },10)
  nyttFinger.onclick = function(){
    nyttFinger.parentNode.removeChild(nyttFinger);
    score = score + fingerScore;
    scoreContainer.innerHTML = score;
    scoreContainer2.innerHTML = score;
    countFingers--;
  }
}
function getRand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (document.querySelector('.osynlig-platta'))  document.querySelector('.osynlig-platta').addEventListener('click', scrollDown);
function scrollDown(e){
  document.querySelector('.play-button').scrollIntoView({behavior: "smooth"});
  //window.scrollTo(0,4000);
}
