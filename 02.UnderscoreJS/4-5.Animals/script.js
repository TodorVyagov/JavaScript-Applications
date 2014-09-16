/// <reference path="underscore-min.js" />
(function () {
    var animals = [
        { name: 'spider', species: 'insect', numberOfLegs: 8 },
        { name: 'cat', species: 'mammal', numberOfLegs: 4 },
        { name: 'snake', species: 'reptile', numberOfLegs: 0 },
        { name: 'dolphin', species: 'mammal', numberOfLegs: 0 },
        { name: 'lizard', species: 'reptile', numberOfLegs: 4 }
    ];

    // Task 4. Write a function that by a given array of animals, groups them by species and sorts them by number of legs
    _.chain(animals)
        .groupBy('species')
        .sortBy('numberOfLegs')
        .each(function (group) {
            console.log(group);
            console.log(group[0].species);
            _.chain(group)
                .sortBy(function (animal) {
                    return animal.numberOfLegs;
                })
                .each(function (animal) {
                    console.log(animal.name + ' has ' + (animal.numberOfLegs === 0 ? 'No' : animal.numberOfLegs) + ' legs.');
                })
        })

    console.log('-------------------------------------');
    // Task 5. By a given array of animals, find the total number of legs. Each animal can have 2, 4, 6, 8 or 100 legs.    var totalNumberOfLegs = 0;    _.each(animals, function (animal) {
        console.log(animal.numberOfLegs);
        totalNumberOfLegs += animal.numberOfLegs;    })    console.log('Total number of legs of all animals is: ' + totalNumberOfLegs);}());