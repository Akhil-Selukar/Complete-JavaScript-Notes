"use strict";

class Account {
  // public fields
  totalBalance = 5000;
  locale = navigator.language;

  // private fields
  #password;
  #transactions = [];

  constructor(fullName, currency, password) {
    this.fullName = fullName;
    this.currency = currency;
    this.#password = password;
  }

  #updateBalance(amount) {
    this.totalBalance += amount;
  }

  #completeTransaction(amount) {
    this.#transactions.push(amount);
    this.#updateBalance(amount);
  }

  #loanApproval(amount) {
    if (0.1 * this.totalBalance > amount) return true;
    return false;
  }

  loanRequest(amount) {
    if (this.#loanApproval(amount)) {
      console.log("Your loan is approved..!!");
      this.#completeTransaction(amount);
    } else {
      console.log("Sorry we can't approve your loan..!!");
    }
  }

  get accountBalance() {
    return this.totalBalance;
  }
}

const sheldonsAcc = new Account("sheldone cooper", "USD", "1111");
console.log(sheldonsAcc);

sheldonsAcc.loanRequest(1000);
console.log(sheldonsAcc.accountBalance);
sheldonsAcc.loanRequest(100);
console.log(sheldonsAcc.accountBalance);

// sheldonsAcc.completeTransaction(3000);
// console.log(sheldonsAcc.accountBalance);
// sheldonsAcc.updateBalance(1000);
// console.log(sheldonsAcc.accountBalance);
