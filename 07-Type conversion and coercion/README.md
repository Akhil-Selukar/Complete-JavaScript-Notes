## 07 Javascript Type Conversion and Coercion

Type conversion means when we specifically convert one datatype to anothre datatype whereas type coercion is when this happens implicitly behind the scene.

To understand type conversion better look at the below example.

```javascript
const accountBalance = "2000";

console.log(typeof accountBalance);
console.log(accountBalance + 100);
console.log(typeof Number(accountBalance));
console.log(Number(accountBalance) + 100);
console.log(typeof 200);
console.log(typeof String(200));
console.log(Number("John"));
console.log(typeof NaN);
```

The output of above code is,

```
string
2000100
number
2100
number
string
NaN
number
```

Here we can see that the value of variable `accountBalance` is of string type and if we try to add a number `100` in it, javascript does not throw error like any other programming languages. It simply perform the concatination operation and return the result as `200100`. To make this work as expected and get correct addition we have to convert string to number before adding 100 to it. This type conversion can be done by using `Number()` function. Hence line `console.log(typeof Number(accountBalance));` shows the type as `number` as the function converts the String value into the number, and now if we add 100 to this we get desired result i.e. `2100` at line `console.log(Number(accountBalance) + 100);`. Now if somewhere we want to get the number as a string value then to convert this we can use `String()` function, we can see this as `typeof 200` is `number` and `typeof String(200)` is `string`.

If we try to convert a String value which doesnot represent any number to a number by using `Number()` function then it returns `NaN` as result. (`NaN` means 'Not a Number'). Here the thing to note is that `typeOf NaN` is a `number`. This is because the Number() function returns a number but here the value give to Number() function is invalid hence `typeOf NaN` returning `number` suggests that this returned value could have been number but the given input to Number() funtion does not represent any number i.e. Not a Number.

### Type coercion

Type coercion is when javascript impliicitly converts one datatype to another. Look at this line `console.log("Line number " + 14 + " shows type coercion example.");` here as we have seen earlier the output will be `Line number 14 shows type coercion example.` Here we are adding string to a number and then again to a srting. So here the + operator triggers type coercion and convert number to string and then concatinate all the strings to generate result.

Just like + operator trigger type coercion from number to string, - operator triggers type coercion from string to number. So the line `console.log("Line number " - 14 - " shows type coercion example.");` tries to do `Number("Line number ")` and `Number(" shows type coercion example.")`, both of this returns `NaN` hence the complete operation returns `NaN`. Whereas in the line `console.log("5" - 2 - "1");` the type coercion `Number("5")` returns 5, `Number(1)` returns 1 and hence the overall operation becoms `5 - 2 - 1` and result into 2. Same is true for multiplication operator `*` and division operator `/`.

Consider the below code

```javascript
let num = "1" + 1;
num = num - 1;
console.log(num);
```

Output :
10

Here at first line `"1" + 1` will result in `11` because + operator will trigger type coercion from number to string. Then at next line `num - 1` will become `"11" - 1`, here - operator will trigger type coercion from string to number and convert string "11" to number 11 and and `"11" - 1` will become `11 - 1` which will return number 10 as a output.

Similarly,

`10 + 2 + 3 + "5"` returns string "155" as output.

`"10" - "4" - 2 + "2"` returns string "42" as output.
