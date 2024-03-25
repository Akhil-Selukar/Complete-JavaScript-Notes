## 44.7 DOM Traversing

DOM traversing means moving through the DOM and selecting different elements relative to each other. Many times we need to select elements relatively like the second heading in a section or first list item in an unordered list or direct child of an element or immediate parent of an element. In all such cases we can not directly implement the querySelector and get the element. Or many time an element is added dynamically based on certain conditions. So we can not write query selector beforehand. In all such cases we have need DOM traversing. Have a look at the below html code for nav bar in out main webpage.

```html
<nav class="nav">
  <img src="img/logo.png" alt="Bankist logo" class="nav__logo" id="logo" />
  <ul class="nav__links">
    <li class="nav__item">
      <a class="nav__link" href="#">Features</a>
    </li>
    <li class="nav__item">
      <a class="nav__link" href="#">Operations</a>
    </li>
    <li class="nav__item">
      <a class="nav__link" href="#">Testimonials</a>
    </li>
    <li class="nav__item">
      <a class="nav__link nav__link--btn btn--show-modal" href="#"
        >Open account</a
      >
    </li>
  </ul>
</nav>
```

Here nav is the parent element, under which we have 'nav\_\_links' and under that we have nav\_\_item which contains 'nav\_\_link. So let's select 'nav\_\_links' first and then relative to that select other elements.

```javascript
"use strict";

const navLinks = document.querySelector(".nav__links");

console.log(navLinks.querySelectorAll(".nav__link"));
```

In above code we have selected the 'nav\_\_links' element and then we are applyiing querySelector on it to select its child. In output we below we can see that all the child of the 'nav\_\_links' with class 'nav\_\_link' are selected and we got a nodelist of 4 elements. The benifit of this is if we have more elements with class 'nav\_\_list' outside of the 'nav\_\_links', then those elements will not be selected. Here we have selected the elements relative to 'nav\_\_links'.

Apart from this if we want to get all the nodes available for navLinks then we can use `navLinks.childNodes`. This will give us all the nodes including, text, comment, etc.. As we know everything in html page is represented as node in DOM tree including comments as well. But if we want actual immediate children nodes and not other things like text and comments and links and all, then in this case we can use `navLinks.children`. Have a look at below code and it's output.

```javascript
"use strict";

const navLinks = document.querySelector(".nav__links");

console.log(navLinks.childNodes);
console.log(navLinks.children);
```

Here the output of `navLinks.childNodes` will be a nodeList of 11 elements which will contain everything text, comment and child nodes. While if we see the output of `navLinks.children` then we will get only 4 direct children to the 'nav\_\_links' which are 4 nodes of 'nav\_\_items'.

Now apart from this we can select first and last child as well.

```javascript
"use strict";

const navLinks = document.querySelector(".nav__links");

navLinks.firstElementChild.style.color = "green";
navLinks.lastElementChild.style.backgroundColor = "red";
```

Here the firstElementChild will select the first link which is for 'Features' and as we are setting the style of color to green, it will change the text to green color. Similarly lastElementChild will select the last 'nav\_\_item' which is for 'Open Account' button, and will apply style backgroundColor = red to it. The point here is we can select first and last direct child even if we dont know how many childs are there for this element.

As of now we were traversing the DOM elements downwards, but we can also traverse the DOM elements in upward direction as well. To understand this let's first select the 'Open Account' button which has the class 'nav\_\_link--btn' and then we will select all the elements relative to this button in upward direction.

Just like 'childNode' and 'childElements' we have 'parentNode' and 'parentElement' for upward traversing and this will also give all parent nodes and immediate parent nodes.

We also have .closest() method which also accepts an selector just like querySelector method and sleect the element same as that of querySelector method the only difference here is that querySelector() search the element in downward diercton while closest() search the element in upward direction, means if we apply quesySelector(".nav\_\_item") on 'nav\_\_links' node then nav\_\_item will be searche inside the nav\_\_links node in downward direction. While if we apply .closest("nav\_\_item") then it will search 'nav\_\_item' element outside and above the nav\_\_links. Have a look at below example.

```javascript
const btnOpenAccount = document.querySelector(".nav__link--btn");

console.log(btnOpenAccount.closest(".nav__links"));
```

This code will select the nav\_\_links element whcih is outside thee nav\_\_link--btn element. This is just like querySelector() but in opposit direction.

Now to read the adjucent properties we can use below methods.

```javascript
const firstNavItem = document.querySelector(".nav__item");

console.log(firstNavItem.previousElementSibling);
console.log(firstNavItem.nextElementSibling);

console.log(firstNavItem.previousSibling);
console.log(firstNavItem.nextSibling);
```

Here we have selected the element with class '.nav\_\_item' which will give us the first nav\_\_item element which is for 'Features' link. Now there is no previous sibling for it we have its parent before it so `firstNavItem.previousElementSibling` will give us the null while we have another nav\_\_item for 'Operations' next to it which is the sibling for Features element hence `firstNavItem.nextElementSibling` will give the nav\_\_item element for 'Operations' link.

The important thing to note here is that we can only access immediate previous or immediate next sibling only. We dont have any direct way to get all the siblings. Hence to get all the siblings we can go to parent of the element and then select all its childs. Like below.

```javascript
const firstNavItem = document.querySelector(".nav__item");

console.log(firstNavItem.parentElement.children);
```

Now using above code we will get all the siblings for nav\_\_item element. Here first we went to the parent of firstNavItem which will be 'nav\_\_links' element and from there we have selected the child of it which will be all nav\_\_item elements which are nothing but the all siblings for nav\_\_item.
