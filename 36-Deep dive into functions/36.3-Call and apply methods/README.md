## 36.3 call and apply methods in javascript

Consider below code example.

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

movieScreen1.bookSeat(12, "Sheldon");

console.log(movieScreen1.bookedSeats);
```

Here the scenario is we have a movie theator and in that theator for now we just have one screen. The object `movieScreen1` contains the details regarding the screen1 like movie which is being played on that screen, screenCode, an array of booked seats. The object also provides a method to book a seat for the movie. This method accepts the customer name and the choice of seat number which they want to book. Based on given inputs, the method prints the message which give customer name, seat they have booked (screenCode appended with seat number) and name of the movie that screen is paying. Apart from this the bookSeat method add the entry to bookedSeats array for the seat which the customer booked. At line `movieScreen1.bookSeat(12, "Sheldon");` we are booking the seat number 12 for 'Sheldon', hence the output of above code will be.

```
Sheldon booked seat SC1_12 for movie Ice age 3
[
  {
    seat: 'SC1_12',
    customerName: 'Sheldon'
  }
]
```

Now let's say another screen is added to the theator and that screen is playing 'Iron Man' movie and we want to implement same seat booking mechanism for this movie as well with screenCode `SC2`.

To implement seat booking mechanism we will have to write same code again, So why not to use the same code instead of writing it again in each and every object. let's try this.

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

movieScreen2.bookSeat(26, "Leonard");
console.log(movieScreen2.bookedSeats);
```

In above example we have movieScreen2 object but that object doesnot have bookSeat method. Hence when we try to run above code and call bookSeat() method using movieScreen2 object we will get and error.

```
Uncaught TypeError: movieScreen2.bookSeat is not a function
```

Now the one solution we can implement is like

```javascript
"use strict";

const bookSeat = function (seatNumber, customerName) {
  console.log(
    `${customerName} booked seat ${this.screenCode}_${seatNumber} for movie ${this.movieName}`
  );
  this.bookedSeats.push({
    seat: `${this.screenCode}_${seatNumber}`,
    customerName,
  });
};

const movieScreen1 = {
  movieName: "Ice age 3",
  screen: 1,
  screenCode: "SC1",
  bookedSeats: [],
  bookSeat,
};

const movieScreen2 = {
  movieName: "Iron Man",
  screen: 2,
  screenCode: "SC2",
  bookedSeats: [],
  bookSeat,
};

movieScreen1.bookSeat(12, "Sheldon");
console.log(movieScreen1.bookedSeats);

movieScreen2.bookSeat(26, "Leonard");
console.log(movieScreen2.bookedSeats);
```

Here we have defined the method to bookSeat outside of object and while creating the object we passed this function as a property. This will work but here as well we are indirectly repeating the code and defining bookSeat in each object.

So to deal with this we have call and apply methods. By using call method we can call the method with our choice of object. The only condition is the object should have all the necessary properties present which can be read by using this keyword. Have a look at below example.

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

const bookSeat = movieScreen1.bookSeat;

bookSeat.call(movieScreen1, 32, "Sheldon");
bookSeat.call(movieScreen2, 55, "Leonard");

console.log(movieScreen1.bookedSeats);
console.log(movieScreen2.bookedSeats);
```

Here in above example we extracted the method from movieScreen1 object and stored it in a variable called bookSeat `const bookSeat = movieScreen1.bookSeat;` (this works because of first class function.) Then we used call method on this to book a seat by passing the object of screen in which we want to do booking. `bookSeat.call(movieScreen1, 32, "Sheldon");` here bookSeat method will be called on object `movieScreen1` with arguments `32` and `Sheldon`. Similarly when we write `bookSeat.call(movieScreen2, 55, "Leonard");` the bookSear method will be called on movieScreen2 object with arguments `55` and `Leonard`. Now we can add as many screens as we want and call the same bookSeat method to book seat for that screen.

The output of above code will be.

```
Sheldon booked seat SC1_32 for movie Ice age 3
Leonard booked seat SC2_55 for movie Iron Man
[
  {
    seat: 'SC1_32',
    customerName: 'Sheldon'
  }
]
[
  {
    seat: 'SC2_55',
    customerName: 'Leonard'
  }
]
```

Same thing we can achieve by using apply() method as well. The only difference here is in call method we pass individual arguments while in apply method we have to pass an array of arguments. For example if we had to use apply() method in above example then it will be like.

```javascript
bookSeat.apply(movieScreen1, [32, "Sheldon"]);
bookSeat.apply(movieScreen2, [55, "Leonard"]);
```

Thsi is useful when we already have an array of arguments. But even in that case as well we can use array destruction and call method.
