## 47 Asynchronous javascript

The first thing we need to understand before starting with asynchronous javascript is the difference between synchronous and asynchronous javascript and what we are trying to achieve with asynchronous javascript.

Most of the javascript code which we were writing till now was synchronous javascrpit code. Which means the code executes line by line and each line wait for the previous line's execution to complete. For example if we have a code of 10 lines then unless and until 1st line is completly executed, 2nd line will not start it's execution. Now the problem with this is if we have a time consuming task in between our code like loading an image or fetching hige data from some third party API, then in such case with synchronous javascript unless the imahe is completly loaded the program will not move further which will result in delay for the webpage to appear.

On the other hand asynchronous javascript works in diferent way, put's the log running task in background and proceed with the execution of other lines of code and once the background task is completed it intimate the main flow of code by either a event or timeout, etc so that if required code can perform further operations on task completed in background.

This asynchronous calls are mostly used to do AJAX calls from javascript to request data from web servers.
AJAX (Asynchronous Javascript And Xml) calls allow us to communicate with web servers asynchronously to request data from web servers or third party APIs. (Note: ALthough we say AJAX now a days as well, but XML is very rarely used in modern applications. We use JSON in place of XML now.)
