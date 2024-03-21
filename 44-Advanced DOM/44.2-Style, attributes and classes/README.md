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

By using the `document.documentElement` we can also change the CSS variables also called as CSS custom properties. which are defined under the :root{} part of the CSS file.

have a look at below css code snippet.

```css
:root {
  --color-primary: #5ec576;
}

.btn {
  background-color: var(--color-primary);
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 500;
  border: none;
  padding: 0.7rem 3.5rem;
  border-radius: 10rem;
  cursor: pointer;
  margin-right: 2.5rem;
}
```

Here at the root level we have declared a CSS variable named '--color-primary' which is then used as background color for btn element. Now this variables are used to make CSS file easy to maintain because if in case we want to make change to our primary color then we will not have to go and change each and every place where we have used the primary color, instead we can simply go and change the value of the variable and then the same will be reflected to the entire CSS file. This value can also be manipulated using DOM elements as we know that by using `document.documentElement` we can get access to the root node in DOM i.e. the entire document then we can alter the styles at that root level which will be the CSS variables. This is mostly used in the light and dark mode functionalities in many webpages. Have a look at below code which will change the value of --color-primary variable from green to yellow.

```javascript
document.documentElement.style.setProperty("--color-primary", "#e6bf22");
```

once above code is executed the value of --color-primary will be set to '#e6bf22'. Here as well the important thing to note is that it will not change the CSS file. This will add the inline CSS variable `--color-primary: #e6bf22` to the root level of html page i.e. the `<html>` tag.
