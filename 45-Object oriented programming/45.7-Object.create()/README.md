## 45.7 Object.create() method

Apart from constructor function and ES6 classes we do have another way to create objects with prototypal inheritance. This is using Object.create() method. This is not used often in modern programming but it is important to understand this. By using Object.crete() method we create a empty object with specific prototype attached to it. Have a look at below example for better understanding.

```javascript
"use strict";

const EmployeeProto = {
  welcome() {
    console.log(`Hello ${this.firstName}, welcome to the ${this.companyName}.`);
  },
};

const penny = Object.create(EmployeeProto);
penny.firstName = "Penny";
penny.companyName = "Cheese cake factory";
penny.contactNumber = 9632587415;

console.log(penny);
penny.welcome();
```

In above example we have first created a prototype object `EmployeeProto`, this object is having all the methods and properties that we want all objects to inherit. Now at line `const penny = Object.create(EmployeeProto);`, we are creating an empty object with Object.create() method and assigning 'EmployeeProto' as the prototype for the newly created object. After execution of this line we will be having an empty object with prototype as EmployeeProto assigned to penny. Now we can initialize the object and add properties to this empty object like firstName, contactNumber and companyName. Now as the penny object has welcome() method in it's prototype we can call welcome on penny object. Hence the output of above code will be.

```
{
  firstName: 'Penny',
  companyName: 'Cheese cake factory',
  contactNumber: 9632587415
}

Hello Penny, welcome to the Cheese cake factory.
```

Now, if we want to create another object let's say 'stuart' then we can again use Object.create() method like below.

```javascript
"use strict";

const EmployeeProto = {
  welcome() {
    console.log(`Hello ${this.firstName}, welcome to the ${this.companyName}.`);
  },
};

const penny = Object.create(EmployeeProto);
penny.firstName = "Penny";
penny.companyName = "Cheese cake factory";
penny.contactNumber = 9632587415;

console.log(penny);
penny.welcome();

const stuart = Object.create(EmployeeProto);
stuart.firstName = "Stuart";
stuart.companyName = "Commic book store";
stuart.contactNumber = 7412589635;

console.log(stuart);
stuart.welcome();
```

Now here the output will be.

```
{
  firstName: 'Penny',
  companyName: 'Cheese cake factory',
  contactNumber: 9632587415
}

Hello Penny, welcome to the Cheese cake factory.

{
  firstName: 'Stuart',
  companyName: 'Commic book store',
  contactNumber: 7412589635
}

Hello Stuart, welcome to the Commic book store.
```

If we observe above code closely, we can see that the code to set the attributes to empty object is common and repeated. Hence we can refactor the above code in better way and create a method in EmployeeProto prototype to initialize the object and as the empty object is assigned with the prototype we will be able to call the method to initialize object on empty object. Have a look at below code.

```javascript
"use strict";

const EmployeeProto = {
  welcome() {
    console.log(`Hello ${this.firstName}, welcome to the ${this.companyName}.`);
  },

  init(firstName, companyName, contactNumber) {
    (this.firstName = firstName),
      (this.companyName = companyName),
      (this.contactNumber = contactNumber);
  },
};

const penny = Object.create(EmployeeProto);
penny.init("Penny", "Cheese cake factory", 9632587415);

console.log(penny);
penny.welcome();

const stuart = Object.create(EmployeeProto);
stuart.init("Stuart", "Commic book store", 7412589635);

console.log(stuart);
stuart.welcome();
```

In above case, the output will be same as that of the earlier code. But we have restructured the code to initialize object in better way.

So the important thing to note here is, with Object.create() we can create a new object whose prototype will be the object that we pass in object.create() method.
