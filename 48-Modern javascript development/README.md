## 48.00 Modern javascript development

Till now we were writing the complete javascript code in a single file. If you imagine this scenario in real life application then writing all the javascript code in a single huge file might not be the good option. It makes the code hard to understand and might add many bugs as well. So in modern world we write the javascript code in modules. But this modules, by using this approach we can use some third party modules as well in our javascript code.

Now if we try to deploy this modular javascript code in production/server then it might not be the good idea totransfer multiple files to the server and maintain them all. So what we do is we develop the code in modular fashion the we use javascript build tools like webpack or parcel (generally this tools are called javascript bundlers). These tools perform the building process for us where it combine all the modules into one file, remove the un-necessary code and compress the file and then it does the process of transpiling or polyfilling which is converting the new modern javascript to old ES5 syntex so that the code is compitable with old browsers as well, this is usually done by a tool called babel. Now this build javascript code is then sent to server and deployed to production.

Below is the overview of the process.

![Modern js development process (48-Modern javascript development/images/Modern JS Build process.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/48-Modern%20javascript%20development/images/Modern%20JS%20Build%20process.png)
