"use strict";

const bookMovieTicket = function (movieName, people = 1, price = 199 * people) {
  const bookingInfo = {
    movieName,
    people,
    price,
  };

  console.log(bookingInfo);
};

bookMovieTicket("The Matrix");
bookMovieTicket("The Matrix", 1);
bookMovieTicket("The Matrix", 2);
bookMovieTicket("The Matrix", undefined, 400);
