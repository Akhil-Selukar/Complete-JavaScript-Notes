## 20 DOM Manipulation and Event Handlers

> _NOTE - The index.html and style.css files of this section do have some code and it is assumed that you have some prior knowledge about html and css and able to understand the code. If not then it is highly recomended to spend around 1-2hrs on very basics of html tags, css properties and how we select html elements in css file using class and id._
>
> _There is an additional file in this section '.prettierrc' This file is totally optional. This file is just the settings file for prettier extension in VS code editor. If you want you can add other settings (refer [Prettier options](https://prettier.io/docs/en/options)) or you can removethe file completly._

**Context -** In this section we are going to create a small game 'Guess The Number' and understand different event handlers and DOM manipulation.

**The Game -** The game is very simple.

- A randome number between 1 to 20 will be selected by the game and you have to guess that number.
- You can enter your guess in the input box provided.
- Based on your guess and actual number you will be shown a message giving you a hint that is your number smaller that the actual number or greater than the actual number.
- You will have 20 chances to guess the correct number.
- Your initial score will be 20 and for every wrong guess your score eill be reduced by 1.
- The score at the time of correct guess will be considered as your final score.
