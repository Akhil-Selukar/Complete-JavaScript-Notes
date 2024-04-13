## 45.9 Class ingeritance using ES6 classes

Class inheritance which we saw in previous section using constructor function was a bit complex and we had to keep track of lot more things like prototype chain and all. But as we know ES6 classes are abstraction over prototype so ES6 classes makes the class inheritance also lot more simpler. We must keep inmind that ES6 classes internally uses constructor function and prototypal inheritance only.

To understand the class inheritance using ES6 classes let's take the example of a company which has Employees, now employees can be Developer, Tester, Hr, DevOps professional, etc. But all these people comes under the broder umbrella of Employee and all of them will have some things like firstName, lastName, dateOfJoining, companyName and also have method to calculate Experience in the company same. But apart from all this they will have different primary and secondary skill, they might have department specific onboarding process and other things. So we can specify common things in a class of Employee and inherite other classes from employee. Have a look at below code.

```javascript
"use strict";

class Employee {
  constructor(firstName, lastName, yearOfJoining, company) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfJoining = yearOfJoining;
    this.company = company;
  }

  welcomeEmployee() {
    console.log(
      `Hello ${this.firstName} ${this.lastName}, welcome to ${this.company}.!!`
    );
  }

  getExperience() {
    console.log(`You have experience of ${2024 - this.yearOfJoining} years.`);
  }

  static printCompanyName() {
    console.log(`${this.company}`);
  }
}

class Developer extends Employee {
  constructor(
    firstName,
    lastName,
    yearOfJoining,
    company,
    primarySkill,
    secondarySkill
  ) {
    super(firstName, lastName, yearOfJoining, company);
    this.primarySkill = primarySkill;
    this.secondarySkill = secondarySkill;
  }

  introduce() {
    console.log(`Hello, my name is ${this.firstName}. And I am a Developer.!!`);
  }

  welcomeEmployee() {
    console.log(
      `Hello ${this.firstName} ${this.lastName}, welcome to ${this.company}.!!\nYou joined as a Develoepr.`
    );
  }
}

const howard = new Developer(
  "Howard",
  "Wolowitz",
  2021,
  "Caltech university",
  "Javascript",
  "Engineering"
);

howard.introduce();
howard.welcomeEmployee();
howard.getExperience();
// howard.printCompanyName();
```

In above code we have a class called 'Employee' which accepts firstName, lastName, yearOfjoinig and company. Then we have method to welcome the employee and to calculate the year of experience employee has in the company. Apart from above we do have a static method to print the company name.

Now when we are creating another class called 'Developer' we use `extends Employee` this internally handle the linking the Developer class to Employee class and create proper prototype chain. Then next thing we need to take care is in the constructor of Developer (child) class, we have to call the super() metod. This method must be the first thing in constructor finction as this will create the `this` object and then that will be used to set all the property and create object. super() method calls the constructor of Employee (parent) class and takes care of the part where we had used call method to link the prototype in previous section.

Now in Developer (child) class we can add some new methods which only child class can have access to and not the parent (Employee) class, like the introduce() method in Developer class. This introduce() method will be only available in Developer object and not on all other objects extended from Employee class. Apart from individual method, child class can override the behaviour of parent class's method. Like in above example we are overriding the 'welcomeEmployee()' method, hence when we call welcomeEmployee method from developer class then the overriden method will be executed. Also Developer class's object will have access to all the methods defined in Employee like 'getExperience()', (except the static methods as static methods are class specific.)

The output of above code will be.

```
Hello, my name is Howard. And I am a Developer.!!
Hello Howard Wolowitz, welcome to Caltech university.!!
You joined as a Develoepr.
You have experience of 3 years.
```
