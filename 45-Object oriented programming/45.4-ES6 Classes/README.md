## 45.4 ES6 Classes

As we have already mentioned in the OOP in javascript section that ES6 classes does not works same as that of Classes in other programming languages, it is just an abstraction on top of whatever we learned in last two sections. That means ES6 Classes internally uses prototypal inheritance only. It just provides a modern and clean approach to implement the same.

Now tow define a class in javascript we have two ways

1. Class declaration :

   ```javascript
   class Employee {}
   ```

2. Class expression :
   ```javascript
   const Employee = class {};
   ```

It is totally upto you which one to use, both works the same way.

Now have a look at below code example.

```javascript
"use strict";

class Employee {
  constructor(firstName, lastName, companyName, contactNo) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.companyName = companyName;
    this.contactNo = contactNo;
  }
}

const leonard = new Employee(
  "Leanord",
  "Hofstadter",
  "Caltech university",
  9874563215
);

console.log(leonard);
```

Here we have created a class called 'Employee' using class declaration and then we have created a constructor method. This constructor method is just like the constructor function and it has to be called as constructor because this function will be called when we use new operator to create an object. So in other words constructor method is just like constructor function (even the implementation is also very similar).

When we run above code it will create an empty object as soon as we call `new Employee(...)` then this will call the constructor method in Employee class and assign the values to the attributes and return the object back. Then this object we are assigning to a constant called leonard. So when we print the object we will get below output.

```
Employee {
  firstName: 'Leanord',
  lastName: 'Hofstadter',
  companyName: 'Caltech university',
  contactNo: 9874563215
}
```

Now in above example we only have properties, but what about methods. How we can define methods efficiently with ES6 classes. It is very simple in ES6 classes. Have a look at below example.

```javascript
"use strict";

class Employee {
  constructor(firstName, lastName, companyName, contactNo) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.companyName = companyName;
    this.contactNo = contactNo;
  }

  welcome() {
    console.log(
      `Hello ${this.firstName} ${this.lastName}, welcome to ${this.companyName}.`
    );
  }
}

const leonard = new Employee(
  "Leanord",
  "Hofstadter",
  "Caltech university",
  9874563215
);

leonard.welcome();
```

In above example we have directly declared a method in Employee class itself. This method will behind the scene get added to the prototype only and will not be coppied to each and every object we create using the class. This we can verify by printing the leonard object and checking the prototype or by printing `leonard.\_\_proto\_\_`

The output of above code will be.

```
Hello Leanord Hofstadter, welcome to Caltech university.
```

Below are few important points which we need to remember while working with classes in javascript.

1. Classes are not hoisted -> This means we can not use class before it's declaration. So we must declare classes above it's usage in the code.

2. Classes are first order classes -> This means we can pass class as an argument to any function and we can return class from the function. Clases are just special type of functions behind the scene.

3. Class body is always executed in strict mode even if we are not activating the strict mode.

Note: It is always personal choice to use constructor function or classes, both are completly valid in javascript.
