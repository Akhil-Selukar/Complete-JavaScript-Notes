## 19 Javascript While Loop

While loop is also like for loop but the syntax and application is different. In for loop example which was discussed in last section (rainbow array example), we know that the maximum number of iterations will be equal to the length of that array and we know in advance that we have to increment the counter by 1 or 2 or any predecided number. But consider a scenario where you are not sure about the number of iterations for example if you have to throw a dice till you get '6'. In this case you might get '6' at the first throw, you might require 5 throws or you might require 20. No one can decide the exact throws which will be required so in such cases using for loop is not that much efficient. So while loop is the best option in this scenario. Consider below example of while loop.

```javascript
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
```

Here the scenario is you have $1000 in your bank account and the code allow you to withdraw money from your account. It must allow you to withdraw till your bank account have some balance, and once your bank balance becomes 0 it must not allow you to witdraw further. Now in this case it may happen that you can withdraw all $1000 in one go, you might withdraw $500 two times or you may withdraw $100 ten times. There are multiple ways you can withdraw $1000. So we are nont sure ablut the number of iteration, we dont have any counter. The only thing that we have is the condition which 'bank balance must not be 0'. So here we use while loop.

In above code we have set the initial balance to $1000 at line `let bankBalance = 1000;`. Then we start the while loop and the first thing we are checking is that the balance must not be 0 by using `while (bankBalance > 0)`. If this condition is true, then only the code inside the loop body will be exxecuted. In our case the condition is true hence it will prompt you with the current balance and ask you for the amount to be withdrawn. (again we are using prompt here, prompt basically display a popup to the user and ask for user input and save the input in given variable, 'amountToWithdraw' in above example.) Now lets assume you enter 200 then it checks that $200 is less than your account balance i.e. $1000. So it can be withdrawn so it will deduct $200 from the account balance and display the output that $200 is withdrawn and your new account balance is $800. Now it will again check the condition `(bankBalance > 0)`, i.e. 800 > 0, yes it is so condition is true and it will again show the prompt saying your bank balance is $800, enter the amount you want to withdraw, let's say this time we withdraw $500. Again 500 < 800 so can be withdrawn. And now the new balance will be 300. Again the condition will be checked i.e. 300 > 0 which is true so again we will get the prompt saying account balance is $300 enter amount to withdraw. Now we withdraw all $300 in this case the new balance will be 0 and now the condition 0 > 0 will become false and the loop will be terminated.

The output at the console in above scenario will be

```
$200 withdrawn successfully. Your account balance is $800.
$500 withdrawn successfully. Your account balance is $300.
$300 withdrawn successfully. Your account balance is $0.
```

Note:
Most of the time when we are aware of the number of iterations we have to perform and we have a counter to perform the iterations we go with for loop, while in situations where we dont know in advance the number of times we have to iterate the loop and we only have the condition till when we want to iterate the loop, we go with while loop.
