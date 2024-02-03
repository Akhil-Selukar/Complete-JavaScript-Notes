"use strict";

const bookScreen1 = function () {
  let numberOfBookings = 0;

  return function () {
    numberOfBookings++;
    console.log(
      `Booked a seat for movie. Total 
      bookings are ${numberOfBookings}`
    );
  };
};
const bookSeat = bookScreen1();

bookSeat();
bookSeat();
bookSeat();
