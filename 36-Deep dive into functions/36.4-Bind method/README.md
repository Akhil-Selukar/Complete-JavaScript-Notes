## 36.4 Bind method

Now with call and apply method we immediately call the function with the object provided as first argument. (i.e. by setting the `this` keyword as first argument while calling the method.) but what if we want to call the method 100 times then, it's difficult to keep track of at which call we have to send which object. So in suchscenario it is very useful to use bind method. Bind method binds the object to the method and return the method with this keyword set to given object and now by using this received method we can call it as many times as we want. For example.

```javascript
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
```

In above example pay attention to below three lines.

```javascript
const bookTicket = movieScreen1.bookSeat;

const bookSc1 = bookTicket.bind(movieScreen1);
const bookSc2 = bookTicket.bind(movieScreen2);
```

At line `const bookTicket = movieScreen1.bookSeat;` we have extracted the bookSeat method from movieScreen1 object. Now at next line `const bookSc1 = bookTicket.bind(movieScreen1);` we are binding the object `movieScreen1` to bookSeat function which was extracted in `bookTicket'. This will return function with movieScreen1 set as `this`keyword. Similarly line`const bookSc2 = bookTicket.bind(movieScreen2);`return function with`movieScreen2` set as this keyword. Now this individual methods we can call as many times as we want, these methods will book seat in respective objects. Have a look at output of above code.

```
Sheldon booked seat SC1_21 for movie Ice age 3
Leonerd booked seat SC2_36 for movie Iron Man
Amy booked seat SC1_22 for movie Ice age 3
Penny booked seat SC2_37 for movie Iron Man
[
  {
    seat: 'SC1_21',
    customerName: 'Sheldon'
  },
  {
    seat: 'SC1_22',
    customerName: 'Amy'
  }
]
[
  {
    seat: 'SC2_36',
    customerName: 'Leonerd'
  }
  {
    seat: 'SC2_37',
    customerName: 'Penny'
  }
]
```

From the output above we can see that the the respective bookSeat methods were called and bookedSeats array was updated in respective objects.

So if there are 10 screens and we want to book 100 tickets then instead of tracking which screen object to pass in call or apply method we can bind the object with method once and get the resultant method and use to book remaining seats.

Now the another usecase of bind method is to set the default paramenets as well. Consider below example.

```javascript
const calculateDiscount = function (discountRate, totalAmount) {
  return totalAmount * discountRate;
};

const discount10 = calculateDiscount.bind(null, 0.1);
const discount20 = calculateDiscount.bind(null, 0.2);

console.log(discount10(200));
console.log(discount20(200));
```

Here in this example we have calculate discount method which simple receives the discount rate and total amount and return the discount value, so we dont really care about the `this` keyword while executing calculateDiscount function. But if we want to set the discount rate and then call the same function for same discount rate 100 times with different total amount then we can bind the function with null as first argument because first argument is for this keyword and we dont really care about it in this example and then second argument for discountRate. Hence in above example at line `const discount10 = calculateDiscount.bind(null, 0.1);` discount rate is set to 10% and hence when we call `discount10` with 200 as total amount we will get 20. The output for above code is

```
20
40
```
