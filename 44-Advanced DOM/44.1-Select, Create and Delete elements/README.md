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

Now same live HTMLCollection we can obtain by using class name as well, for that we can use method .getElementsByClassName().

```javascript
const allBtn = document.getElementsByClassName("btn");
console.log(allBtn);
```

<hr>

Now apart from selecting elements from DOM we can add/create elements in DOM as well. For that we can use `insertAdjacentHTML()` which we already saw in [38-Banking application](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/38-Banking%20application%20(Array%20practice)>). By using insertAdjacentHTML() we can add a complete html code string into another element. In this section we will see another way where we can create an element itself and place it in the DOM at specific place.

Have a look at below code.

```javascript
const bodyElement = document.body;
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");

// cookieMsg.textContent = "We use cookie for better and faster performance and analytics purpose";

cookieMsg.innerHTML =
  "We use cookie for better and faster performance and analytics purpose <button class='btn'>got it!</button>";

bodyElement.prepend(cookieMsg);
```

In above code at first line we have selected the body element as we want to add the new cookieMsg element in the body element. Then by using `document.createElement("div")` we have created a 'div' element and stored this element in the variable cookieMsg. Now this cookieMsg will work just like any other element selected by using querySelector or any other method. So we have added a class 'cookie-message' to the div element created. Then we can set the text using textContent or innerHTML, as we have an HTML element inside the text of div hence we are using innerHTML here to set the text. Now our element is ready but it is still not part of the html document as we have not added it to the page. To do that we can prepend the newly created element to the selected element (in our case body). Prepend means the element will be added as the first child for body i.e. the first element inside the body. Hence the output of above code will be, the newly created div with all assigned classes and inner html will be added to the html document and we will be able to see the div element with message on screen.

Now if we add the same element at the end of body i.e. as last child for body. We can achieve this by using append() method like below.

```javascript
const bodyElement = document.body;
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");

cookieMsg.innerHTML =
  "We use cookie for better and faster performance and analytics purpose <button class='btn'>got it!</button>";

bodyElement.prepend(cookieMsg);
bodyElement.append(cookieMsg);
```

Now here if we see, the cookieMsg element is added as first as well as the last child, so we might expect the element at both the places. But here we are prepending and appending the same element and same element can't be present at two different places at the same time in DOM. Hence it will only be appended and will be available at the last of body element as last child to body element.

_**Note:** As the same element can't be present in the DOM at two different places at same time hence we can use append and prepent to move elements as well._

Now in case we want to add the element at both the places, in that case we have to clone the element before adding it to another place and that can be done by using 'cloneNode(true)' as below.

```javascript
const bodyElement = document.body;
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");

cookieMsg.innerHTML =
  "We use cookie for better and faster performance and analytics purpose <button class='btn'>got it!</button>";

bodyElement.prepend(cookieMsg);
bodyElement.append(cookieMsg.cloneNode(true));
```

Now in above case before appending the element we are cloning the element and hence the cookieMsg will be appended as well as prepended and will be available at two different places in the webpage.

Apart from prepend and append methods, we have before and after methods as well.

```javascript
const bodyElement = document.body;
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");

cookieMsg.innerHTML =
  "We use cookie for better and faster performance and analytics purpose <button class='btn'>got it!</button>";

bodyElement.before(cookieMsg);
bodyElement.after(cookieMsg.cloneNode(true));
```

Here the cookieMsg will be added before the body element and another clone of cookieMsg will be added after the body element. Prepend and append creates first and last child respectively while before and after add the element adjacent
to the calling element (body in above case).

<hr>

We saw selection of DOM elements then we saw creation and addition of new DOM element. Apart from this we can also remove the DOM elements as well. Have a look at below code.

```javascript
const bodyElement = document.body;
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");

cookieMsg.innerHTML =
  "We use cookie for better and faster performance and analytics purpose <button class='btn cookie-close-btn'>got it!</button>";

bodyElement.prepend(cookieMsg);
bodyElement.append(cookieMsg);

document
  .querySelector(".cookie-close-btn")
  .addEventListener("click", function () {
    cookieMsg.remove();
  });
```

In above example we have selected the button inside the cookieMsg and added an event listener to it which will listen for click event. As soon as the button is clicked we are removing the cookieMsg element from DOM by using .remove() method.

.remove() method is added recently to the javascript. Before .remove() method what we used to do is to select parent element of the element to be removed and then remove the child element. Have a look at below code for better understanding.

```javascript
const bodyElement = document.body;
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");

cookieMsg.innerHTML =
  "We use cookie for better and faster performance and analytics purpose <button class='btn cookie-close-btn'>got it!</button>";

bodyElement.prepend(cookieMsg);
bodyElement.append(cookieMsg);

document
  .querySelector(".cookie-close-btn")
  .addEventListener("click", function () {
    cookieMsg.parentElement.removeChild(cookieMsg);
  });
```

In above example at line `cookieMsg.parentElement.removeChild(cookieMsg);` first we are selecting the parent element of cookieMsg which will be body element then we are removing a child from body element. And by passing the element i.e. cookieMsg we are specifying which exact child to remove.
