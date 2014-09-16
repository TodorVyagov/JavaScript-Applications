/// <reference path="libs/require.js" />
/// <reference path="libs/jquery-2.0.2.js" />
/// <reference path="libs/q.js" />

define(['q', 'jquery'], function (Q) {
    var HttpModule = (function () {
        var endpointUrl = 'http://crowd-chat.herokuapp.com/posts';
        function httpRequest(method, data) {
            var deferred = Q.defer();

            $.ajax({
                url: endpointUrl,
                type: method,
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (err) {
                    deferred.reject(err);
                }

            });

            return deferred.promise;
        }

        function get() {
            return httpRequest('GET');
        }

        function post(data) {
            return httpRequest('POST', data);
        }

        return {
            Get: get,
            Post: post
        };
    }());

    return HttpModule;
});