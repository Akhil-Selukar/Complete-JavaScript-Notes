## 38 Simple banking application

**Context -** Here in this section we are going to build very simple banking application which will have 4 user accounts. Each user can login and once he or she logs in, the application will show all the transactions in the accounts. Along with that there will be three options, one to deposit money, second to transfer money to another account and last one is to close the account.

**Working -** To understand the working of this application have a look at below flowchart.

![Application flowchart(38-Banking application (Array practice)/images/Flowchart.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/38-Banking%20application%20(Array%20practice)/images/Flowchart.png>)

Flow 1 - When user enter login details, it will check for correct credentials. If credentials are correct then UI will be displayed. UI will have brlow componants.

- Transactions history
- Total balance
- Deposit amount option
- Transfer amount option
- A logout timer

Flow 2 - Feature to sort the transactions. If the transactions are already sorted then it will display them and if not then transactions will be sorted.

Flow 3 - Transfer money feature. this will accept the amount to transfer and the account to which it should be transfered. It will add a withdrawl transaction of given amount to source account and a deposit transaction to target account and adjust the total amount in both the accounts accordingly.

Flow 4 - Deposit money, This will add a deposit transaction of given amount to the current account and calculate the total balance accordingly.

Flow 5 - Close account feature. This will ask for the credentials and if the correct credentials are given then the account data will be deleted.

Flow 6 - If the logout timer is expired then the account will be logged out.

### Code, logic and hints

In script.js if we see we have four objects (account1, account2, account3 and account4) each account have owners name, transactions history, interest rate in % and password for the account. Then we have an array of accounts (This array will have only active account, if we close any account then it will be removed from the array.) Then we have used querySelector and by using class selectors we have selected all the html elements from the DOM.

**displayTransactions function** -
This function accepts the transactions array and create a html string in below format for each ttransaction.

```html
<div class="transaction__row">
  <div class="transaction__type transaction__type--${transactionType}">
    1 Withdrawl
  </div>
  <div class="transaction__value">-500</div>
</div>
```

To do this it iterats over all the transactions and after creating above string, it add the string to the HTML using DOM manipulation at line `` containerTransactions.insertAdjacentHTML(`afterbegin`, html);
  }); `` here afterbegin instructs that the after each iteration the new html string need to be added on top of the previous one.

**To generate username for each account.** -
We need a username for each account so that the account can be logged in. To create this username we will be using the initials of user's name in lower case. Now we have created below function to make the username and save it in respective object with property name 'userName'

```javascript
const addUserNames = function (accounts) {
  accounts.forEach(function (account) {
    account.userName = account.owner
      .toLowerCase()
      .split(" ")
      .map((word) => word[0])
      .join("");
  });
};

addUserNames(accounts);
console.log(accounts);
```

In aabove function we are accepting the accounnts array, then we are looping over all accounts using forEach loop. Now for each account we are adding a new property called 'userName' and we are creating the value of this property using account owner's name. first we are using toLowerCase(), this will convert the owners name into lowercase string. Then we used split(" "), this will split the owners name by a space which will return us an array of two words. On that array we are using `.map((word) => word[0])` this will return us an array of first letter of each word inside the array returned bu split(). At last we are joining the two letters to form the userName. This username will be assigned as a property into respective object. So after executing above code the original objects will look like below.

```
[
  {
    owner: "Sheldon cooper",
    transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    passwd: 1111,
    userName: sc,
  },
  {
    owner: "Penny unknown",
    transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    passwd: 2222,
    userName: pu,
  },
  {
    owner: "Leonard hofstadert",
    transactions: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    passwd: 3333,
    userName: lh,
  },
  {
    owner: "Howard wolowitz",
    transactions: [430, 1000, 700, 50, 90],
    interestRate: 1,
    passwd: 4444,
    userName: hw,
  }
]
```
