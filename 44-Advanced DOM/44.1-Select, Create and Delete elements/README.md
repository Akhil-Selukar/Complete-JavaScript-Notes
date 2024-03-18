## 44.1 Select, Create and Delete Elements

We have already used querySelector and few other ways to select DOM elements. But here in this section we will see the DOM maniipulation in deep. The topmost element we can select in an html document is the html document itself. We dont have to use any query selector for this. We have special DOM elements for the components which are preset almost in every html page i.e. the whole html document, the header and the body.

To select the complete html document we can use `document.documentElement`. If we see the output of below code then we will get the complete html document starting from line one till the end.

```javascript
"use strict";

console.log(document.documentElement);
```

The output for above code is.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>JavaScript Select, Create and Delete Elements</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1 class="heading heading-1">
      JavaScript Select, Create and Delete Elements
    </h1>
    <h4 class="heading heading-4">
      open the console of your browser and refresh to see the results.
    </h4>
    <p id="paragraph-1">This is first paragraph</p>
    <p>This is second paragraph</p>
    <p>This is third paragraph</p>
    <p>This is fourth paragraph</p>
    <div class="btn_container">
      <button class="btn">button 1</button>
      <button class="btn">button 2</button>
      <button class="btn">button 3</button>
    </div>
    <script type="text/javascript" src="script.js"></script>
  </body>
</html>
```

Apart from `document.documetElement` we have `document.head` for header of the html page and `document.body` for the body of html page. These are special selectors and dont need any selectors for selecting the elements and these selectors are mainly used to apply certain styles or effect on whole page or complete body or header section.

```javascript
console.log(document.head);
console.log(document.body);
```

In the output of above code the first console.log() will print only the header part of html document while the second console.log() will print the complete body.

```
<head>
    <meta charset="UTF-8" />
    <title>JavaScript Select, Create and Delete Elements</title>
    <link rel="stylesheet" href="style.css" />
</head>

<body>
    <h1 class="heading heading-1">
      JavaScript Select, Create and Delete Elements
    </h1>
    <h4 class="heading heading-4">
      open the console of your browser and refresh to see the results.
    </h4>
    <p id="paragraph-1">This is first paragraph</p>
    <p>This is second paragraph</p>
    <p>This is third paragraph</p>
    <p>This is fourth paragraph</p>
    <div class="btn_container">
      <button class="btn">button 1</button>
      <button class="btn">button 2</button>
      <button class="btn">button 3</button>
    </div>
    <script type="text/javascript" src="script.js"></script>
  </body>
```

Now apart from above special elements if we want to select any specific element from html code we can use query selector and query selector all like below.

```javascript
console.log(document.querySelector(".heading-1"));
```

Above code will return the element from html document which is having class 'heading-1'. If there are multiple element with same class then .querySelector() will return the first element only. If we want to select all the elements then we have to use .querySelectorAll().

```javascript
const buttons = document.querySelectorAll(".btn");
console.log(buttons);
```

If we observe the output of above code we will see that the quesySelectorAll() returns a NodeList which contains all the elements having the specified class.

Apart from class name we can use id to select a perticular element from html. As we know that id's are unique in html documeent hence we don't have to use any selector we can directly use .getElementById() method on document object.

```javascript
console.log(document.getElementById("paragraph-1"));
```

The above code will return the paragraph element having id 'paragraph-1'

```
<p id="paragraph-1">This is first paragraph</p>
```

Now just similar to .querySelectorAll() we have another method called .getElementsByTagName() which select all the elements of specified type like all p tags or all h1 tags or all button tags etc. Have a look at below example.

```javascript
const allParagraphs = document.getElementsByTagName("p");
console.log(allParagraphs);
```

Above code will select all the p elements present in the html document. The main differece between querySelectorAll and getElementsByTagName is getElementsByTagName will return
HTMLCollection while querySelectorAll returns the NodeList. The difference between two is HTMLCollection is a live collection which means if the dome changes in runtime then HTMLCollection will also change which is not the case with NodeList. NodeList will change only if the page is refreshed. Because of this difference we sometimes use HTMLCollection when some of our elements appear on top of the eisting page based on specific event and we want to add newly added element also in the selection.
