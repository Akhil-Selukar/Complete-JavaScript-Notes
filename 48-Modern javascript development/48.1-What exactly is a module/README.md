## 48.1 What exactly is a module?

A module is basically a reusable piece of code that encapsualte the important details and exposes final APIs to use. Mostly modules can use other modules (dependencies) by using imports and can expose the public APIs by export. Till now what all javascript code that we written was not a big code, but in actual production grade applications this code can be huge and in such cases modules makes it easy to organize and maintain the code.

Below are some general advantages of moduler code.

1. Modules can be used as small code blocks which combines together or work together to create a huge application (So modules are small building blocks of a large application.)
2. Modules can be developed in isolation (i.e. developer need not have to worry about the entire functionality, he/she can just focus on his/her module and develop a rebust and bug free code.)
3. With the help of module we can organize the code base better. We can have code related to specific functionality in a separate module and import that module whenever required.
4. Modules also allow us to reuse the code. For example if we already have code written for input validation in a module, then we can simply import that module and reuse the same code where ever input validation is required.

Since ES6 we can store javascript modules in files. One file exactly contains one module in ES6. Now script are also stored in file only then what is the difference between normal script and javascript module.

1. Top-level variables - in ES6 modules all top level variables are module scoped means they are private to the module and can be accessed within the mmodule itself, while in case of normal script files all top level variables are global scoped variables and can be accessed throghout the script/code.
2. Mode of execution - ES6 modules are always executed in strict mode by default and we dont have to specify the mode every time, while in case of normal script files the default mode of execution is sloppy mode and we have to explicitly specify each time if we want to run the code in strict mode.
3. 'this' keyword - in ES6 modules the top level this keyword is always undefined while in normal script files top level this keyword is assigned with window object.
4. Importing and exporting values - In ES6 modules we can import and export values using import and export statements while in normal script files importing and exporting values outside the script is not at all possible.
5. File downloading - In ES6 modules, module files are always downloaded in asynchronous way while in normal script by default the file is downloaded in synchronous way unless we explicitly specify async or defer mode.
