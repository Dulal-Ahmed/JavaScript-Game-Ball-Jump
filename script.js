 const board = document.getElementById('board');
 const ball = document.getElementById('ball');
 const stone = document.getElementById('stone');
 const score = document.getElementById('score');
 const yourScore = document.getElementById('yourScore');
 const containre = document.querySelector('.container');
 
 let boardPosition;
 let stonePosition;
 let ballPosition;

 let gameScore =0;
 
 let leftValue =-80;
 const allStones = ['stone1', 'stone2', 'stone3','stone4','stone5']; 
 let balljump = false;
 let bottomValue = 0;
 let isGameOver = false; 
  window.onload = function(){
   boardPosition = board.getBoundingClientRect();
   ballPosition = ball.getBoundingClientRect();
   stonePosition = stone.getBoundingClientRect();

   if(boardPosition.width > boardPosition.height){
      ball.style.width = 10 + 'vh';
      ball.style.height = 10 + 'vh';

      stone.style.width = 15 + 'vh';
      stone.style.height = 15 + 'vh';

   }
   if(boardPosition.width < boardPosition.height){
      ball.style.width = 6 + 'vw';
      ball.style.height = 6 + 'vw';

      stone.style.width = 10 + 'vw';
      stone.style.height = 10 + 'vw';
   }
  }
 ball.className = "ballAnimation";

 let ballLeftRightMove = 50;
 function gameloop(){
    requestAnimationFrame(gameloop);
    
    if(!isGameOver){
    boardPosition = board.getBoundingClientRect();
    ballPosition = ball.getBoundingClientRect();
    stonePosition = stone.getBoundingClientRect();
    gameScore++;
    score.textContent = gameScore;
    
    //Ball left to right movement
    ball.style.left = ballLeftRightMove + "px";
    //Ball Jump
   if(balljump){
    bottomValue +=8;
   }
   if(bottomValue > 200){
      balljump = false;
   }
   if(!balljump && bottomValue > 0){
      bottomValue -= 5;
   }
   ball.style.bottom = bottomValue + "px";
// Stone left to right movement
   leftValue -=5;
   if(leftValue + stonePosition.width < 0){
     let randomIndex = Math.floor(Math.random() * allStones.length);
     stone.src = allStones[randomIndex] + '.png';
      leftValue = boardPosition.width;
   }
   stone.style.left = leftValue + "px";
   if(
      ballPosition.left + ballPosition.width > stonePosition.left &&
      ballPosition.left < stonePosition.left + stonePosition.width &&
      ballPosition.top + ballPosition.height -20 > stonePosition.top
   ){
      isGameOver = true;
        ball.className = " ";
        yourScore.textContent = gameScore;
        containre.style.display = "block";
   }
}

 }
 gameloop();
 document.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowUp'){
     balljump = true;   
    }
    if(e.code == 'ArrowRight'){
      ballLeftRightMove += 8;
    }
    if(e.code == 'ArrowLeft'){
       ballLeftRightMove -= 8;
    }
    if(e.code == 'Space' && isGameOver){
       isGameOver = false;
       gameScore = 0;
       score.innerText = 0;
       yourScore.innerText = 0;
       containre.style.display = "none";
       ballLeftRightMove = 50;
       leftValue =-80;
       balljump = false;
       bottomValue = 0; 
       ball.className = "ballAnimation";
    }
 });
 function gameReStart(){
   isGameOver = false;
   gameScore = 0;
   score.innerText = 0;
   yourScore.innerText = 0;
   containre.style.display = "none";
   ballLeftRightMove = 50;
   leftValue =-80;
   balljump = false;
   bottomValue = 0; 
   ball.className = "ballAnimation";
 }

 ball.addEventListener('touchmove',()=>{
   balljump = true;
 })