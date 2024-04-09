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
// penny.firstName = "Penny";
// penny.companyName = "Cheese cake factory";
// penny.contactNumber = 9632587415;
penny.init("Penny", "Cheese cake factory", 9632587415);

console.log(penny);
penny.welcome();

const stuart = Object.create(EmployeeProto);
// stuart.firstName = "Stuart";
// stuart.companyName = "Commic book store";
// stuart.contactNumber = 7412589635;
stuart.init("Stuart", "Commic book store", 7412589635);

console.log(stuart);
stuart.welcome();
