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

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert("Error getting your location..!!");
        }
      );
    }
  }

  _loadMap(position) {
    //   console.log(position);
    const { latitude, longitude } = position.coords;
    console.log(latitude);
    console.log(longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
  }

  _showForm(event) {
    // console.log(mapEvent);

    this.#mapEvent = event;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputSpeed.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    // console.log("form submitted..!!");
    e.preventDefault();
    inputDistance.value =
      inputDuration.value =
      inputSpeed.value =
      inputElevation.value =
        "";
    form.classList.add("hidden");

    const { lat, lng } = this.#mapEvent.latlng;

    L.marker([lat, lng])
      .addTo(this.#map)
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
  }
}

const app = new App();
