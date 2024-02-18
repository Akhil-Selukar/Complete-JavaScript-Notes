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

**To display the total balance of account** - To display total balance we need to calculate the sum of all the transactions done in the given account which can be done by using reduce method. We have below function for the same.

```javascript
const calcDisplayBalance = function (trans) {
  const totalBalance = trans.reduce((acc, amt) => acc + amt, 0);

  labelBalance.textContent = `${totalBalance} EUR`;
};

calcDisplayBalance(account1.transactions);
```

In above function we are accepting the array of transactions as an input and we are using reduce method over that array. In reduce method we are adding each transaction amount into the accumulator which is initiated with initial value of 0. Hence at the end we will be having the total balance of account in totalBalance variable. By using `` labelBalance.textContent = `${totalBalance} EUR`; ``, we are setting the calculated total balance to the paragraph marked with class `balance__label` in the html document using DOM manipulation.

**Calculation of total deposit, withdrawl and interest** -
At the bottom of the application we are displaying the total amount deposited so far, total amount withdrawn so far and the total interest paid by the bank. The interest paid is calculated on every deposit. and the rate of interest for now in below example we have hardcoded to 1.2% but in actual final version rate of interest will be taken from the account object. Now have a look at below code.

```javascript
const calculateSummary = function (transactions) {
  const deposits = transactions
    .filter((transactionAmt) => transactionAmt > 0)
    .reduce((acc, amount) => acc + amount, 0);

  labelSumIn.textContent = `${deposits} €`;

  const withdrawl = transactions
    .filter((transactionAmt) => transactionAmt < 0)
    .reduce((acc, amount) => acc + amount, 0);

  labelSumOut.textContent = `${Math.abs(withdrawl)} €`;

  const interest = transactions
    .filter((transactionAmount) => transactionAmount > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${interest} €`;
};

calculateSummary(account1.transactions);
```

Here we are accepting the array of transactions for an account and then at first calculating the total deposits, for this if the transaction amount is positive then it is a deposit hence using filter method we filtered out all the positive amount transactions and then we use reduce method (by method chaining) to calculate the sum of all the deposits made in the account. Then we assigned the calculated total to the 'Deposit' lable in html using DOM manipulation. Same is done for withdrawl by checking the negative transaction amount. To calculate the interest we have used the Map mathod and calculated 1.2% of each deposited value and then add all those interests using reduce method.

> [!IMPORTANT] Important note here is, mathod chaining is good when we are not chaining too many methods and the array size is not huge, otherwse there will be significant performance impact. Also never use method chaining with the methods which mutates the original array.

**Implementing login functionality** - Till now all the methods that we wrote are working on a specific hardcoded user. But we want these to work for specific logged in user. To implement this we need to implement login functionality first. So whenever user enter username and password to the provided section we have to validate it with the actual username and password. Now if we see the HTML the section to enter username and password is a form with a button to submit the changes. So we can use a event listener which will listen for the click event on the button and as soon as the event occurs it will read username and password and validate it against the stored values. The implementation for this part will look like below.

```javascript
let currentLoggedInAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form frmo refreshing the page
  e.preventDefault();

  currentLoggedInAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );

  if (currentLoggedInAccount?.password === Number(inputLoginpassword.value)) {
    labelWelcome.textContent = `Welcome ${
      currentLoggedInAccount.owner.split(" ")[0]
    }`;

    containerApp.style.opacity = 100;
  }
});
```

Here we have added the event listener which is listening for the click event on the button and as soon as the event happens it is finding the userAccount with the username entered in userName field. UserName field entered in frontend is accessed by `inputLoginUsername.value` and we are using find method on an array which holds all active users. When the username is matched we are fetching that users accouont object and storing it into a variable called 'currentLoggedInAccount'. Now we got the account but we want to make sure that password entered is also correct hence we are validating the password stored in the object which we got earlier against the password entered in frontend field.

Now there might be a chance that username is also incorrect in that case currentLoggedInAccount will be `udefined` and if we try to access password property from undefined then it will throw an error hence we are using [optional chaining](!https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/31-Optional%20chaining) here, so the password property will be accessed only if the currentLoggedInAccount has some value. We already know that the value which we get from frontend elements are always string hence we have converted it to number and then compared with the value stored in the object. Now if the password is also correct then we want to show the complete UI hence we are setting the 'opicity' property from css for app element which is the complete UI to 100 by using line `containerApp.style.opacity = 100;`. The remaining code is just to display the welcome message with users first name.

> [!NOTE] by default the form refresh the page on submit and if that happens then all our properties set above will be reset hence we dont want to refresh the UI hence we have written `e.preventDefault();` by accessing the event object.

Now here even though we are able to login now and able to see the UI but the content in UI i.e. transactions and total balance and summary is not changeing based on the account. This is because we are still calling the methods which we created earlier with hardcoded account transactions. To make it dynamic we have to call all the methods from the above callback function defined for event listener.

```javascript
let currentLoggedInAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form frmo refreshing the page
  e.preventDefault();

  currentLoggedInAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );

  if (currentLoggedInAccount?.password === Number(inputLoginpassword.value)) {
    // display UI
    labelWelcome.textContent = `Welcome ${
      currentLoggedInAccount.owner.split(" ")[0]
    }`;

    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginpassword.value = "";
    inputLoginpassword.blur(); // to unselect the passowrd field after login

    // Display current balance
    calcDisplayBalance(currentLoggedInAccount.transactions);

    // Display transactions
    displayTransactions(currentLoggedInAccount.transactions);

    // Display account summary
    calculateSummary(currentLoggedInAccount);
  }
});
```

Also the `calculateSummary` method is modified to accept the complete the account as input because we wanted to read the interest rate also from the logged in account object.
