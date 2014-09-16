/// <reference path="StudentAPI.js" />
/// <reference path="\libs/require.js" />
(function () {
    require.config({
        paths: {
            'jquery': 'libs/jquery-2.0.2',
            'q': 'libs/q',
            'student': 'StudentAPI'
        }
    });

    require(['student', 'q'], function (StudentAPI, Q) {
        Q.all([
            StudentAPI.POST({ name: 'Pesho', grade: 4 }),
            StudentAPI.POST({ name: 'Gosho', grade: 12 }),
            StudentAPI.POST({ name: 'Milko', grade: 5 }),
            StudentAPI.POST({ name: 'Ivan', grade: 7 }),
            StudentAPI.POST({ name: 'Ivaylo', grade: 2 }),
        ])
        .then(function (data) {
            console.log('Initialized students');
            console.log(data);
        })
        .then(StudentAPI.DELETE(3)
            .then(StudentAPI.GET()
                .then(function (data) {
                    console.log('Student with ID=3 is deleted.');
                    console.log(data);
                }),
                function (err) {
                    console.log('ERROR!');
                    console.log(err);
                }));
        
        // it is not working the way I want.
        // Create all students,-> print them, -> delete No.3 -> print them again.

        console.log(12345);
    });
}());