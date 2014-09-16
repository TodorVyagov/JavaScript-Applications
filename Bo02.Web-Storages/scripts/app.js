(function () {
    'use strict';
    require.config({
        paths: {
            'game': 'game/game'
        }
    });

    require(['game'], function (Game) {
            var len = 4;
            var newGame = new Game(len);
           newGame.PlaySheepsAndRams();
           //document.querySelector('#wrapper').appendChild(game);
        }
    );
}());