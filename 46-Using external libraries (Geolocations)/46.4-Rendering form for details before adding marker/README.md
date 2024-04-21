## 46.4 Rendering form for details before adding marker

As of now whenever a click happen on the form, we are directly adding the marker at that point with hard coded message. But what we want to do now is, we want to display a form at the left side area and after submiting the form we want the marker to be added with message based on the inputs in form.

The html code for form is already present and it is hidden by the css class 'hidden' which set the oacity to 0. So what we want to do is toggle between the hidden class based on click event on map. That we can achieve as below.

```javascript
"use strict";

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      console.log(latitude);
      console.log(longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      const map = L.map("map").setView(coords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", function (mapEvent) {
        form.classList.toggle("hidden");
      });
    },
    function () {
      alert("Error getting your location..!!");
    }
  );
}
```

Now after adding the line `form.classList.toggle("hidden");` we can see the form appera and disappear on the click events. Now the next part is, on click of 'enter' button we want the form to submit the data entered and display the message based on the data. For thsi we will have to add another event listner which will listen for 'submit' event. Now this event listner has nothing to do with the map and geolocation hence we can write this event listner outside individually.

```javascript
form.addEventListener("submit", function (e) {
  console.log("form submitted..!!");
});
```

Now this event listner will listen to the form submit and will print 'form Submitted..!!' as soon as we press enter. But what we want to do is add marker on submitting the form hence we have to add the code to place marker in this callback function and create global variable for map and other fields so that those can be accessed in this function. Below will be the code after implementing the logic.

```javascript
"use strict";

const form = document.querySelector(".form");
const inputDistance = document.querySelector(".form__input--distance");

let map, mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      //   console.log(position);
      const { latitude, longitude } = position.coords;
      console.log(latitude);
      console.log(longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      map = L.map("map").setView(coords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", function (event) {
        mapEvent = event;
        form.classList.toggle("hidden");
        inputDistance.focus();
      });
    },
    function () {
      alert("Error getting your location..!!");
    }
  );
}

form.addEventListener("submit", function (e) {
  // console.log("form submitted..!!");
  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("New location")
    .openPopup();
});
```

Now when we run the code and enter the distance in form and hit enter we will be able to see the marker appear for a fraction of a second, and then it disappears. This is because as soon as we submit the form the page reload. We have already seen this in some of the previous sections. We can easily fix this by preventing the default behaviour of form.

Now the next problem we can see is even after submitting the form we can see the form and it is not disappering, and on next click it disappears instead of appering. We can fix the form disappering we can fix by changing the toggle to remove at line `form.classList.toggle("hidden");` as here we want to display the form always. And then we can add the 'hidden' class again after the form is submitted. For clearing the field values we can assign all the fiends to empty string as follows.

```javascript
form.addEventListener("submit", function (e) {
  // console.log("form submitted..!!");
  e.preventDefault();
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";
  form.classList.add("hidden");

  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        // closeButton: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("New location")
    .openPopup();
});
```

Till now its working perfect, but when we change the 'Type' from running to cycling. The speed must change to Elevation gain. To achieve this, we can take advantage of an event ('change' event) which is generated whenever we change the value from dropdown, we can add an event listner and based on the event we can change the field. Below code will do this.

```javascript
inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputSpeed.closest(".form__row").classList.toggle("form__row--hidden");
});
```
