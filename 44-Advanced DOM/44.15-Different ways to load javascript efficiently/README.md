## 44.15 Different ways to load the javascript file efficiently

As of now we added the javascript file in html at the end of body using script tag. This willread the complete html page, then it will read the script, then execute the script and after that trigger the DOMContentLoaded event. So the overall time to trigger DOMContentLoaded event is time taken to load complete html plus time taken to load complete js plus time taken to execute the js.

The second way is we can add the script tag in head of the html. like below

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example</title>
    <link rel="stylesheet" href="style.css" />
    <script type="text/javascript" src="script.js"></script>
  </head>
  <body>
    <h1>Example</h1>
  </body>
</html>
```

So here while reading the html script tag will be encountered in between hence it will stop the reading of html and start reading javascript, then it will execute the javascript and then it will read remaining html and create the DOM. So during the time when js is being read and executed, html parsing will be paused. So this is also not time efficient way to add js in html page.

The another way to add the js in html is 'async' way. Here the script tag will be in header only but we will call js file in async mode. So the fetching of js file will be done in asynch mode and duing that time html parsing will not be paused.
only during the execution of js, html parsing will be paused. So this will save some time while loading the page and triggering DOMContentLoaded event. Below is the example of how we can we can load js in async mode.

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example</title>
    <link rel="stylesheet" href="style.css" />
    <script async type="text/javascript" src="script.js"></script>
  </head>
  <body>
    <h1>Example</h1>
  </body>
</html>
```

Now the third way is to use defer mode while adding the js to html. By using this mode, the fetching of JS will be done in async manner only but it will not right away execute the js, it will wait for the complete html to get parsed and DOM to be available and then it will execute the js and trigger DOMContentLoaded event. Below is how we can use defer mode.

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example</title>
    <link rel="stylesheet" href="style.css" />
    <script defer type="text/javascript" src="script.js"></script>
  </head>
  <body>
    <h1>Example</h1>
  </body>
</html>
```

Have a look at below image for better understanding.

![ways to add js file in html (44-Advanced DOM/44.15-Different ways to load javascript efficiently/img/Ways_to_insert_js_in_html.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/44-Advanced%20DOM/44.15-Different%20ways%20to%20load%20javascript%20efficiently/img/Ways_to_insert_js_in_html.png)

From above image we can clearly see that it is always better to add js file in header with either async or defer mode. And adding js file at the end of body tag with any mode will not make any difference because by the time it will reaches to js file all html will already be parsed hence it will not make any difference.

Now when to use async and when to use defer. If in our code we have any dependency like the complete DOM tree need to be created and some third party js library need to be fetched before executing our JS file then we should always go with defer mode because if fetches the js file asynchronously but wait for complete html to get parsed before executing any js code. Also the most important difference between async and defer is async will not execute js in a specific order, whichever js file is fetched first it will execute it. But defer will execute the js files in the order same as that of insertion of js files in html. So if order matter always use defer mode.
