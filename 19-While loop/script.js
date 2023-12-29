"use strict";

let bankBalance = 1000;

while (bankBalance > 0) {
  let amountToWithdraw = prompt(
    `Your Account balance is $${bankBalance}. Enter the amount you want to withdraw`
  );
  if (amountToWithdraw > bankBalance) {
    console.log("Insufficient balance.");
  } else {
    bankBalance = bankBalance - amountToWithdraw;
    console.log(
      `$${amountToWithdraw} withdrawn successfully. Your account balance is $${bankBalance}.`
    );
  }
}
