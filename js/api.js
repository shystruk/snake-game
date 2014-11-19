/**
 * Created by v.stokolosa on 11/10/14.
 */

var GAME = GAME || {};

/**
 * Canvas
 */
var canvas = document.getElementById('snake-game'),
    ctx = canvas.getContext('2d'),
    snakeSize = 20;
canvas.width = 600;
canvas.height = 600;


GAME.start = (function () {

    //strict mode
    'use strict';

    var api = {},
        array_snake,
        food,
        key,
        keyPress,
        $this,
        replayAction,
        isGameOver,
        finalScore,
        scoreText = document.querySelector('#score'),
        restartBtn = document.querySelector('.restart'),
        score = 0;

    //init
    api.init = function () {
        $this = this;
        key = 'right';
        isGameOver = false;

        this.drawBoard();
        this.createSnake();
        this.createFood();
        this.restartGame();
        document.onkeydown = api.keyPress;

        replayAction = setInterval(function () {
            $this.startGame();
        }, 100);
    };


    /**
     * Draw Board
     */
    api.drawBoard = function () {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#717171';
        ctx.lineWidth = '3';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };


    /**
     * Create Snake
     */
    api.createSnake = function () {
        var i;

        array_snake = [];

        for (i = 2; i >= 0; i--) {
            array_snake.push({xPosition: i, yPosition: 0});
        }
    };


    /**
     * Create Food
     */
    api.createFood = function () {
        food = {
            xPosition: Math.round(Math.random() * (canvas.width - snakeSize) / snakeSize),
            yPosition: Math.round(Math.random() * (canvas.height - snakeSize) / snakeSize)
        };
    };


    /**
     * Paint Box
     */
    api.paintBox = function (xPos, yPos) {
        ctx.fillStyle = '#000';
        ctx.fillRect(xPos * snakeSize, yPos * snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(xPos * snakeSize, yPos * snakeSize, snakeSize, snakeSize);
    };


    /**
     * Key Press
     */
    api.keyPress = function (e) {
        if (!e) {
            var e = window.event;
        }

        keyPress = e.keyCode;

        if (keyPress === 37 && key !== 'right') {
            key = 'left';
        } else if (keyPress === 38 && key !== 'down') {
            key = 'up';
        } else if (keyPress === 39 && key !== 'left') {
            key = 'right';
        } else if (keyPress === 40 && key !== 'up') {
            key = 'down';
        }
    };


    /**
     * Start Game
     */
    api.startGame = function () {
        var posX, posY, snakeTail,
            paintB, i, len;

        //update board
        api.drawBoard();

        posX = array_snake[0].xPosition;
        posY = array_snake[0].yPosition;

        //check what key was press
        if (key === 'right') {
            posX++;
        } else if (key === 'left') {
            posX--;
        } else if (key === 'down') {
            posY++;
        } else if (key === 'up') {
            posY--;
        }

        //check end of the canvas
        if (posX >= canvas.width / snakeSize || posX <= -1 || posY >= canvas.width / snakeSize || posY <= -1) {
            api.gameOver();
        }

        //if snake has the same position like food, we will eat her
        if (posX === food.xPosition && posY === food.yPosition) {
            snakeTail = {
                xPosition: posX,
                yPosition: posY
            };

            //update score
            score++;

            //create new food
            api.createFood();
        } else {
            //remove the last box
            snakeTail = array_snake.pop();

            snakeTail.xPosition = posX;
            snakeTail.yPosition = posY;
        }

        //add new box
        array_snake.unshift(snakeTail);

        //remove snake and food
        if (isGameOver === true) {
            return false;
        }

        //paint snake
        for (i = 0, len = array_snake.length; len > i; i++) {
            paintB = array_snake[i];

            api.paintBox(paintB.xPosition, paintB.yPosition);
        }

        //paint food
        api.paintBox(food.xPosition, food.yPosition);

        //add points to score
        scoreText.innerHTML = score;
    };


    /**
     * Game Over
     */
    api.gameOver = function () {
        isGameOver = true;
        finalScore = scoreText.innerHTML;

        //clear Time Out
        clearInterval(replayAction);

        //show text about finished Game
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.font = "70px Georgia";
        ctx.fillText("Game Over", 135, 300);
        ctx.font = "20px Georgia";
        ctx.fillText("Your score:", 250, 400);
        ctx.font = "50px Georgia";
        ctx.fillText(finalScore, 290, 460);
    };


    /**
     * Restart Game
     */
    api.restartGame = function () {
        restartBtn.addEventListener('click', function () {
            score = 0;
            scoreText.innerHTML = score;

            clearInterval(replayAction);
            api.init();
        });
    };

    //call init function
    api.init();
}());
