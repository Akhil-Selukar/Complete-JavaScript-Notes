## 28 Logical Assignment Operator

Logical assignment operators are the even modern version of nullish coalescing operator. We have three logical assignment operators.

1. Logical OR assignment operator (||=)
2. Logical AND assignment operator (&&=)
3. Logical nullish coalescing operator (??=)

Consider below example which shows the use of logical OR assignment operator.

```javascript
"use strict";

const shop_1 = {
  bookCount: 1,
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
};

const shop_2 = {
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

// Using normal || short circuiting.
shop_1.bookCount = shop_1.bookCount || 5;
shop_2.bookCount = shop_2.bookCount || 5;

console.log(shop_1);
console.log(shop_2);
```

The output of above code is.

```
{
  bookCount: 1,
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
}
{
  bookCount: 5,
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
}
```

Here we can see that at line `shop_1.bookCount = shop_1.bookCount || 5;` 'shop_1' object do have bookCount as 1 which is a truthy value and hence the OR operation immediately returned that value (1) and hence we get the same object as output and default value 5 is skipped.
While in case of `shop_2.bookCount = shop_2.bookCount || 5;`, 'shop_2' object does not have bookCount property hence `shop_2.bookCount` will be `undefined` which is a falsy value hence it will assign the default value (5) to the bookCount and add the property in the 'shop_2' object.

Now this same result can be achieved by using Logical OR assignment operator i.e. ||= operator. Have a look at below example and its output.

```javascript
"use strict";

const shop_1 = {
  bookCount: 1,
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
};

const shop_2 = {
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

// Using logical OR (||=)
shop_1.bookCount ||= 5;
shop_2.bookCount ||= 5;

console.log(shop_1);
console.log(shop_2);
```

The output is.

```
{
  bookCount: 1,
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
}
{
  bookCount: 5,
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
}
```

As we can observe that the output is same. So writing `shop_1.bookCount ||= 5;` is same as that of `shop_1.bookCount = shop_1.bookCount || 5;` and both will produce the same result.

Same we can do for nullish coalescing operator as well.

```javascript
"use strict";

const shop_1 = {
  bookCount: 0,
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
};

const shop_2 = {
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

// Using normal nullish coalescing
shop_1.bookCount = shop_1.bookCount ?? 5;
shop_2.bookCount = shop_2.bookCount ?? 5;

console.log(shop_1);
console.log(shop_2);
```

The output is

```
{
  bookCount: 0,
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
}
{
  bookCount: 5,
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
}
```

Here in 'shop_1' object zero is not considered as falsy value and no default value is assigned to 'bookCount'. Same result we can achieve by using Logical nullish coalescing operator as below.

```javascript
"use strict";

const shop_1 = {
  bookCount: 0,
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
};

const shop_2 = {
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

// Using logical nullish coalescing
shop_1.bookCount ??= 5;
shop_2.bookCount ??= 5;

console.log(shop_1);
console.log(shop_2);
```

The output will be same as that of above output.

Now let's take an example of logical AND assignment operator.

```javascript
"use strict";

const shop_1 = {
  bookCount: 1,
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
};

const shop_2 = {
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

// Using normal && short circuiting.
shop_1.bookCount = shop_1.bookCount && "Undisclosed";
shop_2.bookCount = shop_2.bookCount && "Undisclosed";

console.log(shop_1);
console.log(shop_2);
```

Here the output od this code is

```
{
  bookCount: "Undisclosed",
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
}
{
  bookCount: undefined,
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
}
```

Here in above case `shop_1.bookCount = shop_1.bookCount && "Undisclosed";` 'shop_1' object has bookCount property with value 1 which is truthy value, hence && operator returned the last i.e. default value "Undisclosed". While in case of 'shop_2' object we dont have bookCount property hence shop_2.bookCount will be `undefined` which is a falsy value hence && operator will return `undefined` only and skip the default value.

Now let's use logical AND assignment operator and see the result.

```javascript
"use strict";

const shop_1 = {
  bookCount: 1,
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
};

const shop_2 = {
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
};

shop_1.bookCount &&= "Undisclosed";
shop_2.bookCount &&= "Undisclosed";

console.log(shop_1);
console.log(shop_2);
```

In above case the output will be

```
{
  bookCount: "Undisclosed",
  toysCount: 2,
  books: ["Fun with flags"],
  toys: ["bike", "robot"],
}
{
  toysCount: 2,
  books: [],
  toys: ["bike", "robot"],
}
```

Here we can see that for 'shop_1' object the output is same but for 'shop_2' object the `undefined` value is not added, which is even better than using && because undefined value doesnt make any sense here.
