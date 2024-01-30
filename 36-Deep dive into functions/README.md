## 36 Deep dive into functions

In this section we will take a closer look at the functions and will understand how exactly functions in javascript works and what all things we can do with functions. One of the most common feature of functions which was introduce in ES6 is, setting default parameters to the functions.

Consider below example.

```javascript
"use strict";

const bookMovieTicket = function (movieName, people, price) {
  const bookingInfo = {
    movieName,
    people,
    price,
  };

  console.log(bookingInfo);
};

bookMovieTicket("The Matrix");
```

In above example we have a function booMovieTicket which accepts three parameters movieName, people and price. Now while calling the function `bookMovieTicket("The Matrix");` here we have passed only the movie name, so if we check the output of above code. We are getting undefined for people and price values.

```
{movieName: 'The Matrix', people: undefined, price: undefined}
```

To assign default values for the parameters we can use below syntax from ES6.

```javascript
"use strict";

const bookMovieTicket = function (movieName, people = 1, price = 199) {
  const bookingInfo = {
    movieName,
    people,
    price,
  };

  console.log(bookingInfo);
};

bookMovieTicket("The Matrix");
```

Now in above case if we see the output, even though we are not sending number of people and price still we get the default values.

```
{movieName: 'The Matrix', people: 1, price: 199}
```

Apart from assigning default values from ES6 we can use one variables value to calculate second variable.

Consider that while booking the movie ticket we know price for 1 ticket which is 199. Now based on number of people send in the function, we want to change the default value of price in that case

```javascript
"use strict";

const bookMovieTicket = function (movieName, people = 1, price = 199 * people) {
  const bookingInfo = {
    movieName,
    people,
    price,
  };

  console.log(bookingInfo);
};

bookMovieTicket("The Matrix", 2);
```

Now if we see the output of above code.

```
{movieName: 'The Matrix', people: 2, price: 398}
```

Here even though we have not passed price `bookMovieTicket("The Matrix", 2);` but as soon as we gave 2 as the numbe rof people the price got updated.

Even though we have assigned default values, we cant skip any argument i.e. we can't call bookMovieTicket() function like `bookMovieTicket("The Matrix", 400);` where I'm expecting 'The Matrix' as the movie name and 400 as the price. As 400 is passed as second argument hence it will be assigned to people only. If we want to send 400 as price and do not want to send number of people then we have to pass `undefined` as seond argument like.

```javascript
"use strict";

const bookMovieTicket = function (movieName, people = 1, price = 199 * people) {
  const bookingInfo = {
    movieName,
    people,
    price,
  };

  console.log(bookingInfo);
};

bookMovieTicket("The Matrix", undefined, 400);
```

In this case the output wll be.

```
{movieName: 'The Matrix', people: 1, price: 400}
```

Here for number of people default value got assigned but price got updated to 400.
