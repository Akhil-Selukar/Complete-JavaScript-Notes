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

const movieScreen2 = {
  movieName: "Iron Man",
  screen: 2,
  screenCode: "SC2",
  bookedSeats: [],
};

const bookTicket = movieScreen1.bookSeat;

const bookSc1 = bookTicket.bind(movieScreen1);
const bookSc2 = bookTicket.bind(movieScreen2);

bookSc1("21", "Sheldon");
bookSc2("36", "Leonerd");
bookSc1("22", "Amy");
bookSc2("37", "Penny");

console.log(movieScreen1.bookedSeats);
console.log(movieScreen2.bookedSeats);

// another usecase
const calculateDiscount = function (discountRate, totalAmount) {
  return totalAmount * discountRate;
};

const discount10 = calculateDiscount.bind(null, 0.1);
const discount20 = calculateDiscount.bind(null, 0.2);

console.log(discount10(200));
console.log(discount20(200));
