let canvas = document.getElementById ("snake");
let context = canvas.getContext("2d");
let box = 30;
let snake = [];
let controle = "andamento";
let popup = document.getElementById ("pop_up").style.zIndex = "-1"

snake [0] = {
    x: 8 * box,
    y: 8 * box,
}

let direction = "right";
let food = {
    x: Math.floor(Math.random () * 15 + 1) * box,
    y: Math.floor(Math.random () * 15 + 1) * box,
}

function criarBG (){
    context.fillStyle = '#e4f2f7';
    context.fillRect (0, 0, 16 * box, 16 * box);
}

function criarCobrinha (){
    for (i=0; i<snake.length; i++){
        context.fillStyle = '#b6d3a8';
        context.fillRect(snake[i].x, snake[i].y,box,box);
    }

}

function drawnFood (){
    context.fillStyle = '#ff574d';
    context.fillRect (food.x, food.y, box, box);
}

document.addEventListener('keydown',update);

function update (event){

    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
    if (event.keyCode == 32 && controle == "andamento") controle = "pausa";
    else if (event.keyCode == 32 && controle == "pausa") controle = "andamento"; 
    if (controle == "andamento") document.getElementById ("pop_up").style.zIndex = "-1";
    if (controle == "pausa") document.getElementById ("pop_up").style.zIndex = "1";
} 


function iniciarJogo (){

    if (controle == "andamento"){
    
    if (snake[0].x > 15 * box ) snake [0].x = 0;
    if (snake[0].x < 0 ) snake [0].x = 15 * box;
    if (snake[0].y > 15 * box ) snake [0].y = 0;
    if (snake[0].y < 0 ) snake [0].y = 15 * box;

    for (i= 1; i<snake.length; i++){
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval (jogo);
            food = [];
            document.getElementById ("gameOver").style.zIndex = "1";
        }
    }

    criarBG ();
    criarCobrinha ();
    drawnFood ();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box; 
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    if (snakeX != food.x || snakeY != food.y){
        snake.pop ();
    } else {
        food.x = Math.floor(Math.random () * 15 + 1) * box;
        food.y = Math.floor(Math.random () * 15 + 1) * box;
        document.getElementById("marcaPonto").innerHTML = snake.length;
    }


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
    } 
         

}

function reiniciar (){
    snake = [];
    snake [0] = {
        x: 8 * box,
        y: 8 * box,
    }
    document.getElementById("marcaPonto").innerHTML = 0;
    document.getElementById ("gameOver").style.zIndex = "-1";
    jogo = setInterval(iniciarJogo, 140);
    food = {
        x: Math.floor(Math.random () * 15 + 1) * box,
        y: Math.floor(Math.random () * 15 + 1) * box,
    }
}

let jogo = setInterval(iniciarJogo, 140);
