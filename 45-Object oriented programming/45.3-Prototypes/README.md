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

Now we have seen what exactly prototype is in above example, then what exactly prototypal
inheritance means? In the earlier example when we call welcome() method on john and sheldon objects, the object was john or sheldon on which we are calling welcome() method. But if we see actual john and sheldon, there is no such method available in these objects. So in such cases javascript look for the property/method on prototype. Now the welcome() method is present there in the prototype hence it will execute that method and show us the result. This checking of method in prototype, if not available inside the object itself is called prototypal inheritance or delegation. (Because objects delegate the call of method to its prototype.)

Due to this prototypal inheritance or delegatio, if we create 100 employee objects and then we can call the welcome() method on all those 100 objects without having the welcome() method directly attached to any of the object. This will significantly reduce the code duplication and performance.

### Prototype chain

We have already seen that for john object or for sheldon object the \_\_proto\_\_ or the prototype is the prototype of Employee constructor function. But if we observe closely the prototype of Employee coonstructor function is also an object itself. Every object has a prototype, so
the prototype of Employee must also have it's own prototype. This will be 'Object.Prototype', as parent for all objects is a constructor function Object (javascript internal Object). So again this Object.prototype will have its own prototype, so that will be `null` value because this object is not inherited from ano other object.

```javascript
console.log(john); // john object
console.log(john.__proto__); // prototype of Employee constructor function
console.log(john.__proto__.__proto__); // prototype of Object constructor function
console.log(john.__proto__.__proto__.__proto__); // null valule
```

Have a look at below diagram for better understanding.

![Prototype chain (45-Object oriented programming/45.3-Prototypes/images/Prototype_chain.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/45-Object%20oriented%20programming/45.3-Prototypes/images/Prototype_chain.png)

In above image we can see that the .\_\_proto\_\_ of john object is prototype of Employee constructor function while .\_\_proto\_\_ of prototype of john object is prototype of Object constructor function which is the parent. Then .\_\_proto\_\_ of Objects prototype is null as there is no more parent. This is called prototype chain.
And whenever we call a method on an object it will try to find the method in the object itself, if the method is not present then it will look up in the prototype chain.

The best example is when we call the welcome() method on john object it was not present in john hence javascript looked in the prototype and found it in the Employee.prototype and it got executed. Similarly when we called .hasOwnProperty() method on john, we know that we havent defined this method in john object, neither this method is defined in the prototype of Employee constructor function. Hence in prototype chain javascript will look for this method in the Object.prototype and there this method is defined hence john object will delegate the call for hasOwnProperty() method to Object.prototype.
