## 17 Javascript Objects Part 2

In earlier section [16-Objects](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/16-Objects) we have seen how we can create an object and how we can access the properties of the object. Now in this section we will see that we can actually create a function inside an object and we will see the use of `this` keyword.

`this` keyword represent the current instance of object on which operation is being performed.

Consider below code, we will go through the code line by line.

```javascript
"use strict";

const employee = {
  firstName: "Sheldon",
  lastName: "Cooper",
  age: 36,
  skills: ["Javascript", "Python", "Azure", "Physics"],
  yearlySalary: 12000,

  calcMonthlySalary: function () {
    this.monthlySalary = this.yearlySalary / 12;
    return this.monthlySalary;
  },

  toString: function () {
    return `This is ${this.firstName} ${this.lastName}, a ${
      this.age
    }-year old employee with monthly salary of ${this.calcMonthlySalary()}$`;
  },
};

console.log(employee.calcMonthlySalary());
console.log(employee.monthlySalary);
console.log(employee.monthlySalary);

console.log(employee.toString());
```

Here in above code first we have defined one employee object. This object has firstName, lastName, age, skills and yearlySalary as normal properties which we had seen in earlier section. Now the first new part that we have in employee object is the key `calcMonthlySalary` and instead of assigning a value to this key we have defined a function.

```javascript
  calcMonthlySalary: function () {
    this.monthlySalary = this.yearlySalary / 12;
    return this.monthlySalary;
  },
```

Here the first line is we have a key `calcMonthlySalary` and we are assigning a function to this key. The ssecond line is

`this.monthlySalary = this.yearlySalary / 12;`

Here `this` represents the object inside which that function is present. In case of above code `this` will represent the 'employee' object and hence the above statement will internally become.

`employee.monthlySalary = employee.yearlySalary / 12;`

Now this statement looks familear, this statement will simply create a new key with name `monthlySalary` in employee object and assign the calculated value of expression `employee.yearlySalary / 12;` to the new key. Hence after first execution of this function we will have a new key `monthlySalary` in the employee object, and after that whenever we require monthly salary we can simple call `employee.monthlySalary` or `employee["monthlySalary"]` and get the value (only after calling calcMonthlySalary, i.e. after execution of `employee.calcMonthlySalary()`).

Similar to above code we have another function which generates and give the summary of object as a string.

```javascript
  toString: function () {
    return `This is ${this.firstName} ${this.lastName}, a ${
      this.age
    }-year old employee with monthly salary of ${this.calcMonthlySalary()}$`;
  },
```

Here we are using `this.calcMonthlySalary()` and we are not calling directly `this.mothlySalary` because we can't be sure that every time before calling `employee.toString()` throughout the code we have already called `employee.calcMonthlySalary()` and 'monthlySalary' key is present/created in the employee object.
