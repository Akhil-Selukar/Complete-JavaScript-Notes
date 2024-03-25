## 44.6-Event Delegation

To understand what is event delegation and why we use event delegation, let's take and example and implement the smooth scrolling to the respective sections mentioned in the nav bar of our webpage. All three links mentioned in the nav bar (Features, Operations and Testimonials) must scroll the page to the respective section smoothly. We have seen the similar thing in '[44.3-Viewboard coordinates and Smooth scrolling](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/44-Advanced%20DOM/44.3-Viewboard%20coordinates%20and%20Smooth%20scrolling)' section, and we can use the same thing here as well like below and that will work fine.

```javascript
document.querySelectorAll(".nav__link").forEach(function (individual_link) {
  individual_link.addEventListener("click", function (e) {
    e.preventDefault();
    const linkId = this.getAttribute("href");
    document.querySelector(linkId).scrollIntoView({ behavior: "smooth" });
  });
});
```

In above code we have selected all the three links by using querySelectorAll() and then by using forEach loop added eventListner() to all the three links. As in html we have given the section Id as href so if we click on the link it refreshes the page, hence to prevent this happening we have prevented the default behaviour by applying the `e.preventDefault()` for the current event. Then as we have sectionId in href and we can use the Id as query selector hence we have extracted the value of href for the link on which the event occure as we only want the relative value of href hence we have used the getAttribute() method. Now by using the linkId as query selector we have selected the section and called scrollIntoView() method with smooth behaviour to scroll to that section.

Thsi will work fine with all the webpages. But if you think carefully. We have added exactly same event listner to three link elements for 3 or 5 elements applying same eventListner individualy will not cause any problem but consider you have 100 or 1000's of such links in that case applying eventListner individually will not be a good idea and will definitely impact the performance. Hence in such case we use event delegation. And to do that instead of adding the event listner to each and every individual element we add one event listner to the common parent of all the. And then by event bubbling the actual event is handler at parent level.
Have a look at below code to understand this better.

```javascript
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const linkId = e.target.getAttribute("href");
    document.querySelector(linkId).scrollIntoView({ behavior: "smooth" });
  }
});
```

In above example we have added the event listner to the parent element of all links i.e. 'nav\_\_links'. Then we have prevented the default as we don't want the page to reload. Then after that the main logic is there. Now as we have implemented the eventListner to the parent element, it will listen to all the events heppening in the parent element irrespective of if the event occur on link or not, this is not we want, we want to listen to only those click events which happens on any one of the three links. Hence we have added a if condition and checking if the target element on which the event occur contains the class 'nav\_\_link' or not. If yes then that eans the event occur on the link else it is somewhere else on the navbar. If the event occurs on the link then only we are processing further and implementing the same logic i.e. get the id of section form href attribute of link then select the section using that id and call scrollIntoView with smooth transection

This is much better than adding the same event listener to individual link. Here we are delegating the event handling part to parent element and while bubbling phase we are handling that event at parent level.
