//game constants and variables
let direction = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3'); 
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };

//game function
function main(ctime) {
    musicSound.play();
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollision(snake) {
    //if snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            // const element= snake[i];
            return true;
        }
    }
     //if snake collides with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    } 
    
}

function gameEngine() {
    //game logic
    //1. update snake and food
    if (isCollision(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
        direction = { x: 0, y: 0 }; // Reset direction
        alert("Game Over! Press any key to play again.");
        snakeArr = [{ x: 13, y: 15 }]; // Reset snake position
        food = { x: 6, y: 7 }; // Reset food position
        musicSound.play();
        
    }

    //If the snake has eaten the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1; 
        if (score > hiscorevalue) {
            hiscorevalue = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
            hiscoreBox.innerHTML = "High Score: " + hiscorevalue; // Update high score display
        }
        scoreBox.innerHTML = "Score: " + score; // Update score display
        snakeArr.unshift({
            x: snakeArr[0].x + direction.x,
            y: snakeArr[0].y + direction.y
        });
        let a=2; 
        let b=16;
        food = {
            x: Math.round(a+ (b-a)*Math.random()),
            y: Math.round(a+ (b-a)*Math.random())
        }
    }

    //Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i]};
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    //2. display snake and food
    //Display the snake
    board.innerHTML = ""; // Clear the board
    snakeArr.forEach((e,index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index==0){
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    });

    //Display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}


//main function to run the game
// musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscorevalue = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
}
else {
    hiscorevalue = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscorevalue;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    direction = { x: 0, y: 1 }; //default direction is down
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight"); 
            direction.x = 1;
            direction.y = 0;
            break;
            
        default:
            break;
    }
})


