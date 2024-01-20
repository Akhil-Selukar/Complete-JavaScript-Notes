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
