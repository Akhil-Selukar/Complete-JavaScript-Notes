## 27 Nullish Coalescing Operator

One of the real world application of shotd circuiting using || operator is assigning default value to a variable. Consider below scenario.

You own a shop where you sell books and toys, and you have a application which displays the total number of books and total number of toys available in the shop. The simplest implementation of this scenario can be like below. Here we have an object with name 'shop' which has books count, toy count, a book array which will contain name of available books and an toys array which will contain name of available toys.

```javascript
"use strict";

const shop = {
  bookCount: 0,
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

const booksAvailable = shop.bookCount || "Not a book shop!";
console.log(booksAvailable);
const toysAvailable = shop.toysCount || "Not a toy shop!";
console.log(toysAvailable);
```

Now, at line `const booksAvailable = shop.bookCount || "Not a book shop!";` we are reading the bookCount from the object and if the book count is there then assigning it to the booksAvailable variable and if not then we want to assign default value 'Not a book shop!' to booksAvailable variable. And same goes with toys as well. Let's check the output of above code.

```
Not a book shop!
2
```

in above output printing 'Not a book shop!' is not correct. Even though the value of bookCount is 0 still we can't say that the shop doesn't sell books, it might happen that books are out of stock so we must show 0 as count. But as 0 is a falsy value hence || assigns 'Not a book shop!' to booksAvailable variable.

This is not what we epected. To resolve this issue since ES 2020 new operator 'nullish coalescing' (??) is introduced. This operatoe works exactly as that of || operator but nullish coalescing operator only consider `null` and `undefined` as falsy value. It doeanot consider 0 or '' (empty string) as falsy value. Hence ?? operator resolves the above problem with || operator.

Consider below updated code.

```javascript
"use strict";

const shop = {
  bookCount: 0,
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

const booksAvailable = shop.bookCount ?? "Not a book shop!";
console.log(booksAvailable);
const toysAvailable = shop.toysCount ?? "Not a toy shop!";
console.log(toysAvailable);
```

Here the output will be as expected.

```
0
2
```

and it will only give "Not a book shop!" in case of conditions like below.

Condition 1: BookCount is not at all present.

```javascript
"use strict";

const shop = {
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

const booksAvailable = shop.bookCount ?? "Not a book shop!";
console.log(booksAvailable);
const toysAvailable = shop.toysCount ?? "Not a toy shop!";
console.log(toysAvailable);
```

Condition 2: bookCount is `null`

```javascript
"use strict";

const shop = {
  bookCount: null,
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

const booksAvailable = shop.bookCount ?? "Not a book shop!";
console.log(booksAvailable);
const toysAvailable = shop.toysCount ?? "Not a toy shop!";
console.log(toysAvailable);
```

Condition 3: bookCount is `undefined`

```javascript
"use strict";

const shop = {
  bookCount: undefined,
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

const booksAvailable = shop.bookCount ?? "Not a book shop!";
console.log(booksAvailable);
const toysAvailable = shop.toysCount ?? "Not a toy shop!";
console.log(toysAvailable);
```
