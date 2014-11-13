/**
 * Created by v.stokolosa on 11/10/14.
 */

var GAME = GAME || {};

/**
 * Canvas
 */
var canvas = document.getElementById('snake-game'),
    ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;


GAME.start = (function () {

    //strict mode
    'use strict';

    var api = {};

    //init
    api.init = function () {
        this.drawBoard();
    };


    api.drawBoard = function () {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#717171';
        ctx.lineWidth = '3';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    };

    api.createSnake = function () {
        ctx.fillRect()

    };

    api.init();
}());
