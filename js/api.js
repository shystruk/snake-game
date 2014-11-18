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
        $this,
        scoreText = document.querySelector('#score'),
        score = 0;

    //init
    api.init = function () {
        $this = this;
        key = 'right';

        this.drawBoard();
        this.createSnake();
        this.createFood();
        document.onkeydown = api.keyPress;

        setInterval(function () {
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


    api.keyPress = function (e) {
        if (!e) {
            var e = window.event;
        }

        switch (e.keyCode) {
        case 37:
            key = 'left';
            break;
        case 38:
            key = 'up';
            break;
        case 39:
            key = 'right';
            break;
        case 40:
            key = 'down';
            break;
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

    //call init function
    api.init();
}());
