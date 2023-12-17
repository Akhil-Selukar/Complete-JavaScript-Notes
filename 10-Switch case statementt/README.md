## 06 Javascript Switch Case Statements

Switch case ststement is basically used when we have to take multiple different decisions based on the value of a variable. The same can be achieved by using `if-else if-...-else` pattern.

Let's have a look at below code example.

```javascript
const day = "tuesday";

switch (day) {
  case "monday":
    console.log(`What..!! 😫It's monday already..??`);
    console.log(`That means it's office time again.`);
    break;
  case "tuesday":
    console.log(`4 more days for the weekend..!!`);
    break;
  case "wednesday":
  case "thursday":
    console.log(`OMG, I have lot's of work to finish..!!`);
    console.log(`Let's finish it today.`);
    break;
  case "friday":
    console.log(`Yey..!! It's firday. Lte's have some fun..!!`);
    break;
  case "saturday":
  case "sunday":
    console.log(`It's weekend, so relax..!!`);
    break;
  default:
    console.log(`Wait what..?? Is this even a day..??`);
}
```

The output for above code example is

```
4 more days for the weekend..!!
```

In the above code example we have a constant defined having value 'tuesday' and we have written `switch(day)` this is going to match (Strict equality `===`) value of day with the multiple cases available below. As soon as it finds the match it executes the code after that. Hence we got `4 more days for the weekend..!!` as output. Now after this console.log() we have a `break;`, This break statement is very important. If we remove the break, then the code simply continue with the next case block and so on till the end or the available break.

Have a closer look at below lines in above code:

```javascript
  case "wednesday":
  case "thursday":
    console.log(`OMG, I have lot's of work to finish..!!`);
    console.log(`Let's finish it today.`);
    break;
```

here we don't have anything to execute if the day value matches with 'wednesday' but we can see that there is no `break;` as well so it will go to next case i.e. 'thursday' and execute the console.log() available there and at the end as we have break statement, it terminate the switch block.

Also there is a different case present at the end `default`

```javascript
  default:
    console.log(`Wait what..?? Is this even a day..??`);
```

This will be executed only in case the value of `day` is not matched with any of the case present. It is not mandatory to write break after default statement if we are writing default block at the end of all cases. But if we are writing default anywhere else in between cases then it is mandatory to write a break statement in default case as well.
