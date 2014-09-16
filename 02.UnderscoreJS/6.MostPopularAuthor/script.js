/// <reference path="underscore-min.js" />
(function () {
    var books = [
        { author: 'Astrid Lindgren', title: 'Pippi Longstocking' },
        { author: 'Grimm brothers', title: 'Rapunzel' },
        { author: 'Astrid Lindgren', title: 'Karlsson on the Roof' },
        { author: 'Leo Tolstoy', title: 'War and Peace' },
        { author: 'Grimm brothers', title: 'Town Musicians of Bremen' },
        { author: 'Hans Christian Andersen', title: 'The Little Mermaid' },
        { author: 'Grimm brothers', title: ' Rumpelstiltskin' }
    ];

    // Task 6. By a given collection of books, find the most popular author (the author with the highest number of books)
    var mostPopularAuthor = _.chain(books)        .groupBy('author')        .sortBy(function (group) {
            return group.length;
        })        .last()        .value()[0].author;    _.each(books, function (book) {
        console.log(book.author + ' - ' + book.title);    })    console.log('----------------------');    console.log('Most popular author is ' + mostPopularAuthor);}());