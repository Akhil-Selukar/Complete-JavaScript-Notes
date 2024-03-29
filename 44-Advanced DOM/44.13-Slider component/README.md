## 44.13 Slider component

Note: If you are working on the same code that is built in previous sections then comment line `section.classList.add("section--hidden");` from the code while working on this section. Once this section is done you can uncomment the line again.

The slider component mainly used to display images, customer feedback, achievements, etc. In this project we will implement the slider for feedbacks from customer. We have three feedback slides and we will implement the slider for these three slides. How these kind of sliders work is all the slides are placed one after other horizontally and then on click of button or after a specified time these slides are moved one position to left or right.

So the first thing here we want to do is to arrange the feedback slides horizontally. We have already applied below css and used flexbox to stack all the slides on each other. Then by using css we will apply another property to each slide that is 'translateX()'.

```css
.slide {
  position: absolute;
  top: 0;
  width: 100%;
  height: 50rem;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 1s;
}
```

Now to add transslateX() property to each slide we will have to select all the slides and then we have to add the value to translateX() as 0% for first slide then 100% for second slide so that it will be exactly after the first one then 200% for the third so that it will be exactly after the second one and so on. We can use foreach loop on all slides to add this property and index value to calculate and assign the % value. Have a look at below example.

```javascript
const slides = document.querySelectorAll(".slide");

slides.forEach((slide, i) => {
  slide.style.transform = `translateX(${100 * i}%)`;
});
```

Now to move the slides left or right we need to select the left and right button and then add an event listner to listen to 'click' event and as soon as the click event occure we have to update the values in translateX() property. Have a loot at below code.

```javascript
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let currentSlide = 0;

const moveToSlide = function (slideNumber) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - slideNumber)}%)`;
  });
};

const nextSlide = function () {
  if (currentSlide === slides.length - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  moveToSlide(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  }
  moveToSlide(currentSlide);
};

moveToSlide(0);

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);
```

In above code we have a function `moveToSlide` which accepts slide number and set the CSS property of translateX(0%) to it and update the other slide's translateX accordingly (all slides after that slide as 100%, 200% and so on while all slides before that slide as -100%, -200% etc)

Then we have `nextSlide` and `previousSlide` functions which intern call the moveToSlide() function with next or previous slide number. and in case we reach either end then start the slide number again. We are calling these functions from the event listners at left and right button.

The above code will work perfectly fine, but we want to add other functionalities as well like the slider should work using arrow keys as well, apart from sliders there should be dots below the slider indicating which slide is currently being displayed and how many slids are there in each side of current slide.
