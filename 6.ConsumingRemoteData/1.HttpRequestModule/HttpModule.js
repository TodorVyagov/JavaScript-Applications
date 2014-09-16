/// <reference path="\libs/q.js" />
/// <reference path="\libs/jquery-2.0.2.js" />

define(['q', 'jquery'], function(Q, $){
    var HttpModule = (function () {
        /// url is path to destination URL
        /// headers has to be an associative array(object with key: value pairs).
        function getJSON(url, headers) {
            var deferred = Q.defer();

            $.ajax({
                url: url,
                type: 'GET',
                beforeSend: function (request) {
                    for (var prop in headers) {
                        request.setRequestHeader(prop, headers[prop]);
                    }
                },
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (error) {
                    deferred.reject(error);
                }
            });
            
            return deferred.promise;
        }

        /// url is path to destination URL
        /// headers has to be an associative array(object with key: value pairs).
        function postJSON(url, data, headers) {
            var deferred = Q.defer();

            $.ajax({
                url: url,
                type: 'POST',
                beforeSend: function (request) {
                    for (var prop in headers) {
                        request.setRequestHeader(prop, headers[prop]);
                    }
                },
                data: data,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (error) {
                    deferred.reject(error);
                }
            });

            return deferred.promise;
        }

        return {
            getJSON: getJSON,
            postJSON: postJSON
        };
    }());

    return HttpModule;
});