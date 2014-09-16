/// <reference path="D:\Todor\Telerik Software Academy\10.JavaScript-4Applications\02.UnderscoreJS\1-3.Students\underscore-min.js" />
(function () {
    'use strict';
    var Student = Object.create({
        init: function (fname, lname, age, marks) {
            this.firstName = fname;
            this.lastName = lname;
            this.age = age;
            this.marks = marks;
            return this;
        },
        toString: function () {
            return this.firstName + ' ' + this.lastName;
        }
    });

    var students = [
        Object.create(Student).init('Peter', 'Yavorov', 15, [5, 6, 4]),
        Object.create(Student).init('Ivan', 'Ivanov', 21, [3, 4, 4]),
        Object.create(Student).init('Peter', 'Petrov', 20, [3, 5, 2]),
        Object.create(Student).init('Kiril', 'Asenov', 25, [6, 5, 6]),
        Object.create(Student).init('Doncho', 'Minkov', 19, [4, 6, 6]),
        Object.create(Student).init('Nikolay', 'Kostov', 19, [5, 2, 6]),
        Object.create(Student).init('Todor', 'Stoyanov', 22, [5, 5, 5]),
        Object.create(Student).init('Ivaylo', 'Kenov', 28, [5, 4, 4])
    ];

    // Task 1.
    // Write a method that from a given array of students finds all students whose first name is before its last name alphabetically.
    // Print the students in descending order by full name. 
    console.log('Task 1. Students whose first name is before its last name alphabetically:');
    _.chain(students)
        .filter(function (student) {
            return student.firstName < student.lastName;
        })
        .sortBy(function (student) {
            return student.toString();
        })
        .reverse()
        .each(function (student) {
            console.log(student.toString());
        })

    console.log('------------------------------------------------');
    // Task 2.
    // Write function that finds the first name and last name of all students with age between 18 and 24. 
    console.log('Task 2. All students with age between 18 and 24:');
    _.chain(students)
        .filter(function (student) {
            return 18 <= student.age && student.age <= 24;
        })
        .sortBy('age')
        .each(function (student) {
            console.log(student.toString() + ' Age: ' + student.age);
        })

    console.log('------------------------------------------------');
    // Task 3.
    // Write a function that by a given array of students finds the student with highest marks
    console.log('Task 3. student with highest marks:');
    var bestStudent = _.chain(students)
        .sortBy(function (student) {
            var averageMarks = 0;
            _.each(student.marks, function (mark) {
                averageMarks += mark;
            })

            averageMarks /= student.marks.length;
            return averageMarks;
        })
        .each(function (student) {
            console.log(student.toString() + ' ' + student.marks);
        })
        .last()
        .value();

    console.log('BEST STUDENT IS: ' + bestStudent.toString());
}());