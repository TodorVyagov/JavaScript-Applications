/// <reference path="libs/require.js" />
(function () {
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.0.2',
            'q': 'libs/q',
            'http-module': 'HttpModule'
        }
    });

    require(['q', 'http-module'], function (Q, HttpModule) {
        // You have to start the server/app.js with Node in the SLN file directory.
        var serverUrl = 'http://localhost:3000/students';
        HttpModule.postJSON(serverUrl, { name: 'Pesho', grade: 6 })
            .then(HttpModule.getJSON(serverUrl, { 'Accept': 'application/json' }).
                    then(function (data) {
                        console.log(data);
                    }),
                function (error) {
                    console.log('ERROR:');
                    console.log(error);
                });
    });
}());