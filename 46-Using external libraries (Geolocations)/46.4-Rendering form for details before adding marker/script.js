"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputSpeed = document.querySelector(".form__input--speed");
const inputElevation = document.querySelector(".form__input--elevation");

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
        // console.log(mapEvent);

        mapEvent = event;
        form.classList.remove("hidden");
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
  e.preventDefault();
  inputDistance.value =
    inputDuration.value =
    inputSpeed.value =
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

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputSpeed.closest(".form__row").classList.toggle("form__row--hidden");
});
