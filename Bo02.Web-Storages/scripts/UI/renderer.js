define(['libs/underscore-min'], function (underscore) {
    'use strict';
    var Renderer = (function () {

        var headDomElement = document.createElement("div");
        var wrapper = document.getElementById('wrapper');
        var finalResult = document.createElement("div");

        headDomElement.setAttribute('id', 'description');
        /*headDomElement.style.backgroundColor = '#d2ecf8';
         headDomElement.style.position = 'relative';
         headDomElement.style.width = '500px';*/

        function showInstructions(len) {
            var instructions;
            instructions = 'Rams and Sheeps Game \r You must guess the ' + len + ' digit number I am thinking of. \r The number is composed of the digits 1-9.\r No digit appears more than once.\r After each of your guesses, I will tell you:\rThe number of rams (digits in right place)\rThe number of sheeps (correct digits, but in the wrong place)';
            headDomElement.innerText = instructions;
            wrapper.insertBefore(headDomElement, wrapper.firstChild);
        }

        function showScore(nRams, nSheep) {
            var scoreContainer = document.createElement("div");
            scoreContainer.innerText = ('    Rams: ' + nRams + ', Sheeps: ' + nSheep);
            wrapper.appendChild(scoreContainer);
        }

        function showFinalResult(guesses) {
            finalResult.innerText = ('You win!!! Guesses needed: ' + guesses );
            wrapper.insertBefore(finalResult, wrapper.firstChild);
        }

        var Renderer = function () {

        };

        Renderer.prototype = {
            showInstructions: showInstructions,
            showScore: showScore,
            showFinalResult: showFinalResult
        };

        return Renderer;
    }());

    return Renderer;
});


