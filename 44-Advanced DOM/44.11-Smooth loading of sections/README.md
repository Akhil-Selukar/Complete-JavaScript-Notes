## 44.11 Smooth loading of sections.

This is also a very common efect used in many webpages. As we scroll through different sections that section feels like appearing from the blank screen as we scroll. This efect is also very easy to implement and we can use the intersection observer API here.

To make the sections appear as we scroll first we have to make them disappear and then as we scroll it will appear on screen. to make the sections disappear we can set the opacity of the sections to 0 using the CSS. Hence let's add class 'section--hidden' to all the section which will set the opacity to 0 and shift the content of section down by 8 rem so that we can make it feel like emerging content from white screen. Then we will observe the intersection of each section with window and based on which section is being load we will remove the 'section--hidden' class from that section. Have a look at below code.

```javascript
const allSections = document.querySelectorAll(".section");

const sectionLoader = function (entries, observer) {};

const sectionObserver = new IntersectionObserver(sectionLoader, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
```

Now in above code as of now just focus on allSections.forEach() loop. Here we have looped over all the sections and then added the class 'section--hidden' to all the sections and hide the sections. Now by using the intersectionObserver we will observe the intersection of each section with threshold of 15% with window and based on that we will remove the 'section-hidden' class.

Now in the observer callback function add the logic to remove the class as the section is scrolled 15% in window. Have a look at below code.

```javascript
const allSections = document.querySelectorAll(".section");

const sectionLoader = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
  }
};

const sectionObserver = new IntersectionObserver(sectionLoader, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
```

In the callback function we are checking which section is intersected with the window and that information we can get from the target in entry and from there we are removing the class 'section--hidden'. This code works perfect and it will load the section smoothly as you scroll through them. But there is one problem with this code. Print the entry on console from sectionLoader callback function to see the issue.

```javascript
const allSections = document.querySelectorAll(".section");

const sectionLoader = function (entries, observer) {
  const [entry] = entries;

  console.log(entry);

  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
  }
};

const sectionObserver = new IntersectionObserver(sectionLoader, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
```

Now after adding the `console.log(entry);` try to scroll through the entire page few times and observe the output on console and screen. You will see that even after loading all the sectons, the sectionObserver still observing the intersections and generating the events. Once the section--hidden class is removed from all ther section we dont have to observe the event because we have already removed the class. So in this case all the observations can cause us performance issue. So once the class is removed we want the observer to unobserve that section further. and for that we can the object of observer we receive in the callback function. Have a look at below code.

```javascript
const allSections = document.querySelectorAll(".section");

const sectionLoader = function (entries, observer) {
  const [entry] = entries;

  console.log(entry);

  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(sectionLoader, {
  root: null,
  threshold: 0.15,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
```

Now after adding `observer.unobserve(entry.target);` this line as soon as the class 'section--hidden' is removed from any section that section will be removed from the observation and will not generate more events.
