## 32 Looping Objects

While looping over the objects even though objects are not iterables but still we can use 'for of' loop to iterate over object. There are three type of loopinng we can do on object

1. Looping to get keys/propertirs.
2. Looping to get values.
3. Looping to get entries.

Let's see all of the above one by one.

**1. Looping to get keys/Properties** -
To get the keys/properties present in an object we have to use
the keys() method from Object class it gives array of keys present in given object. Have a look at below example.

```javascript
"use strict";

const users = {
  sheldon: {
    userName: "Sheldon cooper",
    password: "xxxxxxxxxx",
  },
  leonard: {
    userName: "Leonard Hofstadter",
    password: "aaaaaaaaaa",
  },
  penny: {
    userName: "Penny",
    password: "bbbbbbbbbb",
  },
};

console.log(Object.keys(users));

for (const user of Object.keys(users)) {
  console.log(user);
}
```

In above example we have an object called 'users' which contain other three objects called sheldon, leonard and penny. So for users object keys/properties will be 'sheldon', 'leonard' and 'penny'. Now when we use keys() method of Object class and pass users object to it, it will give us the array of keys 'sheldon', 'leonard' and 'penny'. Hence the line `console.log(Object.keys(users));` from above code will print the array. Now as we got the array of keys we can easily loop over it using 'for of' loop and get individual key

The output of above code will be.

```
['sheldon', 'leonard', 'penny']
sheldon
leonard
penny
```

**2. Looping to get values** -
Just like keys in above example we can fetch the values as well by using values() method of Object class. It will return an array of objects and then we can loop over that array by using 'for of' loop.

```javascript
"use strict";

const users = {
  sheldon: {
    userName: "Sheldon cooper",
    password: "xxxxxxxxxx",
  },
  leonard: {
    userName: "Leonard Hofstadter",
    password: "aaaaaaaaaa",
  },
  penny: {
    userName: "Penny",
    password: "bbbbbbbbbb",
  },
};

console.log(Object.values(users));

for (const detail of Object.values(users)) {
  console.log(detail?.username ?? "Username not available");
}
```

The output of above code will be.

```
[
  {
    userName: "Sheldon cooper",
    password: "xxxxxxxxxx"
  },
  {
    userName: "Leonard Hofstadter",
    password: "aaaaaaaaaa"
  },
  {
    userName: "Penny",
    password: "bbbbbbbbbb"
  }
]

Sheldon cooper
Leonard Hofstadter
Penny
```

First one is an array of all the values present in 'users' object which we got using `Object.values(users)` and then by using for of loop we looped over the objects and fetched the userName for each of the inned object.

**3. Looping to get entries** -
Now to get keys and values both at a time we can use entries() method of Object class and it will give us an array of entries of given object. Have a look at below example.

```javascript
"use strict";

const users = {
  sheldon: {
    userName: "Sheldon cooper",
    password: "xxxxxxxxxx",
  },
  leonard: {
    userName: "Leonard Hofstadter",
    password: "aaaaaaaaaa",
  },
  penny: {
    userName: "Penny",
    password: "bbbbbbbbbb",
  },
};

console.log(Object.entries(users));

for (const entry of Object.entries(users)) {
  console.log(
    `For ${entry[0]}, username is "${entry[1].userName}" and password is ${entry[1].password}`
  );
}
```

Now in above example if we see the output of line `console.log(Object.entries(users));` we will get below array.

```
[
  [
    "sheldon",
    {
      userName: "Sheldon cooper",
      password: "xxxxxxxxxx"
    }
  ],
  [
    "leonard",
    {
      userName: "Leonard Hofstadter",
      password: "aaaaaaaaaa"
    }
  ],
  [
    "penny",
    {
      userName: "Penny",
      password: "bbbbbbbbbb"
    }
  ]
]
```

We can see from above object that it is an array of entries of 'users' object and the entries are also array of key and value. So when we loop over this output we get an array at 'entry' variable of line `for (const entry of Object.entries(users))`. In this array the value at 0th inde will be the key of users object and value at 1st index will be the object having username and password for that key. Hence we are fetching username and password from `entry[1]`. We can simplify above for of loop using destructuring of array and object as below.

```javascript
for (const [key, { userName, password }] of Object.entries(users)) {
  console.log(
    `For ${key}, username is "${userName}" and password is ${password}`
  );
}
```

Above for loop will also give same result.

The overall result of the complete code above will be.

```
[
  [
    "sheldon",
    {
      userName: "Sheldon cooper",
      password: "xxxxxxxxxx"
    }
  ],
  [
    "leonard",
    {
      userName: "Leonard Hofstadter",
      password: "aaaaaaaaaa"
    }
  ],
  [
    "penny",
    {
      userName: "Penny",
      password: "bbbbbbbbbb"
    }
  ]
]

For sheldon, username is "Sheldon cooper" and password is xxxxxxxxxx
For leonard, username is "Leonard Hofstadter" and password is aaaaaaaaaa
For penny, username is "Penny" and password is bbbbbbbbbb
```
