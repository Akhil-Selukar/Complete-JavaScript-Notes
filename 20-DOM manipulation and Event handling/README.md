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

## 20.2 Modal windows

Modal windows are nothing but the popup windows on top of the existing webpage. These windows comes with a close button and it blur out the webpage and focus on the popup window. When we click on cose button or anywhere outside the modal window the window will close. Also on press of 'Esc' key, the window will close.

> The main reason behind this section/project is to understand 'How we can manipulate classes for an html element which results in changing the styles applied to the element.'

**Screenshots**

**Home Screen:**
![Modal window homeScreen(20-DOM manipulation and Event handling/images/20.2_Modal_window_homescreen.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/20-DOM%20manipulation%20and%20Event%20handling/images/20.2_Modal_window_homescreen.png)

**Modal popup**
![Modal window popup(20-DOM manipulation and Event handling/images/20.2_Modal_window_popup.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/20-DOM%20manipulation%20and%20Event%20handling/images/20.2_Modal_window_popup.png)

For this section we have the html code body as below. The most important thing in this code is the class 'hidden' which is given to the modal and overlay div. This class is responsible to hide the model and the overlay (blurness of background) by default.

```html
<body>
  <button class="show-modal">Show modal 1</button>
  <button class="show-modal">Show modal 2</button>
  <button class="show-modal">Show modal 3</button>

  <div class="modal hidden">
    <button class="close-modal">&times;</button>
    <h1>This is a model window</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero minima
      tempora doloremque cupiditate alias quasi, ullam, deleniti modi architecto
      nam, asperiores quaerat quod illo? Magni earum consequatur repudiandae
      eius id! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      Repellat, placeat? Perspiciatis, amet voluptatibus provident perferendis
      iusto dignissimos impedit cupiditate delectus optio recusandae
      exercitationem quia nihil nostrum corporis! Quos, quis provident!
    </p>
  </div>
  <div class="overlay hidden"></div>

  <script src="script.js"></script>
</body>
```

The css for hidden class which is hiding the elements by default is.

```css
.hidden {
  display: none;
}
```

Now to display the modal when any of the button is clicked we will be removind this 'hidden' class from the html elements by using DOM manipulation and hence the css property associated with 'hidden' class will be removed and the respective changes will happen on the screen. Similarly to close the modal we will be addinng the same 'hidden' class again. The javascript code for this entire thing is explained below.

```javascript
'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
const btnShow = document.querySelectorAll('.show-modal');

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnShow.length; i++) {
  btnShow[i].addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
```

The first thing here is we want the `<div>` element for modal and overlay as we have to toggle the 'hidden' class on these two div elements. Hence we have selected those two elements by using querySelector.

```javascript
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
```

Also above changes must happen only when we click on any of the three buttons present and similarly we want to close the overlay whenever we click on the close (X) button on the overlay. So or this purpose we will need close button element and all the three buttons which are present on the screen. Selecting close button is using querySelector is same as we did above but for show modal buttons we have 3 buttons and all these buttons have same classes. So if we use regular querySelector then it will select only first element, hence here we have to use `querySelectorAll()` to select all the elements. This gives us the nodeList on which we can iterate using for loop.

```javascript
const btnClose = document.querySelector('.close-modal');
const btnShow = document.querySelectorAll('.show-modal');
```

Now to manipulate/remove the class of model and overlay div whenever we click on any of the button we have to add an eventListener on show buttons. And we want to add this event listener on all the buttons hence we have written a for loop and by iterating on all the elements we have added the event listener to listen for 'click' event.

```javascript
for (let i = 0; i < btnShow.length; i++) {
  btnShow[i].addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}
```

In above code as soon as the click event occurs, we are accessing the classList of modal and overlay element. (classList gives us the list of classes present for selected element). Now on that classlist we are calling 'remove' mehod and passing the class name of the class which we want to remove from the list or that element. (we can give multiple classes like `.remove('class1', 'class2', 'class3' );)

This code will remove the class 'hidden' from the available classes on modal and overlay div. This will remove the css property `display: none;` and hence the modal will appear on the screen and overlay will also be displayed.

Now as soon ass we click on close button we want to close the model and return back to main page i.e. remove the overlay. This means we again have to set css property `display: none;` on the modal and overlay div. This can be done by using '.add()' method on classList. See the code below.

```javascript
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnClose.addEventListener('click', closeModal);
```

Here we have again added a event listener which listens for the click event on the close button. Once we click on the close button the function closeModal will be called. Here we have defined the function outside the eventListener method. Note that we are not calling the function in eventListener i.e. we are not writing closeModal(), instead we are writing only the function name without ().

In closeModal function we are simply adding the 'hidden' class to modal and overlay div by using .add() method.

Now the next requirement is we also want to close the modal as soon as we click somewhere outside the modal box (i.e. on the overlay). Hence same eventListener as above, we have applied on the overlay element as well. So as soon as we click anywhere outside the modal window i.e. on the overlay, the modal 'hidden' class will be added to the modal and overlay elements and the modal will be closed and overlay will be removed.

```javascript
overlay.addEventListener('click', closeModal);
```

Here again we are using the same 'closeModal' function.

Now the next important scenario we want to cover here is, we want to close the modal when 'Esc' key is pressed. Here we will see a new type of event i.e. 'keyDown'. This event will not occur on any specific element, such events are called as 'Global Events' and this events happen on document level. Have a look at below code example.

```javascript
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
```

Here we are adding the eventListener on document as we want to check for global event. The event type here is 'keydown' which means when we press and release the button on keyboard. There are many such global events like keypress, keyup, mousedown,mousepress, etc..

By using 'keydown' event we can record that the key is pressed on a keyboard, but here we want to specifically check for escape i.e. 'Esc' key. To achieve this we have to pass the event in the event listener. and by using this event object we can access many properties of the event.

We are checkiing which key is pressed by using `event.key === 'Escape'`. Also we want to add the 'hidden' class in the classList ofmodel and overlay elements if the class is not already present hence we are checking `!modal.classList.contains('hidden')`. When both the conditions are true then we are again calling closeModal function to add the class 'hidden' to modal and overlay elements and hide the modal and overlay from screen.

The complete javascript code is present in script.js in '20.2-Modal window' foldar.

## 20.3 Dice cricket

**Context -** This section is a kind of recap of all the thingss that we have learned till now. Here we are building a game called 'Dice cricket' and we will be using various DOM manipulation and other javascript concepts.

**The Game -** The game and it's rules are described below.

- This is a multiplayer game, two players will be playing the game.(On same system/browser.)
- Initially the total score for both the players will be zero.
- The game will tart from player 1, and player 1 will have to roll the dice.
- Dice roll will generate a random number between 1 to 6.
- If the dice gives any number except '1', then that number will be added to the 'current' score.
- If the dice gives '1' then the player 1 is 'Out' and the current score for that player will become 0 and then player 2 can start.
- To lock the score before getting 'Out' that player has to click on 'Add to total' button. That measn the player is satisfied with his current score and want to add that score to 'total score'.
- If a player add his/her 'Current' score to 'Total score' his turn will be over and other player can play his/her turn now.
- If any player does not add his/her currrent score to total score by clicking on 'Add to total' and got 'Out' by getting '1' on dice. His current score will be lost.
- The player scoring '100' as 'Total score' first will win the game.

**The UI snippit for the game -**
<br>Start game UI:
![Dice cricket game UI (20-DOM manipulation and Event handling/images/dice_cricket_UI.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/20-DOM%20manipulation%20and%20Event%20handling/images/dice_cricket_UI.png)

Game UI for win condition:
![Dice cricket game UI win condition (20-DOM manipulation and Event handling/images/dice_cricket_UI_win_condition.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/20-DOM%20manipulation%20and%20Event%20handling/images/dice_cricket_UI_win_condition.png)

**Code and concepts -**

The html code body for this game is as follows. (It is assumed that you have a basic understanding of html and css and can understand the code written below and css styles.)

```html
<body>
  <main>
    <section class="player player--0 player--active">
      <h2 class="name" id="name--0">Player 1</h2>
      <h2 class="total-score">Total score</h2>
      <p class="score" id="score--0">0</p>
      <div class="current">
        <p class="current-label">Current</p>
        <p class="current-score" id="current--0">0</p>
      </div>
    </section>
    <section class="player player--1">
      <h2 class="name" id="name--1">Player 2</h2>
      <h2 class="total-score">Total score</h2>
      <p class="score" id="score--1">0</p>
      <div class="current">
        <p class="current-label">Current</p>
        <p class="current-score" id="current--1">0</p>
      </div>
    </section>

    <img src="images\dice-5.png" alt="Playing dice" class="dice" />
    <button class="btn btn--new">🔄 New game</button>
    <button class="btn btn--roll">🎲 Roll dice</button>
    <button class="btn btn--hold">📥 Add to total</button>
  </main>
  <script src="script.js"></script>
</body>
```

Here we have two sections for two players and each player has player name, total score lable, total score value, current score lable and current score value. Apart from players section we have one image tag to display dice image and three buttons for 'new game', 'roll dice' and 'add to total' respectivelly.
All the tags have specific class and id assigned to it so that we can use it in css and javascript.

The javascript code and its explaination is given below.

The first part is we have selected all the elements which are required in the above game. have a look at below element selection part in javascript code.

```javascript
const scoreElement_0 = document.querySelector('#score--0');
const scoreElement_1 = document.getElementById('score--1');
const currScoreElement_0 = document.getElementById('current--0');
const currScoreElement_1 = document.getElementById('current--1');
const playerElement_0 = document.querySelector('.player--0');
const playerElement_1 = document.querySelector('.player--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
```

Here we are using two different syntax in first two lines.
In first line we are we are using '#score--0' inside the querySelector whereas we were using '.className' till now this is because here we are using id instead of classname and the selector for id is #, hence we are using '#Id'. The second way to select element based on Id is by using `getElementById()` method instead of querySelector. In this method we just have to pass the Id name without any selector hence we are passing only 'score--1', 'current--0' and 'current--1' in second, third and fourth line respectively.

Now the second thing we have to do is, set the initial conditions i.e. set all scores to 0, if there is any winner then remove that winner, remove the dice image and set player 1 (player 0) in javascript code as active player. Apart from setting all the scores to zero, we are setting 'gameOn' to `true`, this is because we are checking this value before we allow player to roll the dice and as soon as someone wins the game we set the 'gameOn' to `false` which will restrict any dice roll further unless we reset the game. All this operations are being done at the `init` function below.

```javascript
const init = function () {
  totalScore = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameOn = true;

  scoreElement_0.textContent = 0;
  scoreElement_1.textContent = 0;
  currScoreElement_0.textContent = 0;
  currScoreElement_1.textContent = 0;
  diceElement.classList.add('hidden');
  playerElement_0.classList.add('player--active');
  playerElement_1.classList.remove('player--active');
  playerElement_0.classList.remove('player--winner');
  playerElement_1.classList.remove('player--winner');
};
```

Now consider below code where we have set the initial conditions of the game on first tile load of game and then we have a eventListener which listens for 'click' event on the 'btnRoll'.

```javascript
init();

btnRoll.addEventListener('click', function () {
  if (gameOn) {
    // Generate randome number between 1 to 6
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Show dice for generate number
    diceElement.classList.remove('hidden');
    diceElement.src = `images\\dice-${diceNumber}.png`;

    // Check for roll 1 ? Next player : add to score
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
```

The `init();` function call sets the initial game conditions at the first time load of the game. Then we have an event listener on button to roll the dice. As soon as the button is clicked, we are generating a randome number between 1 to 6 and storing the number in a local variable 'diceNumber'. Now based on the number generated we want to load the dice image. So the first thing we will have to do is remove the 'hidden' class from the image element. This is being done at line `diceElement.classList.remove('hidden');`. Now the image is loaded but we want to make sure that the image corresponding to the generated number must be diaplayed hence we are generating the source of the image based on the diceNumber at the line `` diceElement.src = `images\\dice-${diceNumber}.png`; `` Here we are updating the 'src' attribute if `<image>` element and we are generating and setting the 'src' value based on the rollNumber hence the number which was generated randomly only image corresponding to that number will be set as 'src' and displayed on the screen.

Now our condition is if the dice roll is not 1 then we want to add the score to current score and keep on playing. Hence we have the if block where we are checking the score is not equal to 1 and then we are adding the diceNumber to the currentScore and displaying the currentScore to the screen. Here the important point to note is we are creating the idName dynamically in the `getElementById()` method by using `activePlayer` variable. `` document.getElementById(`current--${activePlayer}`) ``

If the diceNumber is 1 then we want to switch the player and set the current score of previous player to '0'. For this we are calling the `switchPlayer` function. The main responsibility of switchPlayer function is to change the activePlayer variable, highlight the active player and set the currentScore of the previous player to '0'. Have a look at below code for switchPlayer() function.

```javascript
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  if (activePlayer === 0) {
    playerElement_1.classList.toggle('player--active');
    playerElement_0.classList.toggle('player--active');
  } else {
    playerElement_1.classList.toggle('player--active');
    playerElement_0.classList.toggle('player--active');
  }
};
```

In above code we are setting the current score of previous player to 0 by using line `` document.getElementById(`current--${activePlayer}`).textContent = 0; ``. Then we are setting the currentScore variable to 0 so that we can calculate the current score for new player from start. Then we are modifying the value of currentPlayer variable based on what value it was having `activePlayer = activePlayer === 0 ? 1 : 0;` means if active player was 0 then new active player will be 1 and if it was 1 then new will be 0. Now based on new activePlayer variable value we are toggling the 'player-active' class of two players in a way that the player which is active for that player only we will have this class and for other player we will not have the 'player--active' class. Hence only the active player will be highlighted.
