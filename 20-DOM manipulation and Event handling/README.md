## 20 DOM Manipulation and Event Handlers

> _NOTE - The index.html and style.css files of this section do have some code and it is assumed that you have some prior knowledge about html and css and able to understand the code. If not then it is highly recomended to spend around 1-2hrs on very basics of html tags, css properties and how we select html elements in css file using class and id._
>
> _There is an additional file in this section '.prettierrc' This file is totally optional. This file is just the settings file for prettier extension in VS code editor. If you want you can add other settings (refer [Prettier options](https://prettier.io/docs/en/options)) or you can removethe file completly._
>
> This section is divided into three parts
>
> - 20.1 Guess the number game
> - 20.2 Modal window
> - 20.3 Dice cricket

<br>
Before jumping onto any of the above section let's first understand what DOM actually is.

**DOM -** DOM (Document Object Model) is a structured representation of HTML document. It allows javascript to access the html elements and it's styles to manipulate it in the runtime. By using DOM manipulation we can change text of html attributes or change the styles of an html elements based on some condition or an event.

DOM is automatically created by the browser as soon as we load the html page in browser and it is stored as s tree structure where each html element is one object (node in the tree).

To understand this better let's consider a very simple html page below and the DOM tree for the code.

```html
<html lang="en">
  <head>
    <title>Understanding DOM</title>
  </head>
  <body>
    <section>
      <h1>This is h1 heading</h1>
      <p>This is the <a>link to github</a></p>
    </section>
    <section><img src="tree.png" / ></section>
  </body>
</html>
```

In the above html code we have 'Understanding DOM' as the title in head. And in body we have two sections. In first section we have one h1 heading with text 'This is h1 heading' and one paragraph which has a link inside it. In second section we just have one image.

Now the DOM tree for above code will be like below.<br>
![DOM Tree image (20-DOM manipulation and Event handling/images/DOM Tree.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/20-DOM%20manipulation%20and%20Event%20handling/images/DOM%20Tree.png)

In this DOM Tree we can see that for each element in html we have one node in the tree and at the top we have a 'document' node. Every DOM tree starts with a document object. Javascript has access to this document and by using querySelector method available on document object, we can access each and every individual node in the DOM tree using javascript ("`document.querySelector()`").

Now the above html code (or any html code in general) has `<html>` as a root element hence we have a html node at the top under document object. Then inside the `<html>` element we have two elements in above code those are `<head>` and `<body>` so in DOM tree we have two childs elements 'head' and 'body' for html node. Then inside head we have `<title>` in our code, so in DOM tree we have another child element node 'title' to the head node.
Similarly inside body we have two sections in the code hence in DOM tree we have two section elements node and so on. Along with element nodes DOM tree also contain nodes for test inside the element as chield node for that element. It also contains nodes for comments in html code. So baiscally whatever is there in html document it has to be present in the DOM tree.

### querySelector()

querySelector() is a method available on document object. This method is used to select specific element from the document object or DOM tree. Consider below example of html code.

```html
<html lang="en">
  <head>
    <title>Understanding DOM</title>
  </head>
  <body>
    <section>
      <h1 class="heading">This is h1 heading.</h1>
      <p id="paragraph">This is the paragrapg.</p>
    </section>
    <script src="script.js"></script>
  </body>
</html>
```

And javascript (script.js) file contains below querySelector.

```javascript
'use strict';

console.log(document.querySelector('.heading').textContent);
console.log(document.querySelector('#paragraph').textContent);
```

The ooutput of above query selectors are.

```
This is h1 heading.
This is the paragrapg.
```

Here the first query selector is selecting element based on class name hence we have used . i.e. dot followed by class name to specify the element while the second query selector is using id for seleting the element hence we have used # followed by id to specift the element in query selector. The .textContent is used to get the text inside the selected element. (In casse of inout type of element if we want to read the value then we can use .value instead of .textCOntent). We can also assign new value like `document.querySelector('.heading').textContent = "Updated heading."` this will change the heading from 'This is h1 heading.' to 'Updated heading.'

### Event listener

An event is something which is performed on the html page like a click, mouse movement, key press, etc. If we want to execute specific javascript code on occurance of such events then we use event listeners in javascript. Eventlisteners are implemented in javascript as below.

Consider the html code.

```html
<html lang="en">
  <head>
    <title>Guess The Number!</title>
  </head>
  <body>
    <button class="btn check">Check!</button>
    <button class="btn again">Again!</button>
    <script src="script.js"></script>
  </body>
</html>
```

The javascript code (script.js) is as below.

```javascript
'use strict';

document.querySelector('.check').addEventListener('click', function () {
  console.log("The 'Check' button is clicked.");
});
```

Here we are selecting the 'Check' button using query selector and passing the unique class present in the check button i.e. 'check'. Then on selected element we are calling 'addEventListener()' method. AddEventListener() is a special type of method which waits for the specified event to occure on the selected element. This method accepts two parameters the first one is the event type. In above example we have specied the event type as 'click' because we want to check for the click on the selected button. The second argument is a function which exacty defines what we want to perform if the event occurs. In above eample we have written a console.log() in the function so as soon as we click on the 'Check' button the message "The 'Check' button is clicked." will get printed on console.

## 20.1 Guess The Number Game

**Context -** In this section we are going to create a small game 'Guess The Number' and understand different event handlers and DOM manipulation.

**The Game -** The game is very simple.

- A randome number between 1 to 20 will be selected by the game and you have to guess that number.
- You can enter your guess in the input box provided.
- Based on your guess and actual number you will be shown a message giving you a hint that is your number smaller that the actual number or greater than the actual number.
- You will have 20 chances to guess the correct number.
- Your initial score will be 20 and for every wrong guess your score eill be reduced by 1.
- The score at the time of correct guess will be considered as your final score.

**The UI snippit for the game -**
![Guess the number game UI (20-DOM manipulation and Event handling/images/guess_the_number_UI.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/20-DOM%20manipulation%20and%20Event%20handling/images/guess_the_number_UI.png)

**Code and concepts -**

Now here our first task is to generate a randome number between 1 to 20. This is exactly what is being done by below statement.

```javascript
let hiddenNumber = Math.trunc(Math.random() * 20) + 1;
```

Here `Math.random()` generates a random decimal number between 0 to 1 (excluding 0 and 1). Now we want the number between 1 and 20 so have myltiplied it by 20, because any decimal number between 0 and 1 when multiplied by some number will generate a decimal number between 0 and that number. As we are multiplying decimal number with 20, the result will be a decimal number but we want to whole number. So to eliminate the numbers after decimal point we are using `Math.trunc()` this function truncate the decimal number to the whole number. Now unless the number generated by 'Math.random()' is 1.0 we cant get 20. because if we multiple any number less than 1 with 20 will not give 20. and after truncating the decimal the maximum number we can get is 19 and the minimum number we can get is 0. hence to make it between 1 to 20 we are adding 1 to the truncated number. This final number is then assigned to a variable 'hiddenNumber'.

Now the second task is, we have to check the guess entered by user against the random hidden number generated. And to check the entered guess we have a 'Check!' button, so we have to add a event listener which will compare the entered number against the hidden number as soon as the check button is clicked. This is exactly what is achieved by below piece of code.

```javascript
document.querySelector('.check').addEventListener('click', function () {
  let guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    console.log('No number is entered.');
    document.querySelector('.message').textContent =
      '⚠️ Please enter a number.';
  } else if (guess === hiddenNumber) {
    document.querySelector('.message').textContent = '🥳 Correct guess..!!';
    document.querySelector('.number').textContent = hiddenNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > hiddenNumber
          ? '⬆️ Guess is too high..!!'
          : '⬇️ Guess is too low..!!';
      document.querySelector('.score').textContent = --score;
    } else {
      document.querySelector('.message').textContent =
        '😟 You lost the game..!!';
      document.querySelector('.score').textContent = 0;
    }
  }
});
```

In this code the first thing that we did is we have selected the 'Check!' button element from the DOM by using class name `document.querySelector('.check')` and then an event listener is added on the selected element to listen the 'click' event.

Now the first thing which we need to do as soon as the click event occurs is we need to get the guess entered by the user so we read the value entered by the user in input field by using DOM as `Number(document.querySelector('.guess').value);` and this value is then stored in a variable named 'guess'. Now here with the guess there can be three possibilities.

- User press check without entering the guess
- User guess the exact hidden number.
- User guess the wrong number.

Now to handle the first cenario where user clicks the 'Check!' button without entering any inout we have written below piece of code.

```javascript
if (!guess) {
  console.log('No number is entered.');
  document.querySelector('.message').textContent = '⚠️ Please enter a number.';
}
```

HHere if user press 'Check!' button without passing any value then guess will be by default 0 which is a falsy value hence we are checking '!guess' which will give `true` if nothing is entered by user. In such event we are logging the message 'No number is entered.' in the console and we are changing the message on UI screen with the message '⚠️ Please enter a number.'. To do this we are selecting the message element and assigning the new message value to the element. `document.querySelector('.message').textContent = '⚠️ Please enter a number.';`

Now to handle the second case when entered guess is correct, we have below code.

```javascript
if (guess === hiddenNumber) {
  document.querySelector('.message').textContent = '🥳 Correct guess..!!';
  document.querySelector('.number').textContent = hiddenNumber;
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';

  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
}
```

Here if the guess is exactly equal to the hidden number in that case we are updating the message on UI by using the query selector `document.querySelector('.message').textContent = '🥳 Correct guess..!!';`. The next thing we want to do is to reveal the ssecret number and increaseits size, update the color of screen to green. The line `document.querySelector('.number').textContent = hiddenNumber;` is updating the text inside the box to the hidden number.

Now background color and size of the hidden number box are defined by the css properties and to change the background color and other things what we can do is, as by using DOM tree we can select all the html element present in the html page and access all their properties. So we can add/remove the inline CSS to the elements like `<h1 style="font-size: 4rem">Heading font</h1>`. Inline style always takes over the style declared in css file. Hence DOM maipulation can also be used for css style manipulation.

> _Note -_ In css file if the property name is having more than one word then we use - to separate the words, but in javascript we have to use camelcase i.e. 'background-color' in css will become 'backgroundColor' in javascript. Also in javascript we have to pass every property value as a String with its unit so 'font-size: 4;' in css will become "fontSize = '4rem';" in javascript.

Hence to update the background color to green we are adding inline css to the body element `document.querySelector('body').style.backgroundColor = '#60b347';` and similar to increase the size of the hidden number box. `document.querySelector('.number').style.width = '30rem';`

Now along with this updates we have to keep track of the highscore. Hence we have delareda global variable 'highscore' and its initial value is set to '0'. Now as soon ass the user enter the correct guess we are calculating the highest score by using logic below.

```javascript
if (score > highscore) {
  highscore = score;
  document.querySelector('.highscore').textContent = highscore;
}
```

In this logic we are just checking the current score is greater than the previous highest score. If it is then we are updating the highest score variable with the currrent score and then displaying the same on UI by using `document.querySelector('.highscore').textContent = highscore;`.

Now the third scenario where user's guess is wrong, there can be two cases.

- User's guess can be smaller than the actual number.
- User's guess can be higher than the actual number.

So to handle this situation we have below code.

```javascript
else {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > hiddenNumber
          ? '⬆️ Guess is too high..!!'
          : '⬇️ Guess is too low..!!';
      document.querySelector('.score').textContent = --score;
    } else {
      document.querySelector('.message').textContent =
        '😟 You lost the game..!!';
      document.querySelector('.score').textContent = 0;
    }
  }
```

This else block will be executed if the guess entered by user is not equal to the actual number. In this case as well we have to update the messahe on the UI based on another condition i.e. is the guess smaller than the actual number or greater? Hence to update this message we have used a ternary operatpr `guess > hiddenNumber ? '⬆️ Guess is too high..!!' : '⬇️ Guess is too low..!!';` and based on the condition whatever message is returned we are updating the message on UI by using the line `document.querySelector('.message').textContent`. And for every wrong guess we have to reduce the score by 1. hence we have the line `document.querySelector('.score').textContent = --score;`. The score was set initially to 20 while defining the variable score. Now if the score reaches to 0 then user has lost the game so to implement this we have implemented the `if(score > 1)` logic. If it is greater than 1 then only perform all the above operation. If it is 1 then that means the current iteration is the last iteration and in that iteration as well the guess i incorrect and hence we have to show '😟 You lost the game..!!' message with score '0' this is performed in below portion of code.

```javascript
else {
      document.querySelector('.message').textContent =
        '😟 You lost the game..!!';
      document.querySelector('.score').textContent = 0;
    }
```

Now the game logic is complete here, the only part left is the 'Again' button to start the game again. The logic for the again button is also simple. as soon as the 'Again' button is clicked we have to reset generate new random hidden number, reset the background color, score as 20, hidden number to '?' and we have to clear the input field. To implement this we have added a event listener for the 'Again' button which listen to the 'click' event and do all the operations mentioned.
Below is the code for this functionality.

```javascript
document.querySelector('.again').addEventListener('click', function () {
  hiddenNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
});
```

here we have added an event listener for the 'Again' button and resetting the complete page except the highscore, as we want to track the highscore for all the games.

> _Note -_ In this code we have repeated same code again and again many times, and that can be optimised. But the above code is to understand the concepts and DOM manipulation.
