## 45.10 Class inheritance using Object.create() method.

As we have already seen in last two sections that we can achieve class inheritance using constructor functions and ES6 classes, we can also achieve this by using Object.create() method as well. Have a look at below code.

```javascript
"use strict";

const EmployeeProto = {
  init(firstName, lastName, yearOfJoining, company) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfJoining = yearOfJoining;
    this.company = company;
  },

  welcomeEmployee() {
    console.log(
      `Hello ${this.firstName} ${this.lastName}, welcome to ${this.company}.!!`
    );
  },

  getExperience() {
    console.log(`You have experience of ${2024 - this.yearOfJoining} years.`);
  },
};

const DeveloperProto = Object.create(EmployeeProto);
DeveloperProto.init = function (
  firstName,
  lastName,
  yearOfJoining,
  company,
  primarySkill
) {
  EmployeeProto.init.call(this, firstName, lastName, yearOfJoining, company);
  this.primarySkill = primarySkill;
};

DeveloperProto.introduce = function () {
  console.log(`Hello, my name is ${this.firstName}. And I am a Developer.!!`);
};

DeveloperProto.welcomeEmployee = function () {
  console.log(
    `Hello ${this.firstName} ${this.lastName}, welcome to ${this.company}.!!\nYou joined as a Develoepr.`
  );
};

const howard = Object.create(DeveloperProto);
howard.init("Howard", "Wolowitz", 2021, "Caltech university", "Javascript");

// console.log(howard);
howard.introduce();
howard.welcomeEmployee();
howard.getExperience();
```

In thee above code we have created 'EmployeeProto' which is the parent prototype and has an init() method which sets firstName, lastName, yearOfJoining and company name of the employee. Apart from this we have a method to wellcome the employee and another method to calculate employee's experience. Now we want to create another prototype object which will have its \_\_proto\_\_ property set to EmployeeProto, then only we will be able to establish the prototype chain required for class inheritance.
This is simple, we can use Object.create() method and pass the prototype which we want to set to \_\_proto\_\_ property of newly created object. Now in above code we are using Object.create() to create another prototype object i.e. DeveloperProto, hence we will achieve the chain having DeveloperProto with it's prototype set to EmployeeProto. Which means Employee will be parent to Developer. Now once we have this DeveloperProto object created we can add Developer specific method to that object or even we can override the methods present in EmployeeProto and assign it to DeveloperProto. This is what we did above and added an init() method to set all the properties to Developer object and we are Employee's init method from this to reuse the code which is already there in parent i.e. EmployeeProto.

Now all the objects which are created using DeveloperProto (like 'howard' in above code) will have access to all the methods withing DeveloperProto as well as EmployeeProto.

The output of above code will be.

```
Hello, my name is Howard. And I am a Developer.!!
Hello Howard Wolowitz, welcome to Caltech university.!!
You joined as a Develoepr.
You have experience of 3 years.
```
