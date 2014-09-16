(function () {
    // generate number to guess
    function numberToGuessGenerator() {
        if (typeof String.prototype.startsWith != 'function') {
            String.prototype.startsWith = function (str) {
                return this.indexOf(str) == 0;
            };
        }

        function generateRandomNumber() {
            //for non repeating numbers
            var min = 1234;
            var max = 9876;
            var number = Math.floor(Math.random() * (max - min + 1));
            return number;
        }

        var numberArray = [];
        do {
            numberArray = convertNumberToArray(generateRandomNumber());
        } while (!isValidNumber(numberArray));

        return numberArray;
    }

    function convertNumberToArray(number) {
        var numberArr = [];
        for (var i = 3; i >= 0; i--) {
            var digit = number % 10;
            numberArr[i] = digit;
            number = Math.floor(number / 10);

        }

        return numberArr;
    }

    function isValidNumber(numberArr) {
        if (numberArr[0] === 0) {
            return false;
        }

        for (var i = 0; i < numberArr.length - 1; i++) {
            for (var j = i + 1; j < numberArr.length; j++) {
                if (numberArr[i] === numberArr[j]) {
                    return false;
                }
            }
        }

        return true;
    }

    function onClickGetUserInputNumber() {
        var input = document.getElementById('guess');
        if (input.value.length !== 4) {
            input.value = '';
            alert('Enter a four digit number!');
            return;
        }

        var number = Number(input.value);
        var numberArr = convertNumberToArray(number);
        if (!isValidNumber(numberArr)) {
            input.value = '';
            alert('Enter a valid number! Non repeating digits and no leading zero!');
            return;
        }

        input.value = '';
        playSheepAndRams(numberArr);
    }

    function onClickStartNewGame() {

        console.clear();
        var notes = document.getElementById('notes');
        notes.innerHTML = '';
        console.log('New game');
        number = numberToGuessGenerator();
    }

    function onClickShowScores() {
        if (!localStorage.length || localStorage.length == 0) {
            document.getElementById('notes').innerHTML = 'No scores!';
            return;
        }
        var resultHTML = "<ul>";
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);

            if (key.startsWith('SheepAndRams')) {
                var nick = key.substring('SheepAndRams'.length);
                resultHTML +=
                '<li>' +
                'Player: <strong>' + nick + '</strong> - Result: <strong>' + localStorage.getItem(key) + '</strong>' +
                '</li>';
            }
        }

        resultHTML += "</ul>";
        document.getElementById("notes").innerHTML = resultHTML;
    }

    function showScore(guessnumber, numberOfRams, numberOfSheep) {
        var message = guessnumber.join('') + ' -> Rams: ' + numberOfRams + ', Sheep: ' + numberOfSheep;
        console.log(message);
        var notes = document.getElementById('notes');
        notes.innerHTML += message + '<br />';
    }

    function showFinalResult(guesses) {
        console.log('You win!!! Guesses needed: ' + guesses);
        var userNickname = prompt('Enter your name: ');
        localStorage.setItem(('SheepAndRams' + userNickname), guesses);
    }

    function countBovine(num, guess) {
        var count = { rams: 0, sheep: 0 };
        var g = guess.join('');
        for (var i = 0; i < num.length; i++) {
            var digPresent = g.indexOf(num[i]) !== -1;

            if (num[i] === guess[i]) {
                count.rams++;
            }
            else if (digPresent) {
                count.sheep++;
            }
        }

        return count;
    }

    var submitButton = document.getElementById('guess-button');
    submitButton.addEventListener('click', onClickGetUserInputNumber);

    var newGameButton = document.getElementById('new-game-button');
    newGameButton.addEventListener('click', onClickStartNewGame);

    var showScoresButton = document.getElementById('show-scores-button');
    showScoresButton.addEventListener('click', onClickShowScores);

    var number = numberToGuessGenerator();
    var numberOfGuesses = 0;
    console.log(number);

    function playSheepAndRams(guess) {
        len = 4;
        numberOfGuesses++;
        var census = countBovine(number, guess);
        showScore(guess, census.rams, census.sheep);
        if (census.rams === len) {
            showFinalResult(numberOfGuesses);
        }
    }
}());