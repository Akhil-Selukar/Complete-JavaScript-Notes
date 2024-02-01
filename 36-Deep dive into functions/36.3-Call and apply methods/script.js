"use strict";

const movieScreen1 = {
  movieName: "Ice age 3",
  screen: 1,
  screenCode: "SC1",
  bookedSeats: [],
  bookSeat(seatNumber, customerName) {
    console.log(
      `${customerName} booked seat ${this.screenCode}_${seatNumber} for movie ${this.movieName}`
    );
    this.bookedSeats.push({
      seat: `${this.screenCode}_${seatNumber}`,
      customerName,
    });
  },
};

// movieScreen1.bookSeat(12, "Sheldon");
// console.log(movieScreen1.bookedSeats);

const movieScreen2 = {
  movieName: "Iron Man",
  screen: 2,
  screenCode: "SC2",
  bookedSeats: [],
};

// movieScreen2.bookSeat(26, "Leonard");
// console.log(movieScreen2.bookedSeats);

const bookSeat = movieScreen1.bookSeat;

bookSeat.call(movieScreen1, 32, "Sheldon");
bookSeat.call(movieScreen2, 55, "Leonard");

console.log(movieScreen1.bookedSeats);
console.log(movieScreen2.bookedSeats);
