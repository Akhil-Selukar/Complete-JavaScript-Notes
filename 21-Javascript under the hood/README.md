## 21 Javascript under the hood

### Some important facts and questions about javasscript.

**1. Javascript is a high level language** - The main difference between high and low level laguage is in low level languages we manually have to manage the resources required for the execution of our code like in C language. But in low level language we don't have to manage resources. It is implicitly taken care of.<br>
The main advantage of low level languages is, low level languages are much faster and optimised than high level languages.

**2. Garbage collection** - Garbage collector is one of the tool that is used for managing the resources in high level languages.javascript has a implicite garbage collector which takes care of all the unused/referenced objects in memory and destroy them. We do not have to explicitely destroy/remove those objects from the memory.

**3. Javascript is a just-in-time compiled language** - the very famouse question is "is javascript an interprated language or compiled language?" to answer this question we must understand the difference between interprated and compiled language and then understand how javascript is executed.<br>

- Interprated language - Interpreted languages executes code line by line.. Means one line will be read by the compiler, then that line will be executed and then after that net line will be read and the process continues.
- Compiled languages - In compiled languages the complete code will be read and converted into machine code (i.e. binary) and then that binary can be executed at any time on any system.

Now to the main question, javascript was used to be a purely interprated language. But the main drawback of interprated language is slowness. But in modern days where fullfledge applications are written using javascript, slowness is not at all accepted. Hence in modern javascript, it uses a mix of both interprated and compiled language which is called 'Just in time compilation' or JIT. This means that the complete source code is converted into the machine code but there wont be any executable file created for later execution. It will be executed immediately and while execution javascript contineously pereform optimizations. Means it convert the source code for immediate execution and start the execution immediately and then work on optimization of the code hence it does not create any file for later execution and called just in time compilation.

So finally the answer to the question is javascript is a Just in time compiled language i.e. a mix of both compiled and interprated language.

Note - In case of javascript the conversion of human readable code to machine code happens in javascript engine. The most common javascript engine is V8 which is being used by google chrome. There are other javascript engines like 'Chakra' in Edge or IE,'Spider monkey' used in Mozilla firefox, 'Javascript core webkit' used in safari.

**3. Javascript is a multi-paradigm language** - Paradigm means an approach or way to write/structure the code. Below are the three most popular paradigm

- Procedural programming
- Object oriented programming
- Functional programming

Procedural programming organizes the code into chunks of procedures, Object-oriented code helps the programmer think of objects which represent a concept or real-world component, and Functional programming orients the programmer in the world of pure functions. Javascript uses all of the above programming styles.

**4. All the functions in javascript are first class functions** - means javascript treats functions as regular variables and we can pass the function into another function and return a function from a function just like a variable. For example

```javascript
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnClose.addEventListener("click", closeModal);
```

In above example we are passing 'closeModal' function in the addEventListener just like passing a variable.

**5. Javascript is a dynamically typed or dynamic language** - In javascript we dont have to declare the type of variable. Also the type of variables can be changed when we reassign a variable with different value. Hence javascript is a dynamically typed language.

**6. Javascript is a single threaded language** - javascript runs in a one single thread so it can execute one thing at a time. Which rise a question that 'what happens when there is a long running task like fetching data from DB or exporting data to some file?' It should not block the program for that long, we want non-blocking behaviour here. This is achieved in javascript byusing an 'event loop' which takes long running task, executes them in background and then put them back in main thread once they are completed. This is a very high level explaination, we will understand this whole concept in 'Concurrency model' section which explains how javascript handles multiple tasks at the same time.

### Q. How javascript code is executed and what is javascript engine?

-> Javascript engine is a program that executes the javascript program. The most popular javascript engine is 'V8' engine which is used by google chrome and nodeJS. There are multiple other javascript engines available and used by different browsers.

Any javascript engine always contain two components a call stack and a heap memory. A callstack is where the code is executed using execution context and a heap is a unstructured memory where all the objects are stored which are required by the call stack during execution of the code.<br>

![JS Engine image (21-Javascript under the hood/images/JS_Engine.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/21-Javascript%20under%20the%20hood/images/JS_Engine.png)

Now we will understand step by step how javascript code is executed in an javascript engine. To understand each step better have a look at the below image after you read each step and try to corelate the flow using below diagram.

![JS Code execution flow (21-Javascript under the hood/images/JS_Code_Execution.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/21-Javascript%20under%20the%20hood/images/JS_Code_Execution.png)

The first step (step 1) as soon as javascript code enters the JS engine is to parse the code i.e. to read the code. During this process the code is parsed to a data structure called AST (Abstract Syntax Tree). This is the step where any syntax syntex error is identified while creating the AST. The created AST is then used to convert the code to machine readable code.

The next step (step 2) is the compilation. This step takes the AST and convert it into the machine code. This machine code gets executed right away (Step 3) as javascript uses just in time compilation.

Now here the code starts to execute. But modern javascript engines creates a very unoptimised version of compiled machine code in the begining to start the execution as soon as possible. Now this unoptimized code is optimized and reompiled again and again during the execution (Step 4) to get the more and more optimized code. The optimmized code is simply swapped with the unoptimized code during the execution. This proess happens multiple time and runs on special internal threads which can't be accessed by us from outside.

Now above is the very high level explination of how javascript engine works. Now lte's see in details how javascript code is executed. Every javascript code is executed in
'Execution context'. Execution context is nothing but the environment in which javascript code is executed. execution context contains all the necessary information required for the code to execute like all variables and objects.

The first thing which happens after the compiled code reaches to execution is the creation of 'global execution context'. This is basically for the top level code. consider below code.

```javascript
const num_1 = 10;
const num_2 = 20;

console.log("Addition operation");

function addNumbers(x, y) {
  logNumbers(x, y);
  return x + y;
}

function logNumbers(x, y) {
  console.log(`adding ${x} and ${y}`);
}

const result = addNumber(num_1, num_2);
```

Here the global execution context which will be created just after compilation will have constant 'num_1' and 'num_2' and the function definations for both the functions but the functions will not be executed. (<em>Note that in a javascript code there can be only one **global** execution context</em>).

Now once the global execution context is created the execution of code starts (i.e. computer CPU process the machine code received.). And once the top level code is executed the functions starts executing. While executing the functions for each and every function call new executing context is created which contains all the necessary information which is required to eecute that function. Same is trrue for methods as well. (All this execution contexts together creates call stack.)

All execution contexts contains below information.

- Variables (i.e. let, const, var)
- Function of which that execution context is.
- Arguments object (A special object which contains all the arguments passed to the function. This is an. This stores the arguments in an array.)
- Scope chain for variables
- this keyword/object

**Important note -** Execution context belonging to arrow functions do not get the arguments object and this keyword. They can use the arguments and this keyword of it's closest regular parent function.

Now the execution contexts for the above example will be as shown below.

![JS Execution context (21-Javascript under the hood/images/Execution_Context.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/21-Javascript%20under%20the%20hood/images/Execution_Context.png)

Now in the above example we have called function 'addNumbers' form global execution context and the function 'logNumbers' from the addNumbers execution context. So it is important to keep track of in which order execution context's need to be called/executed. In this eample we only have 3 execution contexts but in actual application there might be hundred's of execution contexts available and they can be called from different other execution context. So this tracking of order is done by 'Call stack'. So what is 'call stack'?

Call stack is a place in javascript engine where execution contexts get stacked on top of each other to keep track of where we are in the execution. The execution context which is on the top of the stack is the one which is currently running and once the execution of that execution context is done it is removed from the stack and if any function call happens then the execution context related to that function is added to the top of the stack and executed.

Now to understand this better again consider the example above.
As soon as the conde is compiled it starts to execute the top level code and hence the global execution context is created and put in the call stack. Now the global execution context is the only context available and it is at the top hence it starts to execute. Here first the two variables will be defined and then the `console.log("Addition operation");` will be executed and message will be logged.

![Call stack 1 (21-Javascript under the hood/images/Call_Stack_1.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/21-Javascript%20under%20the%20hood/images/Call_Stack_1.png)

As soon a the execution reaches to the line `const result = addNumber(num_1, num_2);`. To call the 'addNumbers' function it's
execution context will be added to the call stack on top of global execution context. Now the topmost context in call stack is addNumbers. So it will start execution of addNumbers function.

![Call stack 2 (21-Javascript under the hood/images/Call_Stack_2.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/21-Javascript%20under%20the%20hood/images/Call_Stack_2.png)

The first line in addNumbers function is the function call to 'logNumbers' function. So as soon as the line `logNumbers(x, y);` executes the execution context of 'addNumbers' function will be added in the call stack and as this will be at the top so this execution context start the execution of function logNumbers and the execution of addNumbers will be paused. (Refer below image.)

![Call stack 3 (21-Javascript under the hood/images/Call_Stack_3.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/21-Javascript%20under%20the%20hood/images/Call_Stack_3.png)

Once the execution of logNumbers is completed the execution context for logNumber will be removed from the call stack and the paused execution of addNumber will start again and it will
execute the line `return x + y;` which will return the result '30'.

![Call stack 4 (21-Javascript under the hood/images/Call_Stack_4.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/21-Javascript%20under%20the%20hood/images/Call_Stack_4.png)

Once the execution of addNumber function is completed the execution context for addNumber will also be reoved from the call stack and the global execution context will be the only context remaining in the call stack and the value of result will be udated to 30 in global execution context.

![Call stacck 5 (21-Javascript under the hood/images/Call_Stack_5.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/21-Javascript%20under%20the%20hood/images/Call_Stack_5.png)

This is how a javascript code is executed in the javascript engine and call stack is used to keep track of the order of execution of functions and nested function calls.

_Note : Ideally global execution context will be removed from the call stack only when we close the browser. Means the global execution context will be there in the stack even if there is notthing to execute the code and this is the reason we can directly write the code in browser's console and it gives us the output because global execution context is still present in the call stack. (In the images above it is removed in last step to make it easy to understand.)_

### Scope of variable and scope chain<hr>

Scope or variable scope tells us where exactly a variable in the javascript code is accessable and where we are not allowed to access it. So scoping is a way in which javascript organize and access variables.

Javascript follows 'Lexical scoping' meaning access is controlled by the placement of functions and code blocks. In simple words lexical scoping gives function an abililty to access variables from it's parent but parent can not access the variable of it's child.

In javascript we have three sccopes

1. Global scope - This is the top level scope. All the variables declared outside any function or block are under global scope and these variables will be accessable in all the functions. have a look at below example.

```javascript
const minBalance = 500;

function termsAndConditions() {
  console.log(`The minimum balance for savings account is ${minBalance}`);
}

console.log(`Minimum balance variable has value ${minBalance}`);
```

In the above example the variable 'minBalance' is declared outside of any function hence it is a globally scoped variable and all the functions will be able to access the variable. Hence we are allowed to use the variable in 'termsAndConditions' function as well as in the console.log() which is not under any function.

2. Function scope - Function scoped variables are only accessable inside the function and the code blocks inside the functions. Consider below example.

```javascript
function termsAndConditions() {
  const minBalance = 500;
  console.log(`The minimum balance for savings account is ${minBalance}`);
}

console.log(`Minimum balance variable has value ${minBalance}`);
```

Here in this example the variable 'minBalance' is defined inside the function 'termsAndConditions' hence it is a function scopped variable and this will only be accessable inside the function. The line `` console.log(`Minimum balance variable has value ${minBalance}`); `` is outside the function and we are trying to access the variable 'minBalance' here. As the variable is function scoped here the code will give reference error.

3. Block scope - Since ES6 block scope is introduced. This scope means that the variables declared inside any code block are accessable only inside the block. for example consider below code.

```javascript
function termsAndConditions(acccountType) {
  if (accountType === "savings") {
    const minBalance = 500;
    console.log(`The minimum balance for savings account is ${minBalance}`);
  }

  console.log(`Default minimum balance is ${minBalance}`);
}

console.log(`Minimum balance variable has value ${minBalance}`);
```

Here in above code the variable 'minBalance' is declared inside the if block hence it is block scopped and will be accessable only inside the if block. The line `` console.log(`Default minimum balance is ${minBalance}`); `` is outside the if block hence this will give reference error. Also `` console.log(`Minimum balance variable has value ${minBalance}`); `` this line is outside the function hence we will not be able to use the 'minBalance' variable here and it will give reference error.

The important point to remember here is '**Block scope is only applicable for variables defined using `let` and `const`. All the variables inside any block but defined using `var` keyword is function/global scoped based on where the code block is placed.**'

Now to understand the scope chain consider below code example.

```javascript
const accountType = "savings";
const userName = "John";

function termsAndConditions(accountType, userName) {
  const branch = "Texas";

  if (accountType === "savings") {
    const minBalance = 500;
    var loanAllowed = false;

    console.log(
      `As your account is ${accountType}, your minimum balance should be ${minBalance} and you load eligibility is ${loanAllowed}.`
    );
  }

  function welcome(userName) {
    const bankName = "SBI";
    console.log(
      `Hello ${userName}, thanks for choosing ${bankName}, ${branch}.`
    );
    console.log(`Your loan eligibility is ${loanAllowed}`);
  }
}
```

In the above example we have two variables 'accountType' and 'userName' at global scope as those are declared at global level.
Then we have 'branch' variable which is declared inside a function 'termsAndConditions' so the scope of branch variable is function scope. Inside this function we have a child function called welcome and again we have a function scopped variable 'bankName' for welcome function. 'minBalance' and 'loanAllowed' are the two variables defined inside the if block. Here main balance is defined with `const` hence it is blocked scope variable while 'loanAllowed' is defined using `var` hence it is the function scopped variable in the function 'termsAndConditions' (i.e. parent function of the block.)

Now to understand which variable is accessable where have a look at below diagram.

![Scope chain (21-Javascript under the hood/images/Scope_chain.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/21-Javascript%20under%20the%20hood/images/Scope_chain.png)

Here we can see that the global scope variable can be accessed from all the other scopes as global scope is the (direct or indirect) parent to other scopes. Hence 'accountType' and 'userName' are the two variables which can be accessed from everywhere in the code and hence they are present in all the scopes.

The variable 'branch' which is defined in the function scope of the function 'termsAndConditions' is accessable from all childrens of the function but not from the global scope because as per lexical scoping child can access parents variable but parent can't access chield's.

Now inside if block we have two variables. One is defined with `const` and another is defined with `var`. If block creates the block scope and as mentioned earlier variables defined with only 'const' and 'let' are blocked scopped hence 'loanAllowed' is not a block scopped variable and hence it goes into it's nearest parent scope which is 'termsAndCondition' function scope. While 'minBalance' remain in the block scope as it is defined with `const`.

Now if block scope and welcome function scope both are at the same level and share same parent which is termsAndCondition scope, but stil 'minBalance' which is present in block scope is not accessable in welcome function scope and same 'bankName' deined in function scope is not accessable in block scope.

From above diagram and explaination we can clearly see that each function or block first find the variable in it's own scope, if it is not present then it look for it in it's parent scope if not there then again grand parent scope and so on. Means it keep going up till the global scope. This thing is called as scope chain. It is not possible in reverse direction i.e. from top to bottom.
