## 44.5 Event capturing and bubbling

Every javascript event which is performed on any element does not happen directly at that element. If happens at the root of the document and then that event is travel to the actual element on which that event happened, at the target element that event is handled and then that event travel back to the root. During this process the event passes through the three phases, the capturing phase, the target phase and the bubbling phase. To understand this have a look at below html code and its DOM structure.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Title of the webpage</title>
  </head>
  <body>
    <section>
      <p>This is a title with <a>link</a></p>
    </section>
    <script src="script.js"></script>
  </body>
</html>
```

The DOM structure for the anchor element `<a>` here will be as below.

![DOM_Structure (44-Advanced DOM/44.5-Event propagation/img/DOM_Structure.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/44-Advanced%20DOM/44.5-Event%20propagation/img/DOM_Structure.png)

From above image we can clearly see that the `<a>` element in above code has 5 levels above it. Now consider we have added an event handler on `<a>` element in above code which is listening for a click event. So as soon as the click event occur the event is first captured at the root node (i.e. document level) then that event is prropagated to the target node which is `<a>` element node. This propagation is call as the 'Capturing phase', here we are event is being captured. (Have a look at below image for understanding)

![Capturing_pnase (44-Advanced DOM/44.5-Event propagation/img/Capturing_phase.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/44-Advanced%20DOM/44.5-Event%20propagation/img/Capturing_phase.png)

Now once the event reaches to the target element, there that event got handled and by the eventListener. This phase is called as Target phase.

![Target_phase (44-Advanced DOM/44.5-Event propagation/img/Target_phase.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/44-Advanced%20DOM/44.5-Event%20propagation/img/Target_phase.png)

After target phase the event is transfered back to the root node and travel through all the parents of target node. This is called the bubbling phase.

![Bubbling_phase (44-Advanced DOM/44.5-Event propagation/img/Bubbling_phase.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/44-Advanced%20DOM/44.5-Event%20propagation/img/Bubbling_phase.png)

Now in our code if we see the navigation bar code mentioned below.

```html
<nav class="nav">
  <img src="img/logo.png" alt="Bankist logo" class="nav__logo" id="logo" />
  <ul class="nav__links">
    <li class="nav__item">
      <a class="nav__link" href="#section--1">Features</a>
    </li>
    <li class="nav__item">
      <a class="nav__link" href="#section--2">Operations</a>
    </li>
    <li class="nav__item">
      <a class="nav__link" href="#section--3">Testimonials</a>
    </li>
    <li class="nav__item">
      <a class="nav__link nav__link--btn btn--show-modal" href="#"
        >Open account</a
      >
    </li>
  </ul>
</nav>
```

Here if we observe the `<a>` element with class `nav__link` then it's parent is `<li>` element with class `nav__item` and its parent is `<ul>` element with class `nav__links` and above that we have `<nav>` element with 'nav' class and so on. So if we apply event listner to `nav__link` then the event will flow through document to body to nav to `nav__links` to `nav__items` to `nav__link`. So we can listen to this event at any of the above places. To prove this lets add an event listener to `nav__link`, `nav__links` and nav and we will observe the event on `nav__link` will invoke all the event listners to it's parent.

```javascript
"use strict";

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(
    0,
    255
  )})`;

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
});
```

Now here if you click on the `nav__link` element then you will see that even though we have performed the event on specific element still all the three event handlers are invoked and color of all three element got changed. But if you click on `nav__links` element then only `nav__links` and nav will change the color and not `nav__link`. This is because in case of clicking on `nav__links`, the target phase of the event is before reaching to `nav__link`. Now to prove that the same event is propagated through all the event handlers we can print the target on which the event occured like below.

```javascript
"use strict";

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(
    0,
    255
  )})`;

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target);
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log(e.target);
});
```

Now above code will print the event insied each handler and if you observe the output you will see below result.

```
<a class="nav__link" href="#section--1">Features</a>
<a class="nav__link" href="#section--1">Features</a>
<a class="nav__link" href="#section--1">Features</a>
```

From this we can conclude thet all the three event handlers are invoked by same event which was clicking on 'nav\_\_link' evement of Features button.

Now let's check in which order the event handler got triggered. Have a look at below code.

```javascript
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(
    0,
    255
  )})`;

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Link");
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Links_Section");
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Nav");
});
```

Now here the output will be

```
Link
Links_Section
Nav
```

Which means first the innermost element's event listner got executed then its parent and then the topmost parent. Which means the event listners are triggered in bubbling phase. So let's say we dont want the event to propagate to the Nav section and we want to stop the propagation after nav\_\_links. This can also be done by usng .stopPropagation(); method on the event.

```javascript
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(
    0,
    255
  )})`;

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Link");
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Links_Section");
  e.stopPropagation();
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Nav");
});
```

Now in above case inside the event handler of nav\_\_links
we have added a line `e.stopPropagation()` this will stop propagation of event and hence the event listner for nav didn't triggered.

As we have already saw above that the event listners work duting the bubbling phase, but we can make them work during capturing phase as well by simply adding another argument to event listner like below.

```javascript
"use strict";

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomNumber(0, 255)},${randomNumber(0, 255)},${randomNumber(
    0,
    255
  )})`;

document.querySelector(".nav__link").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("Link");
  },
  true
);

document.querySelector(".nav__links").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("Links_Section");
  },
  true
);

document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("Nav");
  },
  true
);
```

In above code we have set the third parameter i.e. useCapture of eventListner to true which listen the event in capturing phase and not in bubbling phase. In this case the outpu will be.

```
Nav
Links__Section
```

Here we can see that the 'nav' element's eventListner got executed first which means events are now being handled in capture phase. This is useful in 'Event deligation' in javascript.
