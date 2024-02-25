## 37.5 Find method

Find method is use to find a specific element form an array based on given condition. Fid method works very similar to that of filtter method, the only difference is filter method returns an array of all the elements satisfying the given condition while find method returns the first element satisfying the given condition. Have a look at below example.

```javascript
"use strict";

const runsThisOver = [0, 2, 4, 1, 6, 0];

const firstBoundary = runsThisOver.find((run) => run >= 4);
console.log(firstBoundary);
```

The output of above code is.

```
4
```

In above example we have an array of runs scored in one over. Out of that array if we want to find out the first boundy then we can use find method and we can specify the condition which is specified above. Here from the output of above code we can see that only 4 is returned which is the first element satisfying given condition.

Mainly this method is used with an array of object where we want to find any object based on a specific property of that object. For example.

```javascript
const user1 = {
  fullName: "Sheldon cooper",
  userName: "sc",
  password: "1234",
};

const user2 = {
  fullName: "Leonard hofstadert",
  userName: "lh",
  password: "1234",
};

const user3 = {
  fullName: "Penny",
  userName: "pe",
  password: "1234",
};

const users = [user1, user2, user3];

const Penny = users.find((user) => user.userName === "pe");
console.log(Penny);
```

The output of above code will be

```
{
  fullName: "Penny",
  userName: "pe",
  password: "1234",
}
```
