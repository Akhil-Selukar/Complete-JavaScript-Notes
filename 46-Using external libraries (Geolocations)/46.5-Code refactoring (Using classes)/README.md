## 46.5 Code refactoring (Using classes)

Now if you look at the code in script.js file. We have organized the code in much cleaner way and used class. We have created a class called App for the application, this class will be the one which will handle all operations which are being performed in the application. The structure of the class is as below.

```javascript
class App {
  constructor() {
    // All the initialization code which need to be executed automatic as soon as the application is loaded.
  }

  _getPosition() {
    // To get the initial coordinates and send it to _loadMap() so that map of your location is loaded.
  }

  _loadMap() {
    // Load the map with coordinates received.
  }

  _showForm() {
    // Callback function to handle the click event on map.
  }

  _toggleElevationField() {
    // Toggle to elevation and speed based on workout type selected. i.e. Callback function for change event.
  }

  _newWorkout() {
    // To add the marker on map and clear form.
  }
}
```

Now as soon as we load the application we want the location coordinate to be captured and the map for that location to load on screen. The code which get the location coordinates from browser (navigator) is below.

```javascript
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
```

This above mentioned operation we want to happen as soon as the application is loaded. And as soon as the application is loaded an object of class 'App' will be created and to create that object constructor() method will be called. So what all we want to happen on load of the application we need to write that in constructor. Now we have a function to get the coordinate i.e. \_getPosition(). Hence we can write above code in the \_getPosition() function and call this function from constructor so that as soon as the aapplication loads \_getPosition() will be called and the map will be displayed.

So the code will look like.

```javascript
class App {
  constructor() {
    this._getPosition();
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
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
            form.classList.remove("hidden");
            inputDistance.focus();
          });
        },
        function () {
          alert("Error getting your location..!!");
        }
      );
    }
  }

  _loadMap() {
    // Load the map with coordinates received.
  }

  _showForm() {
    // Callback function to handle the click event on map.
  }

  _toggleElevationField() {
    // Toggle to elevation and speed based on workout type selected. i.e. Callback function for change event.
  }

  _newWorkout() {
    // To add the marker on map and clear form.
  }
}

const app = new App();
```

Now in above code the first callback function which is written in navigator.geolocation.getCurrentPosition() is to load the map on screen. For this we have defined a fuction/method called \_loadMap(). So the code to display the map can go in \_lodaMap() and we can proide \_loadMap() as callback function in navigator.geolocation.getCurrentPosition() like below.

```javascript
class App {
  constructor() {
    this._getPosition();
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap, function () {
        alert("Error getting your location..!!");
      });
    }
  }

  _loadMap(position) {
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
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  }

  _showForm() {
    // Callback function to handle the click event on map.
  }

  _toggleElevationField() {
    // Toggle to elevation and speed based on workout type selected. i.e. Callback function for change event.
  }

  _newWorkout() {
    // To add the marker on map and clear form.
  }
}

const app = new App();
```

Now if we try to run the code we will get error, because we are using the function \_loadMap() as a callback function for another function hence the 'this' keyword for the callback function will be `undefined`. We need to bind the this keyword before calling the \_loadMap() function hence the updated code will be.

```javascript
class App {
  constructor() {
    this._getPosition();
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
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  }

  _showForm() {
    // Callback function to handle the click event on map.
  }

  _toggleElevationField() {
    // Toggle to elevation and speed based on workout type selected. i.e. Callback function for change event.
  }

  _newWorkout() {
    // To add the marker on map and clear form.
  }
}

const app = new App();
```

Now if you run the code the map will be displayed on screen. But if you observe the code, below code is the event listner code which handles the click on map and show the form.

```javascript
map.on("click", function (event) {
  mapEvent = event;
  form.classList.remove("hidden");
  inputDistance.focus();
});
```

And we have a function \_showForm() for this. So we can again refactor and add above code in \_showForm() mfunction.

```javascript
class App {
  constructor() {
    this._getPosition();
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

    map.on("click", this._showForm(this));
  }

  _showForm(event) {
    mapEvent = event;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    // Toggle to elevation and speed based on workout type selected. i.e. Callback function for change event.
  }

  _newWorkout() {
    // To add the marker on map and clear form.
  }
}

const app = new App();
```

Here again we used .bind() method to bind the this keyword. This is because \_showForm() is also a callback function but this time it is getting called on map object hence the this keyword attached in the call of \_showForm() function will be the map object, but here we want the event to be sent as this keyword. Hence we used .bind() keyword and sent the current event (i.e. 'this' after the click event occurs).

Now most of the application will be working but when we try to add a marker by submiting the form it will not work because the marker is added when we handle the submit event by using below code in previous section.

```javascript
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
```

Now we can see that this subimt event we need to handle every time, hence this event handler must be attached as soon as the application is loaded and hence we have to add this eventListner in constructor method. Now to add the marker we have the function \_newWorkout(). Hence we can add the event listner in constructor() and use the \_newWorkout() function as callback function in the event handler. Here as well the event handler is atttached to the form hence we will have to bind the this keyword while using the \_newWorkout() as callback function. Have a look at below code.

```javascript
class App {
  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
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

    map.on("click", this._showForm(this));
  }

  _showForm(event) {
    mapEvent = event;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    // Toggle to elevation and speed based on workout type selected. i.e. Callback function for change event.
  }

  _newWorkout() {
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
  }
  }
}

const app = new App();
```

Similarly we can handle the 'change' event which toggle the speed and elevation based on the selection on dropdown. This we can write in the function, \_toggleElevationField(). Have a look at below code.

```javascript
class App {
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

    map.on("click", this._showForm(this));
  }

  _showForm(event) {
    mapEvent = event;
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputSpeed.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout() {
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
  }
  }
}

const app = new App();
```

Now almost all functionalities are implemented and everything is added. The only thing remaining is we have to change the global variables map, mapEvent.

We can add private variables in class and refer those throughout the code, like below.

```javascript
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
```

In above code we have created two class variables #map, #mapEvent. And we have refered this variables in the complete code.
