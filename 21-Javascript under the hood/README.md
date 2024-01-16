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
