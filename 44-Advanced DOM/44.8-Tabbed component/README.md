## 44.8 Tabbed Component

Under operations section we can see that there are three buttons and some content below the button in rectangular area. Based on the selection of the button the content in the below rectangle must change. This functionality is just like multiple open tabs in the browser and based on the selection of tab the content related to that tab will be displayed in the windows.

The htlm code for this section is.

```html
<section class="section" id="section--2">
  <div class="section__title">
    <h2 class="section__description">Operations</h2>
    <h3 class="section__header">
      Everything as simple as possible, but no simpler.
    </h3>
  </div>

  <div class="operations">
    <div class="operations__tab-container">
      <button
        class="btn operations__tab operations__tab--1 operations__tab--active"
        data-tab="1"
      >
        <span>01</span>Instant Transfers
      </button>
      <button class="btn operations__tab operations__tab--2" data-tab="2">
        <span>02</span>Instant Loans
      </button>
      <button class="btn operations__tab operations__tab--3" data-tab="3">
        <span>03</span>Instant Closing
      </button>
    </div>
    <div
      class="operations__content operations__content--1 operations__content--active"
    >
      <div class="operations__icon operations__icon--1">
        <svg>
          <use xlink:href="img/icons.svg#icon-upload"></use>
        </svg>
      </div>
      <h5 class="operations__header">
        Tranfser money to anyone, instantly! No fees, no BS.
      </h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </div>

    <div class="operations__content operations__content--2">
      <div class="operations__icon operations__icon--2">
        <svg>
          <use xlink:href="img/icons.svg#icon-home"></use>
        </svg>
      </div>
      <h5 class="operations__header">
        Buy a home or make your dreams come true, with instant loans.
      </h5>
      <p>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
    <div class="operations__content operations__content--3">
      <div class="operations__icon operations__icon--3">
        <svg>
          <use xlink:href="img/icons.svg#icon-user-x"></use>
        </svg>
      </div>
      <h5 class="operations__header">
        No longer need your account? No problem! Close it instantly.
      </h5>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
    </div>
  </div>
</section>
```

In this code we can see that the div with class 'operations' is the parent under which all the buttons, rectangle and content respective to each button is placed. All the three buttons are wrapped under 'operations\_\_tab-container' and a custom attribute 'data-tab' which store the button/tab number. Then below that we have tabs for div for content of each tab with class 'operations\_\_content--1', 'operations\_\_content--2' and 'operations\_\_content--3'. Also we have two classes 'operations**tab--active' and 'operations**content--active' to apply style for active tab and to display content of active tab in the rectangle container.

Now have a look at below code which implement the tabbed component functionality.

```javascript
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabContainer.addEventListener("click", function (e) {
  const clickedTab = e.target.closest(".operations__tab");

  if (!clickedTab) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clickedTab.classList.add("operations__tab--active");

  const tabNumber = clickedTab.dataset.tab;
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${tabNumber}`)
    .classList.add("operations__content--active");
});
```

Here we want to listen to the click event on all the three tabs so instead of adding the eventListner to the individual button/tab element we can use event delegation and add an event listner to immediate parent which is 'operations\_\_tab-container'. Hence we have added a eventListner which is listning for a click event. Now as soon as the click event occure we want to check that if the event occure at the button or outside the button somewhere in the container. So that why we are fetching the `e.target` which will give us the element on which the click event occure. Now if you observe the html of all the buttons we have a span element inside the button so if the we click on the number which is inside the span then in that case `e.target` will not return the button element even though the span is part of button only. Hence in such case we need DOM traversing in upward direction. So we will look for the closest 'operations**tab' class, if the event is actually happen on thee button then `closest('.operations**tab')`will return the button itself and if the click event happen on the span then it will return the parent button of that span. So in both the cases now we will be getting the button only. So if we successfully got the button then that means we have to proceed with the further actions otherwise the click was outside the buttons on the container so we dont have to do anything. Hence we are checking that if we got the button in clickedTab or the clickedTab is null. If it is null then that is a falsy value and we are negating it in if statement and if it is null then we are terminating the eventListner() execution by returning the control. While if the click is on the button then we are first removing the 'operations\_\_tab--active' (class which applies the style for active button) from all the buttons and then adding the same class to only the clicked button. This will alter the style of selected button. Now based on the clicked button we have to display the text in the rectangular container. To do this we must identify the content associated with the button and for that we are using the custom-attribute. So we are reading the custom attribute from the clickedTab using`clickedTab.dataset.tab`, this will give us the button/tab number of which tab is clicked. Now if you observer the class name for content div. It is concatination of operations\_\_content-- with the number 1, 2 or 3 (i.e. the button/tab clicked). We have the tab number so we can easily do the concatination and get the class of content div associated with the button/tab clicked. Now to make that content div visible, we are removing the class 'operations\_\_content--active' (which is responsible to display the content) from all the content div's and then adding the same class to the div associated with the tab clicked. And we are identifying the tab clicked by using the class name which we created above using concatination.
