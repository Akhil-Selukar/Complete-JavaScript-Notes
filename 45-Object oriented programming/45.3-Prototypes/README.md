## 45.3 Prototypes

Each and every function in javascript including constructor function has a property called prototype. Now each and every object created by using the constructor function will have access to all the methods and properties that we define on the constructors prototype property. Have a look at below code.

```javascript
"use strict";

const Employee = function (firstName, lastName, companyName, contactNo) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.companyName = companyName;
  this.contactNo = contactNo;
};

Employee.prototype.welcome = function () {
  console.log(
    `Hello ${this.firstName} ${this.lastName}, welcome to ${this.companyName}.`
  );
};

const john = new Employee("John", "Doe", "ABC Infotech", 9876543210);
const sheldon = new Employee("Sheldon", "Cooper", "Caltech", 7412589635);

john.welcome();
sheldon.welcome();
```

In the above code we have added a method called welcome on the prototype of Employee constructor function and hence it is now available in both the objects created using Employee constructor function. This is the very basic form of prototypal inheritance in javascript.

The output of above code will be,

```
Hello John Doe, welcome to ABC Infotech.
Hello Sheldon Cooper, welcome to Caltech.
```

So here we can see that the prototype of Constructor function is set to all the objects created from the constructor function. This is what the point number 3 means in below steps (we saw in previous section)

Whenever we call any constructor function with 'new' operator the execution follows below four steps.

1. Create an empty object.
2. Assign this newly created empty object to the 'this' keyword for constructor function call.
3. Link the empty object to the prototype.
4. Return the object in associated with 'this' keyword from the constructor function.

If we want to see what all prototypes are linked to the object we can use the \_\_proto\_\_ property like below.

```javascript
"use strict";

const Employee = function (firstName, lastName, companyName, contactNo) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.companyName = companyName;
  this.contactNo = contactNo;
};

Employee.prototype.welcome = function () {
  console.log(
    `Hello ${this.firstName} ${this.lastName}, welcome to ${this.companyName}.`
  );
};

const john = new Employee("John", "Doe", "ABC Infotech", 9876543210);

console.log(john.__proto__);
```

Above will give you the prototype properties and method linked with john object.

Note that we can also add properties in prototype like below.

```javascript
"use strict";

const Employee = function (firstName, lastName, companyName, contactNo) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.companyName = companyName;
  this.contactNo = contactNo;
};

Employee.prototype.welcome = function () {
  console.log(
    `Hello ${this.firstName} ${this.lastName}, welcome to ${this.companyName}.`
  );
};

Employee.prototype.employmentStatus = "Active";

const john = new Employee("John", "Doe", "ABC Infotech", 9876543210);
const sheldon = new Employee("Sheldon", "Cooper", "Caltech", 7412589635);

console.log(john.employmentStatus);
console.log(sheldon.employmentStatus);
```

Here in above example apart from adding the welcome() method we have added the property 'employmentStatus' on the prototype of constructor function. Hence we can access the property on both 'john' as well as 'sheldon' object. The output of above code will be

```
Active
Active
```

Also we can check if a property of an object is of it's own or it is from the prototype.

```javascript
"use strict";

const Employee = function (firstName, lastName, companyName, contactNo) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.companyName = companyName;
  this.contactNo = contactNo;
};

Employee.prototype.welcome = function () {
  console.log(
    `Hello ${this.firstName} ${this.lastName}, welcome to ${this.companyName}.`
  );
};

Employee.prototype.employmentStatus = "Active";

const john = new Employee("John", "Doe", "ABC Infotech", 9876543210);
const sheldon = new Employee("Sheldon", "Cooper", "Caltech", 7412589635);

console.log(john.hasOwnProperty("firstName"));
console.log(john.hasOwnProperty("employmentStatus"));
```

In above code at line `console.log(john.hasOwnProperty("firstName"));` we are checking if the property 'firstName' is of john object itself or it is from the prototype by using the method 'hasOwnProperty()' as firstName is object's own property we will get `true` as output but as 'employmentStatus' is the property from prototype hence the output for emplloymentStatus will be `false`.
