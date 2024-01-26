## 30 Enhanced Object Literals

Enhanced object literals are nothinng but the enhancements in object defining which was done in ES6.
Below are the three major enhancements.

1. While creating nested object we can just use the inner object name and JS will itself create property name same as that of object name. Example.

```javascript
const address = {
  block: "8th Block",
  street: "221B - Baker St",
  country: "UK",
};

const john = {
  fullName: "John Doe",
  contactNumber: 9874563215,
  age: 36,
  address: address,
};

console.log(john);
```

The output of above code is.

```
{
  fullName: "John Doe",
  contactNumber: 9874563215,
  age: 36,
  address: {
    block: "8th Block",
    street: "221B - Baker St",
    country: "UK",
  }
}
```

Now in above example we have used `address` object as a property inside `john` object and while doing that we have added line `address: address,` in john object. As per enhanced object literal we dont have to explicitly mention the name of property. we can simple write the object name and that will work.

```javascript
const address = {
  block: "8th Block",
  street: "221B - Baker St",
  country: "UK",
};

const john = {
  fullName: "John Doe",
  contactNumber: 9874563215,
  age: 36,
  address,
};

console.log(john);
```

In above case javascript will itself add peoperty name same as that of object name and create the nested object.

2. While writing functions inside an object we can omit the use of variable declaration and function keyword and do as shown in below example.

```javascript
const sheldon = {
  fullName: "sheldon cooper",
  contactNumber: 9874563215,
  age: 36,

  getInfo() {
    console.log(
      `This is ${this.fullName}, I'm ${this.age} old and my contact number is ${this.contactNumber}.`
    );
  },
};

console.log(sheldon.getInfo());
```

In above eample while defining `getInfo` function we have not added a property 'getInfo' first and then assigned a function to it which we were doing till now. This is an enhancement in ES6.

The output of above code is.

```
This is sheldon cooper, I'm 36 old and my contact number is 9874563215.
```

3. We can now compute the property name instead of writing them manually. Have a look at below example.

```javascript
const details = ["fullName", "age", "job"];

const leonard = {
  [details[0]]: "Leonard Hofstadter",
  [details[1]]: 34,
};

console.log(leonard);
```

In above code we can see that the property names are not manually written instead we computed them. The output of above code will be.

```
{
  fullName: "Leonard Hofstadter",
  age: 34
}
```

We can also compute the property names like below.

```javascript
const details = ["fullName", "age", "job"];

const leonard = {
  [details[0]]: "Leonard Hofstadter",
  [details[1]]: 34,
  [`friend-${4 - 3}`]: "Sheldon cooper",
};

console.log(leonard);
```

In above case `` [`friend-${4 - 3}`] `` will evaluate to 'friend-1' and will be added as the property name to generate below object.

```
{
  fullName: "Leonard Hofstadter",
  age: 34,
  friend-1: "Sheldon cooper"
}
```
