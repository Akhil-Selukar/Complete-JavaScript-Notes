## 46.9 Implementing local storage to store workout data

After last section all the functionalities and refactoring is completed for the application and it is working as expected. But one thisng is we can notice in it is as soon as we relate the page all the workouts which we have added previously disappears. This is because we are not connected our application to database. But apart from database there is one way which is local storage. Local storage is basically a place in browser where we can store data (we can close and reopen the browser as mant time as we want). The data in local storage is linked to the url and as soon as we hit the url which is associated with any data in local storage, the data will be loaded along with the webpage.

Lcalstorage stores data in the form of key value pair.

So the idea here is whenever we add any new workout to the application it will take all the workouts and add them to the local storage and when we load the page again next time it will load the data from local storage and display on the screen.

Now as per above description we have to store all the workouts to the local storage as soon as a new workout is added. Hence we will have to start with \_newWorkout(e) method and add the code to store workouts in local storage in this method.

```javascript
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

    // add data to local storage
    this._setLocalStorage();
  }
```

Now let's define the '\_setLocalStorage()' method which will have the actuaal code.

```javascript
_setLocalStorage() {
  localStorage.setItem("workouts", JSON.stringify(this.#workouts));
}
```

above method will first convert the value of 'this.#workouts' array (which contains the details of all workouts) to string using `JSON.stringify()` and then store that string to localstorage with key 'workouts'.

Now after adding above lines of code if we run the application we will be able to see the data stored in the local storage. Have a look at below screenshot which shows the workout data stored in local storage. (to see data you have to open the inspect element, then go under application tab and check the local storage.)

![local_Storage (46-Using external libraries (Geolocations)/46.9-Implementing local storage/images/Local_storage.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/46-Using%20external%20libraries%20(Geolocations)/46.9-Implementing%20local%20storage/images/Local_storage.png>)

Note: It is not advised to use localstorage to store large amount of data because local storage API is blocking, and hence it will cause performance impact.

Till here the half part is done, the other half is we want to display the data on UI as soon as we load the application again. Now again we want this data from local storage as soon as we load the page so this must go in constructor of App class. So here as well we will use the same approach, we will create a method to get data from local storage and call it in constructor.

```javascript
_getLocalStorage() {
  const data = localStorage.getItem("workout");
}
```

This will fetch the data from localstorage. This returned data will be a string, but we want object. So we can do just opposit of `JSON.stringify()` which is `JSON.parse()`

```javascript
_getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("workouts"));
}
```

Now this above code will give us back the array of workouts (i.e. #workouts) which we have stored in local storage. The next thing which we want to do is to initialize the #workouts array with this data because on every reload #workouts will be empty array but if we have some data in local storage then in that case we must assign that data to #workouts at the start and \_getLocalStorage() is getting called from constructor which means at the time of initialization hence we can set the data from local storage (if there is any) to #workouts here. After this we can call \_renderWorkouts() which we have written for rendering the workout on side panel to display the workout list.

```javascript
_getLocalStorage() {
  const data = JSON.parse(localStorage.getItem("workouts"));

  if (!data) return;

  this.#workouts = data;
  this.#workouts.forEach((wo) => {
    this._renderWorkouts(wo);
  });
}
```

Now after above code the persisted data or workouts from local storage will be displayed to the left side panel. but still we are net getting the markers for those workouts. We can think of something like calling the \_addMarker() method just like \_renderWorkouts(). But that will not work because when you reload the application data from the local storage will be fetched first and then it will create map object so if you call the \_addMarker() just like above \_renderWorkouts() it will try to add marker on map object which is not yet defined and will throw an error.

Hence we have to load the markers after the map is loaded hence we can add code to add the markers to \_loadMap() method at the end once the map object is created.

```javascript
_loadMap(position) {
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

  this.#workouts.forEach((wo) => this._addMarker(wo));
}
```

The last line with for each loop will load the markers on map.

Now to clear the data from local storage we don't have anything yet. So we can add a public method in App classs for the first time in this series of sections which we can call from console and clear the local storage.

```javascript
reset() {
  localStorage.removeItem("workouts");
  location.reload();
}
```

Above is the public method hence this we can call outside the class aswell using the app object which is the object of App class we are creating at last line to run the whole code.

In above method we are first removing the item from local storage with key 'workouts' and then we are reloading the application using location object and calling reload() method on it.
