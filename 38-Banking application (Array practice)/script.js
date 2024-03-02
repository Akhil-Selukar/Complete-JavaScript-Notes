"use strict";

const account1 = {
  owner: "Sheldon cooper",
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  password: 1111,
};

const account2 = {
  owner: "Penny unknown",
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  password: 2222,
};

const account3 = {
  owner: "Leonard hofstadert",
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  password: 3333,
};

const account4 = {
  owner: "Howard wolowitz",
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  password: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerTransactions = document.querySelector(".transaction");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnDeposit = document.querySelector(".form__btn--deposit");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginpassword = document.querySelector(".login__input--password");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputDepositAmount = document.querySelector(
  ".form__input--deposit-amount"
);
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePassword = document.querySelector(".form__input--password");

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const transactions = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayTransactions = function (transactions) {
  containerTransactions.innerHTML = "";

  transactions.forEach((transactionAmount, i) => {
    const transactionType = transactionAmount > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="transaction__row">
      <div class="transaction__type transaction__type--${transactionType}">
        ${i + 1} ${transactionType}
      </div>
      <div class="transaction__value">${transactionAmount} €</div>
    </div>
    `;

    containerTransactions.insertAdjacentHTML(`afterbegin`, html);
  });
};

// displayTransactions(account1.transactions);

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

const calcDisplayBalance = function (acc) {
  acc.totalBalance = acc.transactions.reduce((acc, amt) => acc + amt, 0);

  labelBalance.textContent = `${acc.totalBalance} €`;
};

// calcDisplayBalance(account1.transactions);

const calculateSummary = function (acc) {
  const deposits = acc.transactions
    .filter((transactionAmt) => transactionAmt > 0)
    .reduce((acc, amount) => acc + amount, 0);

  labelSumIn.textContent = `${deposits} €`;

  const withdrawl = acc.transactions
    .filter((transactionAmt) => transactionAmt < 0)
    .reduce((acc, amount) => acc + amount, 0);

  labelSumOut.textContent = `${Math.abs(withdrawl)} €`;

  const interest = acc.transactions
    .filter((transactionAmount) => transactionAmount > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${interest} €`;
};

// calculateSummary(account1.transactions);

function updateUI(account) {
  // Display current balance
  calcDisplayBalance(account);

  // Display transactions
  displayTransactions(account.transactions);

  // Display account summary
  calculateSummary(account);
}

// Login event handler
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

    // // Display current balance
    // calcDisplayBalance(currentLoggedInAccount);

    // // Display transactions
    // displayTransactions(currentLoggedInAccount.transactions);

    // // Display account summary
    // calculateSummary(currentLoggedInAccount);

    updateUI(currentLoggedInAccount);
  }
});

// Transfer money functionality
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const transferToAccount = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );

  if (
    amount > 0 &&
    currentLoggedInAccount.totalBalance >= amount &&
    transferToAccount &&
    transferToAccount?.userName !== currentLoggedInAccount.userName
  ) {
    transferToAccount.transactions.push(amount);
    currentLoggedInAccount.transactions.push(-1 * amount);
  }
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferTo.blur();
  updateUI(currentLoggedInAccount);
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentLoggedInAccount.userName &&
    Number(inputClosePassword.value) === currentLoggedInAccount.password
  ) {
    const accountIndex = accounts.findIndex(
      (account) => account.userName === inputCloseUsername.value
    );
    accounts.splice(accountIndex, 1);
    containerApp.style.opacity = 0;
  }
});

btnDeposit.addEventListener("click", function (e) {
  e.preventDefault();
  if (Number(inputDepositAmount.value) > 200) {
    currentLoggedInAccount.transactions.push(Number(inputDepositAmount.value));
  }
  updateUI(currentLoggedInAccount);
  inputDepositAmount.value = "";
});
