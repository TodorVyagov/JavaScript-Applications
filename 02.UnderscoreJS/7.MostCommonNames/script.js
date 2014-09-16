/// <reference path="underscore-min.js" />
(function () {
    var people = [
        { firstName: 'Peter', lastName: 'Ivanov' },
        { firstName: 'Nikolay', lastName: 'Kostov' },
        { firstName: 'Nikolay', lastName: 'Ivanov' },
        { firstName: 'Peter', lastName: 'Kenov' },
        { firstName: 'Doncho', lastName: 'Ivanov' },
        { firstName: 'George', lastName: 'Minkov' },
        { firstName: 'Peter', lastName: 'Kenov' }
    ];

    // Taks 7. By an array of people find the most common first and last name.     var mostCommonFirstName = _.chain(people)        .groupBy('firstName')        .sortBy(function (group) {
            return group.length;
        })        .last()        .value()[0].firstName;    console.log(mostCommonFirstName);    var mostCommonLastName = _.chain(people)        .groupBy('lastName')        .sortBy(function (group) {
            return group.length;
        })        .last()        .value()[0].lastName;    console.log(mostCommonLastName);}());