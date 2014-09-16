/// <reference path="libs/require.js" />
/// <reference path="http-module.js" />
/// <reference path="libs/jquery-2.0.2.js" />
(function () {
    require.config({
        paths: {
            jquery: 'libs/jquery-2.0.2',
            mustache: 'libs/mustache',
            sammy: 'libs/sammy',
            q: 'libs/q',
            request: 'libs/http-module'
        }
    });

    require(['jquery', 'request', 'q', 'sammy', 'mustache'], function ($, request, Q, sammy, mustache) {
        var nick;

        var app = sammy('#main-content', function () {
            this.get('#/home', function () {
                $('#main-content').load('partials/home.html');
            });

            this.get('#/chat', function () {
                $.ajax({
                    url: 'partials/chat.html',
                    type: 'GET',
                    success: function (data) {
                        var $container = $('<div>').append(data);
                        $container.find('#send-message').on('click', function () {
                            var message = $('#current-message').val();
                            request.Post({
                                user: 'UniqueTestingUser',
                                text: message
                            });
                        });

                        $('#main-content').parent().append($container);
                        setInterval(refreshMessages, 4000);
                    }
                });

                function refreshMessages() {
                    request.Get("api/students")
                        .then(function (data) {
                            if (data.length > 30) {
                                data = data.slice(data.length - 30)
                            }

                            var messagesList = $("<ul />").addClass("chat-container");
                            var templateString = $("#chat-message-template").html();
                            var template = mustache.compile(templateString);
                            for (var i = data.length; i >= 0; i -= 1) {
                                var message = data[i];
                                var templatedMessage = template(message);
                                var messageItem = $("<li />").addClass("student-item")
                                            .html(templatedMessage);
                                messagesList.append(messageItem);
                            }

                            $("#main-content").html(messagesList);
                        });
                }
            });
        });

        app.run('#/home');








        //request.Get()
        //    .then(function (data) {
        //        if (data) {
        //            console.log(data.slice());
        //        }
        //    }, 
        //    function (err) {
        //        console.log('ERROR');
        //        console.log(err);
        //    })

    });

}());