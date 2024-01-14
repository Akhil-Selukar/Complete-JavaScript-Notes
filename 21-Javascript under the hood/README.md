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

**3. Javascript is a multi-paradigm language** - Paradigm means an approach
