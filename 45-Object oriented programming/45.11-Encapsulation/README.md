## 45.11 Encapsulation

Encapsulation basically means hiding the internal details and exposing only features that user or other classes concerns. For example when we book a movie ticket, we just select the movie, select seats and make the payment and we get the tickets. But actually at the backend system has to check if the payment is successful or not, between your seat selection and payment confirmation does anyone else booked that ticket or not, once the ticket is successfully booked system has to mark that sear unavailable for others, system has to send the confirmation to user, etc. So all these tasks are not suppossed to be done by user. system internally should do these tasks and give the final confirmation to the user based on the outcome of all the tasks. So there is no point in making all internal processes available to user. So these processes are hidden and done in background, this is what encapsulation is. Providing only necessary information/access to user and hiding the internal details.

To understand the encapsulation better and it's importance let's take below example.
Consider you are implementing loan account functionality to banking application. You have details of user's account. User will be allowed to request for lone and specify the amount. The loan must go through an approval process, if the requested amount is less than the 10% of total balance of user then only the loan will be approved otherwise user should not get the loan. Once the loan is approved, a transaction of loan amount must be added and total balance must be updated.

Now as per what all we have learned till now we can easily implement this like below.

```javascript
"use strict";

class Account {
  constructor(fullName, currency, password) {
    this.fullName = fullName;
    this.currency = currency;
    this.password = password;
    this.transactions = [];
    this.totalBalance = 5000;
    this.locale = navigator.language;
  }

  updateBalance(amount) {
    this.totalBalance += amount;
  }

  completeTransaction(amount) {
    this.transactions.push(amount);
    this.updateBalance(amount);
  }

  loanApproval(amount) {
    if (0.1 * this.totalBalance > amount) return true;
    return false;
  }

  loanRequest(amount) {
    if (this.loanApproval(amount)) {
      console.log("Your loan is approved..!!");
      this.completeTransaction(amount);
    } else {
      console.log("Sorry we can't approve your loan..!!");
    }
  }

  get accountBalance() {
    return this.totalBalance;
  }
}

const sheldonsAcc = new Account("sheldone cooper", "USD", "1111");

sheldonsAcc.loanRequest(1000);
console.log(sheldonsAcc.accountBalance);
sheldonsAcc.loanRequest(100);
console.log(sheldonsAcc.accountBalance);
```

Here we have created an account class and we have added method to request loan, this method then internally call the loanApproval method and based on the response of approval method it will either complete the ttransaction by adding the loan amount to users account or will show appropriate message to the user. To test this we have created an object of account i.e. 'sheldonsAcc' and requested two loans. First one is for 1000$ which will be disallowed as the initial total balance we have set to 5000$ and 1000 is greater than 10% of 5000. Second loan is of 100$ which will be allowed and the account balance must be updated to 5100$ after second loan. This is what we will get in output.

```
Sorry we can't approve your loan..!!
5000
Your loan is approved..!!
5100
```

Now, what if accidently someone called completeTransaction, updateBalance or loanApproval method instead of loanRequest like below.

```javascript
sheldonsAcc.completeTransaction(3000);
console.log(sheldonsAcc.accountBalance);
sheldonsAcc.updateBalance(1000);
console.log(sheldonsAcc.accountBalance);
```

we will get the output as.

```
8000
9000
```

Here we can clearly see that without even requesting loan or getting the approval user's account balance got updated. This is not correct. We must restrict access to all these method from outside objects, this can only be called internally. To achieve this we need encapsulation.

In javascript sometimes we use a convention to add an \_ (i.e. underscore) before the property or method name which we want to protect from accidental access. This is not truely protecting the menthod and fields from manipulating or calling but atleast the developer working on the code will be aware that if there is an '\_' prepended to the field or method then it should not be accessed outside the class and by that the accidental update of data or bugs can be eliminated. Have a look at below code.

```javascript
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
```

Here we have added an underscore (\_) to some of the fields to mention those fields are private and we should not directly modify those fields from outside. Apart from this we do have added underscore (\_) to the methods as well to indicate the same thing.

Now here the important part is that the developer must have knowledge about the convention which is being followed that if there is an underscore (\_) before a method or field name then that field isprotected and should not be accessed from outside. So this is not what we can call as complete abstraction. But recently a new feature was added to create class fields in javascript classes which protect fields and methods (But by this javascript classes are not the pure abstraction on constructor functions). By using class field we can truely make the fields and methods private and then it will not be accessable form outside and will not be a part of prototype, it will be on instance level.

The syntax to implement this is adding a hash (#) at the start of field name and define them outside the constructor, and in case of methods add a # in front of method name.

Note : if we dont add # before the class fields then those fields will become the public fields.

Have a look at below code.

```javascript
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
```

In above code we have created two class fields with # symbol prepended to them which will make the fields private. So those fields will not be accessable outside. Now we have also added two fields without prepending with # symbol, those two fields are public and can be accessed from everywhere. Same goes with the methods.

Now if you try to access any of the private field or method directly on 'dheldonsAcc' you will be shown an error saying 'Property is not accessible outside class because it has a private identifier.' And we can implement true encapsulation using this.

It is important to notice the difference now that private methods are not added to the prototype, instead they are added separately as 'privateMethods'. Observe below structure of Account object.

![private_methods.png (45-Object oriented programming/45.11-Encapsulation/images/private_methods.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/45-Object%20oriented%20programming/45.11-Encapsulation/images/private_methods.png)
