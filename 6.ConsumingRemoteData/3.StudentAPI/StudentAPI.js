/// <reference path="\libs/jquery-2.0.2.js" />
/// <reference path="\libs/require.js" />
define(['jquery', 'q'], function ($, Q) {

    var StudentAPI = (function () {
        var resourceUrl = 'http://localhost:3000/students';

        function validateStudent(student) {
            if (!student) {
                throw { message: 'You must enter student as parameter.' };
            }
            else if (!student.name || !student.grade) {
                throw { message: 'Student must have name and grade!' };
            }
            else if (typeof student.name !== 'string') {
                throw { message: 'Invalid student name!' };
            }

            validateNumber(student.grade, 'grade');
        }

        function validateNumber(number, msg) {
            if (typeof number !== 'number' || parseInt(number) !== number || number < 1) {
                throw {
                    message: 'Invalid student ' + msg + '! ' + msg + ' must be non negative integer number.'
                };
            }
        }

        function Get() {
            var deferred = Q.defer();

            $.ajax({
                url: resourceUrl,
                type: 'GET',
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (error) {
                    deferred.reject(error);
                }
            });

            return deferred.promise;
        }

        function Post(student) {
            var deferred = Q.defer();
            validateStudent(student);

            $.ajax({
                url: resourceUrl,
                type: 'POST',
                data: student,
                success: function (data) {
                    deferred.resolve(data);
                },
                error: function (error) {
                    deferred.reject(error);
                }
            });

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = Q.defer();
            validateNumber(id, 'ID');

            $.ajax({
                url: resourceUrl + '/' + id,
                type: 'POST',
                data: { _method: 'delete' },
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
            GET: Get,
            POST: Post,
            DELETE: Delete
        };
    }());

    return StudentAPI;
});