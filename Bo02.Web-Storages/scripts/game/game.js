define(['libs/underscore-min', 'UI/renderer', 'storage/storage'], function (underscore, Render, StorageHandler) {
    'use strict';

    var Game = (function () {
        var container = document.createElement('div');
        var wrapper = document.getElementById('wrapper');
        var guessButton = document.getElementById('guess-button');
        var userName = document.getElementById('input-submit-name');
        var nameButton = document.getElementById('get-name-button');
        var scores = document.querySelectorAll(".class");
        var topScores = document.querySelector("top-score");
        var localStorageName = 'SheepAndRamsGame';
        var storage = new StorageHandler(localStorageName);

        for (var i = 0; i < scores.length; i++) {
            scores[i].style.display = 'none';
        }

        function GenerateNumber(len) {
            var numbers, number;
            numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            number = _.shuffle(numbers).slice(0, len);
            return number;
        }

        function getGuess(nGuesses, len) {
            var guess = document.getElementById('input-number').value;
            var result = document.createElement('div');

            result.innerText = ('Your guess #' + nGuesses + ': ' + ' ' + guess);

            guess = String(parseInt(guess)).split('');

            if (guess.length != len) {
                result.innerText = ('  You must enter a ' + len + ' digit number.');
            }
            if (hasDups(guess)) {
                result.innerText += ('  No digits can be duplicated.');
            }
            wrapper.appendChild(result);
            return guess;
        }

        function hasDups(ary) {
            var t = ary.concat().sort();
            for (var i = 1; i < t.length; i++) {
                if (t[i] == t[i - 1]) return true;
            }
            return false;
        }

        function countBovine(number, guess) {
            var count = {rams: 0, sheeps: 0};
            var g = guess.join('');

            for (var i = 0; i < number.length; i++) {
                var digPresent = g.search(number[i]) != -1;
                if (number[i] == g[i]) {
                    count.rams++
                } else if (digPresent) {
                    count.sheeps++
                }
            }

            return count;
        }

        /* function getNameOfUser(guesses) {
         var name = document.getElementById('get-name-input').value;

         //storage.setObject(name, guesses);
         storage.setObject(name, guesses);
         showScores();
         }*/

       /* function showScores() {

           // var data = storage.getHighScores();
            topScores.innerText += data;
            wrapper.appendChild(topScores);
        }*/

        var Game = function (len) {
            this._len = len;
        };

        Game.prototype = {
            PlaySheepsAndRams: function () {
                var number, len, guesses, render;


                len = this._len;
                render = new Render;
                render.showInstructions(len);
                //number = GenerateNumber(len);
                number = [1,2,3,4];
                guesses = 0;
				
                function onButtonClick() {
                    guesses++;
                    var guess = getGuess(guesses, len);
                    var census = countBovine(number, guess);
                    render.showScore(census.rams, census.sheeps, guess);
                    if (census.rams === len) {
                        for (var i = 0; i < scores.length; i++) {
                            scores[i].style.display = 'block';
                        }
                        storage.getHighScores();
                    }
                }
				
                guessButton.addEventListener('click', onButtonClick, false);
                nameButton.addEventListener('click', function () {
                    var name = document.getElementById('get-name-input').value;
                   // showScores();
                    storage.setObject(name, guesses);

                }, false);
            }
        };

        return Game;
    }());

    return Game;
})
;

