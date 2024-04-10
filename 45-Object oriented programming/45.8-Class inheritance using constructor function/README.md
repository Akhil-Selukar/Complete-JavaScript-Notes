## 45.8 Class ingeritance using constructor function.

Till now in all the above secrions we have seen the inheritance using prototype (i.e. prototypal inheritance) we were inheriting the methods from prototype. But in actual programming many time we need inheritance between classes like if we have a class called Employee and then we have other classes like Hr, Developer, Tester, etc. Then in that case it is obvious that Hr, Developer and Tester are nothing but the Employee only, so they all can inherite some methods from Employee and they can have some of their own. In this section we will see how we can achieve this.

Have a look at below example where we have created two constructor functions Employee and Hr and then created an object of Hr.

```javascript
const Employee = function (firstName, lastName, joiningYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.joiningYear = joiningYear;
};

Employee.prototype.getExperience = function () {
  console.log(
    `${this.firstName} ${this.lastName} has total ${
      2024 - this.joiningYear
    } years of experience`
  );
};

const Hr = function (firstName, lastName, joiningYear, toolsUsed) {
  Employee.call(this, firstName, lastName, joiningYear);
  this.toolsUsed = toolsUsed;
};

Hr.prototype.info = function () {
  console.log(
    `${this.firstName} ${this.lastName} is a Hr with experience in ${this.toolsUsed}`
  );
};

const katrina = new Hr("Kartina", "Bennett", 2020, "Workday");
katrina.info();
katrina.getExperience();
```

In above example Employee constructor function is simple and we have already seen how this works. Then we have added a method getExperience to calculate the number of years of experience the employee has in this organization, and we have added this method to the prototype of Employee constructor function so that all objects created using Employee constructor function will have access to the getExperience method.

After that we have created a Hr consttructor function, but here the implementation is bit different. Have a look at line `Employee.call(this, firstName, lastName, joiningYear);`. Here as we know that basic information of Hr is same as that of Employee hence we have called Employee constructor function there. But here if we call Employee constructor function with 'new' operator then it will create new empty object and assign firstName, lastName and joiningYear attributes to that object and create an Employee object, we dont want that. Also if we call Employee constructor function without using 'new' operator then in that case this will be a normal function call and hence it will throw an error. What we want here is the empty object created while calling Hr constructor function using new operator, we want to send that object only to Employee constructor function. Hence we have called Employee constructor function using .call() method and specified the 'this' keyword (i.e. first argument in .call() method) to 'this' (i.e. newly created empty object because of new Hr(....) call). So the firstName, lastName and joiningYear will be set on the same empty object which was created for new Hr(..). Then after that we have info() methdo assigned to the prototype of Hr constructor function. Till now it is perfect. But let's observe output of above code.

```
Kartina Bennett is a Hr with experience in Workday
Uncaught TypeError: katrina.getExperience is not a function
```

`katrina.info();` got executed successfully and printed the expected output, but `katrina.getExperience();` throws an error. This is because till now we have just created object of Hr and in the prototype of Hr we have info() method. We have used Employee constructor function while creating object of Hr but not inherited. Hence object of Hr i.e. katrina is not aware of getExperience() method. To make this happen we have to inherite Hr from Employee. That means we have to create below prototypr chain.

\_\_proto\_\_ of katrina is Hr.prototype.
\_\_proto\_\_ of Hr constructor function is Employee.prototype
\_\_proto\_\_ of Employee constructor function is Object.prototype

If we able to create above prototype chain, then only katrina object will be able to access method from Employee.prototype which is grandparent for katrina.

Now we have already seen how we can manually define/set the prototype of any object, it is by using [Object.create() mmethod](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/45-Object%20oriented%20programming/45.7-Object.create()>).
Have a look at below code to understand the actual implementation.

```javascript
const Employee = function (firstName, lastName, joiningYear) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.joiningYear = joiningYear;
};

Employee.prototype.getExperience = function () {
  console.log(
    `${this.firstName} ${this.lastName} has total ${
      2024 - this.joiningYear
    } years of experience`
  );
};

const Hr = function (firstName, lastName, joiningYear, toolsUsed) {
  Employee.call(this, firstName, lastName, joiningYear);
  this.toolsUsed = toolsUsed;
};

Hr.prototype = Object.create(Employee.prototype);

Hr.prototype.info = function () {
  console.log(
    `${this.firstName} ${this.lastName} is a Hr with experience in ${this.toolsUsed}`
  );
};

const katrina = new Hr("Kartina", "Bennett", 2020, "Workday");

katrina.info();
katrina.getExperience();
```

Here we can see that the complete code is same except one line which is `Hr.prototype = Object.create(Employee.prototype);`. At this liine we are creating an empty prototype object for Hr and then assigning the prototype of Employee to it to make thr prototype chain. It is very very important to write this before we add any method to the prototype of Hr constructor function. This is because Object.Create() method return new prototype object linked with the given object. Hence first we have to get this linked object and then we have to add the methods to this prototypr like info() method. If we add info() method first to the prototypr of Hr and then called Object.create() and assign it to Hr.prototypr then the info() method will be overrite completly and will not exist in the prototype of Hr.

After creating above prototypr chain if we try to run the code we will get the expected output.

```
Kartina Bennett is a Hr with experience in Workday
Kartina Bennett has total 4 years of experience
```

Now just to verify that the prototype chain is actually setup we can check below.

```javascript
console.log(katrina instanceof Hr);
console.log(katrina instanceof Employee);
console.log(katrina instanceof Object);
```

All the above will be 'true' because now Hr is linked to or inherited from Employee. Then Employee is linked to or inherited from Object. (in other words Hr is subset of Employee which is a subset of Object)

Note: A very small thing to notice here is when we print \_\_proto\_\_ of 'katrina' object i.e. `console.log(katrina.__proto__);` then in constructor we will see Employee even though katrina is an object of Hr. This happens because of Object.create() (We modified the prototype of Hr with Employee). If required we can simply change it by using `Hr.__proto__.constructor = Hr` i.e. setting the constructor property in Hr.\_\_proto\_\_ back to Hr constructor function.
