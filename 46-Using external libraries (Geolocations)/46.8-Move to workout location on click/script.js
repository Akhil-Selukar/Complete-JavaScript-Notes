"use strict";

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputSpeed = document.querySelector(".form__input--speed");
const inputElevation = document.querySelector(".form__input--elevation");

class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, time) {
    this.coords = coords;
    this.distance = distance;
    this.time = time;
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = "running";

  constructor(coords, distance, time, speed) {
    super(coords, distance, time);
    this.speed = speed;
    this.calcGrade();
    this._setDescription();
  }

  calcGrade() {
    if (this.distance >= 10 && this.speed >= 5) {
      this.grade = "Professional";
    } else {
      this.grade = "Beginner";
    }
    return this.grade;
  }
}

class Cycling extends Workout {
  type = "cycling";

  constructor(coords, distance, time, elevation) {
    super(coords, distance, time);
    this.elevation = elevation;
    this.calcRank();
    this._setDescription();
  }

  calcRank() {
    if (this.time < 5) this.rank = "1st";
    else this.rank = "last";

    return this.rank;
  }
}

class App {
  #map;
  #mapEvent;
  #workouts = [];
  #zoomLevel = 13;

  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
    containerWorkouts.addEventListener("click", this._moveToWorkout.bind(this));
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

    this.#map = L.map("map").setView(coords, this.#zoomLevel);

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

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputSpeed.value =
      inputElevation.value =
        "";
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => (form.style.display = "grid"), 500);
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputSpeed.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();
    // get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // data validation for valid data
    const validateInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    const checkPositive = (...inputs) => inputs.every((inp) => inp > 0);

    // create object based on workout type
    if (type === "running") {
      const speed = +inputSpeed.value;
      if (
        !validateInputs(speed, distance, duration) ||
        !checkPositive(speed, distance, duration)
      )
        return alert("Please enter the valid details in form.");

      workout = new Running([lat, lng], distance, duration, speed);
    }

    if (type === "cycling") {
      const elevation = +inputElevation.value;
      if (
        !validateInputs(elevation, distance, duration) ||
        !checkPositive(distance, duration)
      )
        return alert("Please enter the valid details in form.");

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // add created object to workout array
    this.#workouts.push(workout);

    // add marker to the map for workout
    this._addMarker(workout);

    // render the workout list to left side of application
    this._renderWorkouts(workout);

    // clear input data fields and hide the form.
    this._hideForm();
  }

  _addMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          // closeButton: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♂️"} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkouts(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workout.type === "running" ? "🏃‍♂️" : "🚴‍♂️"
      }</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`;

    if (workout.type === "running") {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed}</span>
      <span class="workout__unit">km/hr</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🥇</span>
      <span class="workout__value">${workout.grade}</span>
    </div>
    </li>`;
    }

    if (workout.type === "cycling") {
      html += `<div class="workout__details">
      <span class="workout__icon">📈</span>
      <span class="workout__value">${workout.elevation}</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🥇</span>
      <span class="workout__value">${workout.rank}</span>
    </div>
    </li>`;
    }

    form.insertAdjacentHTML("afterend", html);
  }

  _moveToWorkout(e) {
    const workoutElement = e.target.closest(".workout");
    // console.log(workoutElement);

    if (workoutElement === null) return;

    const workout = this.#workouts.find(
      (wo) => wo.id === workoutElement.dataset.id
    );

    // console.log(workout);

    this.#map.setView(workout.coords, this.#zoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }
}

const app = new App();
