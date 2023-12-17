## 12 Javascript Strict Mode

Javascript strict mode can be activated by just writing a single line at the start of the javascript code. `"use strict";` (It has to be 1st line in the code to activate strict mode throughout the code.)

By default javascript is a very forgiving language and barely throws an error and hence it is very hard to debug if we make any mistake in huge code. In such cases strict mode gives better console messages and better sugestions which we can use to identif the errors. Consider below example where we have intentionally made a mistake and we are running the code without strict mode.

```javascript
const isTestPass = true;
let hasDriversLicense = false;

if (isTestPass) {
  hasDriverLicense = true;
}

if (hasDriversLicense) {
  console.log("You are allowed to drive");
}
```

Here we have declared a constant i.e. isTestPassed and assigned boolean value `true` to it. Then we have declared a variable with a complex name `hasDriversLicense` and it is set to `false`.

Now we are checking is the test passed or not and if it is passed then we want to make `hasDriversLicense` as `true` and hence we are expectinig the last if condition will also become true and `console.log("You are allowed to drive");` will be executed and it will print message 'You are allowed to drive' on console.

But here in console nothing will be printed (not even any error message.). This is because inside the first if statement instead of assiging true value to 'hasDriversLicense' we have assigned it to 'hasDriverLicense' (there is a type in variable name). Now consider this happened in a huge code of 1000 lines, in suce case it's really hard to locate the exact error.

Now if we run same code with strict mode on.

```javascript
"use strict";

const isTestPass = true;
let hasDriversLicense = false;

if (isTestPass) {
  hasDriverLicense = true;
}

if (hasDriversLicense) {
  console.log("You are allowed to drive");
}
```

In this case as well we have the same error but the only difference is that we have strict mode on. So in this case javascript will display an error message in console

<p style="color:red;">Uncaught ReferenceError: hasDriverLicense is not defined at script.js:7:20</p>

This error message stats that the variable 'hasDriverLicense' is not defined anywhere and we are directly assigning value to it at line number 7 of script.js. By using this message we can go to line number 7 and check the declaration of the variable and identify that the declared and used variables are not the same.

Another example where strict mode is useful is it restrict us to use some words which might be used in future releases of javascript to introduce new features. So without strict mode we can safely use words like 'private' and 'interface' as variables but in most of the programming languages those words has specific meaning and features like that can be introduced in future releases of javascript. So if we use such words and in future if those words becomes reserved keywords in javascript then our code might stop working. Hence to prevent such things strict mode give us error and restrict us from using such words as variable name.

Consider below example to understand this.

```javascript
let interface = "Hi, my name is interface..!!";
console.log(interface);

let private = "This is my private mesage..!!";
console.log(private);
```

The output of this code will be

```
Hi, my name is interface..!!
This is my private mesage..!!
```

But if we run same code with strict mode on.

```javascript
"use strict";

let interface = "Hi, my name is interface..!!";
console.log(interface);

let private = "This is my private mesage..!!";
console.log(private);
```

Now it will give us error message.

<p style="color:red;">Uncaught SyntaxError: Unexpected strict mode reserved word (at script.js:3:1)</>

Which tell's us that at line number 3 we have used strict mode reserved word.

It is always a best practice to use strict mode while writing javascript code.
