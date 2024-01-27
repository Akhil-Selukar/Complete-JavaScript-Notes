## 31 Optional Chaining in Javascript

Whenever we deal with nested object and there is a possibility that inner object might be or might not be there then we can came across below situation in our code.

```javascript
"use strict";

const address = {
  block: "8th Block",
  street: "221B - Baker St",
  country: "UK",
};

const sheldon = {
  fullName: "Sheldon Cooper",
  contactNumber: 9874563215,
  age: 36,
  address,
};

const leonard = {
  fullName: "Leonard Hofstadter",
  contactNumber: 9632587415,
  age: 34,
};

console.log(sheldon.address.street);
console.log(leonard.address.street);
```

The output of above code is.

```
221B - Baker St
Uncaught TypeError: Cannot read properties of undefined (reading 'street')
```

In above code we can see that 'sheldon' object has nested object 'address' but 'leonard' object does not have the address object in it. Now when we try to access address of sheldon and try to fetch street property from it at line `console.log(sheldon.address.street);` we get '221B - Baker St' without any error. but if we try to do same for 'leonard' object at line `console.log(leonard.address.street);`. As leonard object does not have address so `leonard.address` will return `undefined` and when we try to access 'street' property of undefined it gives below error <p style="color:red">Uncaught TypeError: Cannot read properties of undefined (reading 'street')</p> To fix this issue 'Optional chaining' is added in ES6. What optional chaining does is if add further chain of reading properties only if the previous object or property is avaiable. Means in case of above example if we apply optional chaining then `.street` will be only applied if address property is available on leonard object if not then instead of adding the further chain of accessing property it will simply return `undefined` instead of trying to access further properties from undefined and throwing error. Below is the implementation of optional chaining.

```javascript
"use strict";

const address = {
  block: "8th Block",
  street: "221B - Baker St",
  country: "UK",
};

const sheldon = {
  fullName: "Sheldon Cooper",
  contactNumber: 9874563215,
  age: 36,
  address,
};

const leonard = {
  fullName: "Leonard Hofstadter",
  contactNumber: 9632587415,
  age: 34,
};

console.log(sheldon.address?.street);
console.log(leonard.address?.street);
```

in above example we can see that just be adding `?.` in place of simple `.` while reading any property we can implement optional chaining. Now in above case it will first look for address object in 'sheldon' and 'leonard' if address is present then only it will access 'street' otherwise it will directly return undefined. The output of above code is as below.

```
221B - Baker St
undefined
```

In case of `console.log(sheldon.address?.street);` address is found in sheldon object hence `.street` is accessed and hence we got '221B - Baker St' in the output, while in case of `console.log(leonard.address?.street);` address was not there hence instead of throwing an error it simply returned `undefined`.

Now as `undefined` is a falsy value we can apply short circuiting to show some default value if the required property is not found. Have a look at below example.

```javascript
"use strict";

const address = {
  block: "8th Block",
  street: "221B - Baker St",
  country: "UK",
};

const sheldon = {
  fullName: "Sheldon Cooper",
  contactNumber: 9874563215,
  age: 36,
  address,
};

const leonard = {
  fullName: "Leonard Hofstadter",
  contactNumber: 9632587415,
  age: 34,
  // address,
};

console.log(sheldon.address.street);
console.log(leonard.address?.street ?? "Address not available.");
```

In above example instead of returning `undefined` it will return a meaningful default message "Address not available." The final output if above code will be.

```
221B - Baker St
Address not available.
```

### Optional chaining for methods.

We can apply optional chaining for methods as well. That means method will be called only if it is available on the opject else it will return undefined instead of throwing error. Have a look at below example.

```javascript
"use strict";

const sheldon = {
  fullName: "Sheldon Cooper",
  contactNumber: 9874563215,
  age: 36,
  getInfo() {
    return `This is ${this.fullName}, I'm ${this.age} old and my contact number is ${this.contactNumber}.`;
  },
};

const leonard = {
  fullName: "Leonard Hofstadter",
  contactNumber: 9632587415,
  age: 34,
  // getInfo() {
  //   return `This is ${this.fullName}, I'm ${this.age} old and my contact number is ${this.contactNumber}.`;
  // },
};

console.log(sheldon.getInfo?.());
console.log(leonard.getInfo?.(););
```

In above example at line `sheldon.getInfo?.()` we are first checking if `getInfo` method is present in sheldon object or not if it is present then only we are calling the method using () else it eill return `undefined`. Now as we have getInfo available in sheldon but not in leonard we will get details of sheldon and for leonard we will get undefined.

```
This is Sheldon Cooper, I'm 36 old and my contact number is 9874563215.
undefined
```

As undefined is a falsy value hence we can use short circuiting to return a default value instead of undefined.

```javascript
"use strict";

const sheldon = {
  fullName: "Sheldon Cooper",
  contactNumber: 9874563215,
  age: 36,
  getInfo() {
    return `This is ${this.fullName}, I'm ${this.age} old and my contact number is ${this.contactNumber}.`;
  },
};

const leonard = {
  fullName: "Leonard Hofstadter",
  contactNumber: 9632587415,
  age: 34,
  // getInfo() {
  //   return `This is ${this.fullName}, I'm ${this.age} old and my contact number is ${this.contactNumber}.`;
  // },
};

console.log(sheldon.getInfo?.());
console.log(leonard.getInfo?.() ?? "Something went wrong.!");
```

Now in above case the output will be.

```
his is Sheldon Cooper, I'm 36 old and my contact number is 9874563215.
Something went wrong.!
```
