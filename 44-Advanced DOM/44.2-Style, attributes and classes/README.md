## 44.2 Styles attributes and classes

By using DOM we can apply styles to specific elements as well. Note that the styles applied using DOM are applied as inline SCC and not added in the CSS file. Have a look at below example.

```javascript
"use strict";

const bodyElement = document.body;
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");

cookieMsg.innerHTML =
  "We use cookie for better and faster performance and analytics purpose <button class='btn cookie-close-btn'>got it!</button>";

bodyElement.after(cookieMsg);

cookieMsg.style.color = "#000000";
cookieMsg.style.backgroundColor = "#bbb";
```

In above example we have added a new element to the DOM which will be available in HTML page as well. Now at last two lines we have added the css styles of color to black i.e. #000000 and backgroundColor as #bbb. Here this styles will be added as inline CSS and hence will be available in DOM, so along with adding the styles we can read the styles using same syntax (But only inline CSS), have a look at below code.

```javascript
"use strict";

const bodyElement = document.body;
const cookieMsg = document.createElement("div");
cookieMsg.classList.add("cookie-message");

cookieMsg.innerHTML =
  "We use cookie for better and faster performance and analytics purpose <button class='btn cookie-close-btn'>got it!</button>";

bodyElement.after(cookieMsg);

cookieMsg.style.color = "#000000";
cookieMsg.style.backgroundColor = "#bbb";

console.log(cookieMsg.style.backgroundColor);
console.log(cookieMsg.style.width);

console.log(getComputedStyle(cookieMsg).width);
```

Here at line `console.log(cookieMsg.style.backgroundColor);` we are reading the inline css property hence in output we will get the value for backgroundColor but at next line where we are reading the value of width, this property is not in inline CSS hence it will not give any value. To read CSS properties which are present in CSS file we can use another method called getComputedStyle() and pass the element of which styles we want to read, and then we will get the value of that property. The output of above will be

```
rgb(187, 187, 187)

1087.2px
```
