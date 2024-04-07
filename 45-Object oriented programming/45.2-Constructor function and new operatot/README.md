## 45.2 Constructor function and new operator in javascript.

A constructor function is just like another function but the difference here is that constructor functions are used to create objects and we call constructor function with 'new' operator. Have a look at below code.

Note : It is a convention to use the first letter of constructor function's name as capital letter.

```javascript
"use strict";

const Employee = function (firstName, lastName, companyName, contactNo) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.companyName = companyName;
  this.contactNo = contactNo;
};

const john = new Employee("John", "Doe", "ABC Infotech", 9876543210);

console.log(john);
```

Here in above example we have defined a constructor function which accepts 4 arguments (firstName, lastName, companyName and contactNo) and we have called this function using 'new' operator at line `const john = new Employee("John", "Doe", "ABC Infotech", 9876543210);`. Whenever we call any constructor function with 'new' operator the execution follows below four steps.

1. Create an empty object
2. Assign this newly created empty object to the 'this' keyword for constructor function call.
3. Link the empty object to the prototype
4. Return the object in associated with 'this' keyword from the constructor function.

Hence in above code as soon as we call the 'Employee' constructor function with new operator all the parameters sent while this function call is assigned to respective properties and an Employee object will be returned. So the output will be as below.

```
Employee {
    firstName : "John",
    lastName : "Doe",
    companyName : "ABC Infotech",
    contactNo : 9876543210
}
```

Now by using this constructor function and new operator we can create as many Employee objects as we want. Here we can see that the constructor function Employee is like a blueprint for employee objects and 'john' is actual object created using the blueprint. We can use same blueprint now to create as many objects as we want.

Now the objects created using the above constructor function will have the propertied firstName, lastName, conpanyName and contactNo, as those are the instance properties. But what about the methods or behaviour of object well we can add it like below.

```javascript
"use strict";

const Employee = function (firstName, lastName, companyName, contactNo) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.companyName = companyName;
  this.contactNo = contactNo;

  this.welcome = function () {
    console.log(`Hello ${firstName} ${lastName}, welcome to ${companyName}.`);
  };
};

const john = new Employee("John", "Doe", "ABC Infotech", 9876543210);
const sheldon = new Employee("Sheldon", "Cooper", "Caltech", 7412589635);

john.welcome();
sheldon.welcome();
```

Here we have added a method 'welcome' to the constructor function and hence all the objects created using that constructor function will have the welcome method associated with it. And hence we will be able to call the welcome() method on the objects. The output of above code will be.

```
Hello John Doe, welcome to ABC Infotech.
Hello Sheldon Cooper, welcome to Caltech
```

Note: Although this works perfectly fine but this is not the good wway to as in case we create 100 objects using the Employee constructor funtion then the welcome() method will be coppied and added in all the 100 objects and will cause a significant performance impact. Instead we use
prototypes and prototypal inheritance to achieve this in better way (we will learn in next section.)
