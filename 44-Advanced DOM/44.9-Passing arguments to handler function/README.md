## 44.9 Passing arguments to handler function.

In this section we will be implementing the feature which will highlight the link in navbar on which we take our cursor and other links will be fedout, and as soon as we remove the cursore from the link all links will become normal.

To implement this feature we will have to select the nav bar from html because all the links are under navbar only and instead of adding individual eventListener to each link we can use event delegation and add a single eventListner for navbar. The html code which we are concern about in this section is below.

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

Now have a loot at below javascript code which will implement the required functionality and work as expected.

```javascript
const nav = document.querySelector(".nav");

nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const linkHovered = e.target;
    const siblings = linkHovered.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((link) => {
      if (link != linkHovered) {
        link.style.opacity = 0.5;
      }
    });
  }
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const linkHovered = e.target;
    const siblings = linkHovered.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((link) => {
      if (link != linkHovered) {
        link.style.opacity = 1;
      }
    });
  }
});
```

Here in above code we have selected navbar using `document.querySelector(".nav")` and then added two eventListener on it. Two because we have to handle two events, one is mouseover i.e. when we bring the mouse pointer on the link and second is mouseout i.e. when we take point off the link. Here mouseover looks very similar to that of mouseenter, the difference is mouseover can bubble up while mouseenter can not bubble up. Here we are using event delegation hence we will go with mouseover. Now once the event trigger we need to check that if the mouse pointer is on any link or not because event will trigger as soon as we enter the nav. So this is what we are checkiing in the if condition i.e. if the target on which the event is triggered contains class 'nav\_\_link' or not. If it contains the class that means we are on the link. As soon as pointer is on the link we are fetching the link on which the pointer is and storing it in `linkHovered` as we want to highlight that link. Now all other links we want to fed off so we need to select those links as well, those links are nothing but the siblings to the selected link. Hence to get all siblings we are fetching parent of the hovered link and then applying a querySelectorAll() on the parent to get all the 'nav\_\_link' elements which will be nothing but the siblings of the hovered link. Now at the forEach() loop we are looping over all the links and setting the opacity to 0.5 which will make the links light. But the thing to note here is the sibling nodes will contain the actual link node as well hence to exclude that we have added the condition `if (link != linkHovered)` so that only other siblings will be applied with style opacity = 0.5 and not the actual link.

Now same thing we have to do again when the mouse is removed from the link just that instead of seting the opacity to 0.5 we want to bring back the opacity to 1. Rest everything is same. This is implemented in the eventListner listning to the mouseout event.

Now from above code example we can clearly see that we are repeating a lot of code. So we can refactor the code and optimize it. We can create a function which will accept the amount of opacity and set it to the links and we can pass the same function with different value of opacity in both the event handler. This will reduce the repetation of code. Have a look at below code.

```javascript
const nav = document.querySelector(".nav");

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const linkHovered = e.target;
    const siblings = linkHovered.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((link) => {
      if (link != linkHovered) {
        link.style.opacity = opacity;
      }
    });
  }
};

nav.addEventListener("mouseover", handleHover(e, 0.5));

nav.addEventListener("mouseout", handleHover(e, 1));
```

Above code look much optimized. But there is a problem in above code. Event handler expect a function and not a function call, and handleHover(e, 0.5) is a function call. hence this will not work. In eventListner we can not call the function then how can we pass the arguments. Well we can do that by using .bind() method. Now whatever we pass in bind method that will be assigned to `this` keyword for that function. Hence we can use it as below.

```javascript
const nav = document.querySelector(".nav");

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const linkHovered = e.target;
    const siblings = linkHovered.closest(".nav").querySelectorAll(".nav__link");

    siblings.forEach((link) => {
      if (link != linkHovered) {
        link.style.opacity = this;
      }
    });
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));

nav.addEventListener("mouseout", handleHover.bind(1));
```

Now abovce code will work perfectly. The line `handleHover.bind(0.5)` will assiign 0.5 to this keyword when the function handleHower will be called in that eventListner. Hence we have assigned this to the opacity at `link.style.opacity = this;`. Similarly when we the mouseout event occure at that time 1 will be assigned to the this keyword and the function will be called.

So the summary is whenever we want to pass an argument to the handler function we can use .bind() method and assign that argument to this keyword and use it in the handler function. If more than one arguments are required then we can pass an object of all the arguments.
