"use strict";

const account1 = {
  owner: "Sheldon cooper",
  transactions: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  passwd: 1111,
};

const account2 = {
  owner: "Penny unknown",
  transactions: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  passwd: 2222,
};

const account3 = {
  owner: "Leonard hofstadert",
  transactions: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  passwd: 3333,
};

const account4 = {
  owner: "Howard wolowitz",
  transactions: [430, 1000, 700, 50, 90],
  interestRate: 1,
  passwd: 4444,
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
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginpasswd = document.querySelector(".login__input--passwd");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosepasswd = document.querySelector(".form__input--passwd");

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
      <div class="transaction__value">${transactionAmount}</div>
    </div>
    `;

    containerTransactions.insertAdjacentHTML(`afterbegin`, html);
  });
};

displayTransactions(account1.transactions);

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

const calcDisplayBalance = function (trans) {
  const totalBalance = trans.reduce((acc, amt) => acc + amt, 0);

  labelBalance.textContent = `${totalBalance} EUR`;
};

calcDisplayBalance(account1.transactions);
