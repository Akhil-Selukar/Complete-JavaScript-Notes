"use strict";

class Account {
  constructor(fullName, currency, password) {
    this.fullName = fullName;
    this.currency = currency;
    this._password = password;
    this._transactions = [];
    this._totalBalance = 5000;
    this._locale = navigator.language;
  }

  _updateBalance(amount) {
    this._totalBalance += amount;
  }

  _completeTransaction(amount) {
    this._transactions.push(amount);
    this._updateBalance(amount);
  }

  _loanApproval(amount) {
    if (0.1 * this._totalBalance > amount) return true;
    return false;
  }

  loanRequest(amount) {
    if (this._loanApproval(amount)) {
      console.log("Your loan is approved..!!");
      this._completeTransaction(amount);
    } else {
      console.log("Sorry we can't approve your loan..!!");
    }
  }

  get accountBalance() {
    return this._totalBalance;
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
