"use strict";

const bookScreen1 = function () {
  let numberOfBookings = 0;

  return function () {
    numberOfBookings++;
    console.log(
      `Booked a seat for movie. Total bookings are ${numberOfBookings}`
    );
  };
};
const bookSeat = bookScreen1();

bookSeat();
bookSeat();
bookSeat();

console.dir(bookSeat);

// let multiplicate;

// const getHundreds = function () {
//   const multiplier = 100;
//   multiplicate = function (num) {
//     console.log(num * multiplier);
//   };
// };

// const getThousands = function () {
//   const multiplier = 1000;
//   multiplicate = function (num) {
//     console.log(num * multiplier);
//   };
// };

// getHundreds();
// multiplicate(2);

// getThousands();
// multiplicate(2);

const orderFood = function (dish) {
  const dishName = dish;

  setTimeout(function () {
    console.log(
      `your order for ${dishName} was accepted and food is being prepared.`
    );
  }, 5000);

  console.log(
    `Thanks for ordering ${dishName}, we are checking with the chief.`
  );
};

orderFood("Pizza");
