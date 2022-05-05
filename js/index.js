// Game constants & var
let inputDir ={x:0,y:0};
const foodSound = new Audio("../music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let snakeArr=[
    {x:13,y:15}
]
let isMute=true;
let score = 0;
let food={x:8,y:5};
let lastPaintTime=0;
let speed= 2;
// Game functions
function main(ctime){
    
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<1/speed)
    return
    else{
        lastPaintTime=ctime;
        gameEngine();
    }
}
//to check whether snake is collided or not
function isCollide(){
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x===snakeArr[0].x&&snakeArr[i].y===snakeArr[0].y){
            return true;
        }  
    }
    if(snakeArr[0].x>=18 || snakeArr[0].x<=0|| snakeArr[0].y>=18||snakeArr[0].y<=0)
    return true;

    return false;
}

function gameEngine(){
   
    //part 1- updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir ={x:0,y:0}
        alert("Game Over. Press any key to play again");
        if(!isMute){
            musicSound.play();
        } 
        snakeArr =[{x:13,y:15}];
        score = 0;    
    }
    // if snake eat food
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        score++;
        scorebox.innerHTML="Score: "+score;
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
        let a=2;
        let b= 16;
        food={x:Math.round(a+(b-a)* Math.random()), y:Math.round(a+(b-a)* Math.random())}
    }
    for(let index= snakeArr.length-2; index>=0;index--){
        snakeArr[index+1]={...snakeArr[index]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
     // part 2- Display snake and food
    board.innerHTML ="";
    snakeArr.forEach((i,index)=>{
         snakeElement = document.createElement('div');
         snakeElement.style.gridRowStart =i.y;
         snakeElement.style.gridColumnStart =i.x;
         if(index===0)
         snakeElement.classList.add('head');
         else
         snakeElement.classList.add('snake');
         
         board.appendChild(snakeElement);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart= food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


document.getElementById("sound").addEventListener("click",e=>{
    if(isMute){
        musicSound.play();
        document.getElementById("sound").src = "img/volume-medium.svg";
    } 
    else{
        musicSound.pause();
        document.getElementById("sound").src = "img/volume-mute2.svg";
    }
    isMute=!isMute;
})

//main logic starts here
window.requestAnimationFrame(main);

window.addEventListener("keydown", e=>{
    inputDir={x:0,y:1};
    moveSound.play();
    switch(e.key){
        case "ArrowUp": console.log("ArrowUp");
        inputDir.x=0;
        inputDir.y=-1;
        break;
        case "ArrowDown": console.log("ArrowDown");
        inputDir.x=0;
        inputDir.y=1;
        break;
        case "ArrowLeft": console.log("ArrowUp");
        inputDir.x=-1;
        inputDir.y=0;
        break;
        case "ArrowRight": console.log("ArrowDown");
        inputDir.x=1;
        inputDir.y=0;
        break;
        default:
            break;
    }
})