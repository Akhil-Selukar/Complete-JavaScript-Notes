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

## 20.1 Guess The Number Game

**Context -** In this section we are going to create a small game 'Guess The Number' and understand different event handlers and DOM manipulation.

**The Game -** The game is very simple.

- A randome number between 1 to 20 will be selected by the game and you have to guess that number.
- You can enter your guess in the input box provided.
- Based on your guess and actual number you will be shown a message giving you a hint that is your number smaller that the actual number or greater than the actual number.
- You will have 20 chances to guess the correct number.
- Your initial score will be 20 and for every wrong guess your score eill be reduced by 1.
- The score at the time of correct guess will be considered as your final score.
