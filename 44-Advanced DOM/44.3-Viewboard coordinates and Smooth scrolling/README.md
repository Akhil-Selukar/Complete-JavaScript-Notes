## 44.3 ViewBoard coordinates and smooth scrolling.

In this section we will be learning about viewboard coordinates and how to implement smooth scrooling between two sections of a webpage.

Viewboard is nothing but the portion on your screen in which you are seeing the webpage. In javascript by using the DOM and DOM elements we can get the coordinates where that element is located on viewboard, we can get the height and width of the viewboard, we can manipulate the positions and all other cool stuff. Have a look at below example to see how we can read the coordinates of any element on webpage and how to get the height and width of the viewboard.

```javascript
const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnLearnMore.addEventListener("click", function (e) {
  const section1Coordinates = section1.getBoundingClientRect();
  console.log(section1Coordinates);

  console.log(e.target.getBoundingClientRect());
});
```

In above code we have first selected two elements by using the querySelector(). One is scroll button and the another is the section-1 element. Then we have added an event listener to the scroll button and as soon as the click event occurs on the button we are displaying the coordinates and other details of both the elements.

At line `const section1Coordinates = section1.getBoundingClientRect();` on section1 element we are calling getBoundingClientRect() method. This method will return an DOMRect object which contains below details about the section1 elements.

```
DOMRect:{
    bottom: 2262.2000122070312
    height: 1567
    left: 0
    right: 983.2000122070312
    top: 695.2000122070312
    width: 983.2000122070312
    x: 0
    y: 695.2000122070312
}
```

Here in this object we can see all the details like x-coordinate (i.e. the distance of the element from left side edge), y-coordinate (i.e. the distance of the element from top edge), width and height of the element, etc.

At line `console.log(e.target.getBoundingClientRect());`, e.target means the the element on which the event happened. (e is the event and .target is the targeted element of that event). Hence this console.log() statement will print the details of scrollButton. The overall output of above code will be.

```
DOMRect{
    bottom: 2262.2000122070312
    height: 1567
    left: 0
    right: 983.2000122070312
    top: 695.2000122070312
    width: 983.2000122070312
    x: 0
    y: 695.2000122070312
}
DOMRect{
    bottom: 578.3750247955322
    height: 27.600000381469727
    left: 30
    right: 140
    top: 550.7750244140625
    width: 110
    x: 30
    y: 550.7750244140625
}
```

_Note : Here the values might be different base on the screensize and device you are running this code in._

Now apart from getting the position of specific element on the viewboard, we can get the current scroll of the complete webpage. (i.e. how much the webpage is scrolled horizontally and vertically.) Have a look at below code.

```javascript
const btnLearnMore = document.querySelector(".btn--scroll-to");

btnLearnMore.addEventListener("click", function () {
  console.log(`Current horizontal-scroll : ${window.scrollX}`);
  console.log(`Current vertical-scroll : ${window.scrollY}`);
});
```

Now in above example after scrolling a bit if you click on the learn more button then you will get 0 for horizontal scrolling value because the page is not scrollable horizontally. But some value will be there for vertical scrolling. In some old applicatiions you might see `windows.pageXOffset` in place of `windows.scrollX` and `windows.pageYOffset` in place of `windows.scrollY`. Those properties are now depricated in modern javascript. (All values here are in px.)

Many times we require the height and width of the viewboard, because we want to position different elements at different places on different screens in such cases we require to get the height and width of the entire viewboard itself. That we can get as below.

```javascript
console.log(document.documentElement.clientHeight);
console.log(document.documentElement.clientWidth);
```

Above console.log() will print the height and width of the viewboard of your webpage.

Now using above functions we can get the exact coordinates from where the section starts so we can go to directly that coordinates on click of the button, and this is what we will be implementing to do the scrolling on click of a button. To implement this we have a function scrollTo() on windows object. Have a look at below code.

```javascript
const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnLearnMore.addEventListener("click", function (e) {
  const section1Coordinates = section1.getBoundingClientRect();

  window.scrollTo(
    section1Coordinates.left + window.scrollX,
    section1Coordinates.top + window.scrollY
  );
});
```

Here in above code scrollTo() function on window scroll the webpage to specified coordinates. Now in our case we want to scroll to the section1 and section1's coordinate we can read using the .getBoundingClientrect() method on section1 element. This is what we are doing and passing the section1's coordinate to the scrollTo() method. Now as we have seen that the coordinates to any elements are relative to the viewboard that means if we manually scroll somewhere and then check the coordinate of section1 then the coordinates will be different. But we want to scroll to exact specific point every time hence we need to add the scroll that we already did before clicking the button hence we are adding window.scrollX and window.scrollY to the coordinates.

To understand this better consider below example.

Your screen size is 100px X 100px and your section1 is starting exactly at 100px from top and 0px from left (i.e. from left lower corner of your screen. Below your home page.)
Then at this position when you call `section1Coordinates.top` you will get 100 and hence window.scrollTo() will scroll your page till 100px vertically. Now consider that you have already scrolled to 20px vertically, and at this point if you call `section1Coordinates.top` you will get 80 only because you have already scrolled 20px so your section1 is now just 80px away from top. So in this case window.scrollTo() will scroll your page till 80px only which will be wrong. We want the page every time scrolled to 100px vertically hence we are adding window.scrollX and window.scrollY every time to add that already scrolled pixels.

If you observer the scrolling done by above code, then it's not the smooth it happens instantly which is not that cool visually. To make it smooth, instead of passing left and top value, we have to pass an object with these two values along with behaviour property as below.

```javascript
const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnLearnMore.addEventListener("click", function (e) {
  const section1Coordinates = section1.getBoundingClientRect();

  window.scrollTo({
    left: section1Coordinates.left + window.scrollX,
    top: section1Coordinates.top + window.scrollY,
    behavior: "smooth",
  });
});
```

Now the scrolling will be nice and smooth.

Above is the old way of implementing the smooth scrolling, which include lots of calculations and other things. But in modern javascript we have a very easy and simple way to achieve the same result which is as below.

```javascript
const btnLearnMore = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnLearnMore.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});
```

Here you can see we just need 1 line of code. we are calling scrollIntoView() function directly on the element to which we want to scroll and then we just have to pass object with only behaviour argument and all the other calculations and all will be taken care by javascript itself. This is more modern way of implementing smooth scrolling between different sections on a webpage.
