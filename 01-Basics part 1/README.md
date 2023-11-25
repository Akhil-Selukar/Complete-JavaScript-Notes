## 01-Basics of javascript part - 1

In this code example we are focusing on how to link the javascript file in HTML file and a very basic javascript code to display 'Hello World..!!' in the browser window as a popup and a way to log some message in the browser console.

In this example the `index.html` file is a simple HTML file which will print the text 'JavaScript Basics – Part 1' on browser window. In this HTML file we have added a css file to apply basic background and basic styling and formating. Below line links the `style.css` file to HTML file.

```html
<link rel="stylesheet" href="style.css" />
```

Now, we have our javaScript code in `script.js` file and that file is linked to the `index.html` by below line of code.

```html
<script type="text/javascript" src="script.js"></script>
```

<hr>

### Dive into the javascript code.

Here we just have two lines of code.

```javascript
alert("Hello World..!!");
console.log(10 + 15 - 6);
```

The first line `alert("Hello World..!!);` will display the popup message "Hello World..!!" when we load index.html file in the browser. Here `alert()` is a javascript function which accepts a String (Can accepr other things like variables.) and display that String as a popup message.
Now the second line in the code is `console.log(10 + 15 - 6);` Here the console.log() is the way to tell javascript that the value inside log() function must be logged to the browser console. Here we have passed an expression i.e. 10+15-6, which javascript will evaluate and will log the result in browser console. (We can pass any message/String as well in the console.log());

<em>Note</em> : to see the console logs in browser, write click anywhere in the browser window and click on 'inspect'. Then 1 window will appear click on console in that window.
