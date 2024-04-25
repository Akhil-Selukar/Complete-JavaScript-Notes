## 46.5 Code refactoring (implement classes for workouts)

After refactoring the code in previous section we have created a class for application and added methods for each operation. But if we take a closer look at workout, we have two types of workout cycling and running. Both this workouts have will have location coordinates, type (i.e. either cycling or running), distance and duration. Then based on type of workout we will have additional property which will be either speed or elevation. So here both cycling and running are type of workout and will have some common properties and some of their own properties. Hence we can see this as workout as a parent class and running and cycling are two child, where common properties will be in parent class and individual different properties will be in child class. This is what we are going to implement in this section.

So let's create the parent class first which is workout. In this class we will have all the common fields in both type of workouts and in addition to this we will add date and an id (unique). This date and id we will use further in next sections to display workout details on the screen.

```javascript
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, time) {
    this.coords = coords;
    this.distance = distance;
    this.time = time;
  }
}
```

In above code to generate unique id we must use some third party library or some logic which ensures the uniqueness and a structured id. But here for example purpose we are using date then converting it to string and taking last 10 characters from it.

Now we can extend this class and create two child classes for two different types of workouts with their additional properties and methods.

```javascript
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);

  constructor(coords, distance, time) {
    this.coords = coords;
    this.distance = distance;
    this.time = time;
  }
}

class Running extends Workout {
  constructor(coords, distance, time, speed) {
    super(coords, distance, time);
    this.speed = speed;
    this.calcGrade();
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
  constructor(coords, distance, time, elevation) {
    super(coords, distance, time);
    this.elevation = elevation;
    this.calcRank();
  }

  calcRank() {
    if (this.time < 5) this.rank = "1st";
    else this.rank = "last";

    return this.rank;
  }
}
```

Now we have classes ready for both the workouts, We can use these classes whenever we submit the form and create object of these classes. Then we can store those objects in a list to display them on left side of our application. We can also add input validations for the form fields. Below is the steps we will be doing in this part. Out of the list we do have code to add marker on map and to clear form data and hide the form, though we will need some changes in that code mentioned further down.

```javascript
_newWorkout(e) {
  e.preventDefault();
  // get data from form

  // data validation for valid data

  // create object based on workout type

  // add created object to workout array

  // add marker to the map for workout
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
  // render the workout list to left side of application

  // clear input data fields and hide the form.
    inputDistance.value =
      inputDuration.value =
      inputSpeed.value =
      inputElevation.value =
        "";
    form.classList.add("hidden");
  }
```

Now the first part we have to do is, we have to read the data from form. This is a simple thing like below. Also for speed and elevation, we need to check type first, because if type is running then we will have to read speed while if type is cycling then we will have to read the elevation.

Also another thing to note here is, when weread value from selector we always get String value hence to convert distance and duration to number we have used + operator.

```javascript
_newWorkout(e) {
  e.preventDefault();
  // get data from form
  const type = inputType.value;
  const distance = +inputDistance.value;
  const duration = +inputDuration.value;

  // data validation for valid data

  // create object based on workout type
  if (type === "running") {
    const speed = +inputSpeed.value;
  }

  if (type === "cycling") {
    const elevation = +inputElevation.value;
  }

  // add created object to workout array

  // add marker to the map for workout
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
  // render the workout list to left side of application

  // clear input data fields and hide the form.
    inputDistance.value =
      inputDuration.value =
      inputSpeed.value =
      inputElevation.value =
        "";
    form.classList.add("hidden");
  }
```

Now the next step is data validation, this is also not that hard we can simply allow only valid data and rejet all other like below.

```javascript
_newWorkout(e) {
  e.preventDefault();
  // get data from form
  const type = inputType.value;
  const distance = +inputDistance.value;
  const duration = +inputDuration.value;

  // data validation for valid data

  // create object based on workout type
  if (type === "running") {
    const speed = +inputSpeed.value;
    if (!Number.isFinite(speed) ||
        !Number.isFinite(distance) ||
        !Number.isFinite(duration))
      return alert("Please enter the valid details in form.");
  }

  if (type === "cycling") {
    const elevation = +inputElevation.value;
    if (!Number.isFinite(elevation) ||
        !Number.isFinite(distance) ||
        !Number.isFinite(duration))
      return alert("Please enter the valid details in form.");
  }

  // add created object to workout array

  // add marker to the map for workout
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
  // render the workout list to left side of application

  // clear input data fields and hide the form.
    inputDistance.value =
      inputDuration.value =
      inputSpeed.value =
      inputElevation.value =
        "";
    form.classList.add("hidden");
  }
```

If we see in above code the validation code is very much similar at both the places, so we are kind of repeating the code again. Consider if we add 3 more workout types with different fields, in that case we will have to repeat the same code 3 times more. So we can refactor this code in much better way. Have a look at below code.

```javascript
_newWorkout(e) {
  e.preventDefault();
  // get data from form
  const type = inputType.value;
  const distance = +inputDistance.value;
  const duration = +inputDuration.value;

  // data validation for valid data
  const validateInputs = (...inputs) =>
    inputs.every((inp) => Number.isFinite(inp));

  const checkPositive = (...inputs) => inputs.every((inp) => inp > 0);

  // create object based on workout type
  if (type === "running") {
    const speed = +inputSpeed.value;
    if (!validateInputs(speed, distance, duration) || !checkPositive(speed, distance, duration))
      return alert("Please enter the valid details in form.");
  }

  if (type === "cycling") {
    const elevation = +inputElevation.value;
    if (!validateInputs(elevation, distance, duration) || !checkPositive(distance, duration))
      return alert("Please enter the valid details in form.");
  }

  // add created object to workout array

  // add marker to the map for workout
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
  // render the workout list to left side of application

  // clear input data fields and hide the form.
    inputDistance.value =
      inputDuration.value =
      inputSpeed.value =
      inputElevation.value =
        "";
    form.classList.add("hidden");
  }
```

Here we have added a helper function validateInput(), this function will accept any number of parameters as a array and then we have used .every() method on that array. Here the '.every' method will check the condition for every element in the array, and if the condition is true for all elements of the array then it will return true else it will return false. Hence the helper function will return true only if all the values passed in it are numbers otherwise it will return false.

Similarly we have added another helper function to check if the values are positive or not.

Now the next thing that we have to do is to create object of different workout based on workout type, then add that object to workouts array.

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
    if (!validateInputs(speed, distance, duration) || !checkPositive(speed, distance, duration))
      return alert("Please enter the valid details in form.");

    workout = new Running([lat, lng], distance, duration, speed);
  }

  if (type === "cycling") {
    const elevation = +inputElevation.value;
    if (!validateInputs(elevation, distance, duration) || !checkPositive(distance, duration))
      return alert("Please enter the valid details in form.");

    workout = new Cycling(
        [lat, lng],
        distance,
        duration,
        elevation
      );
  }

  this.#workouts.push(workout);

  // add created object to workout array

  // add marker to the map for workout
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
  // render the workout list to left side of application

  // clear input data fields and hide the form.
    inputDistance.value =
      inputDuration.value =
      inputSpeed.value =
      inputElevation.value =
        "";
    form.classList.add("hidden");
  }
```

Now to add proper marker with different color for different type of workout we can do a very small change and we can refactor the code a bit. like below.

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
    this.addMarker(workout);

    // render the workout list to left side of application

    // clear input data fields and hide the form.
    inputDistance.value =
      inputDuration.value =
      inputSpeed.value =
      inputElevation.value =
        "";
    form.classList.add("hidden");
  }

  addMarker(workout) {
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
      .setPopupContent(workout.type)
      .openPopup();
  }
```

Here we have moved the code to add marker in new function and calling that function from \_newWorkout() function. Also we have used template literal to pass the class name to handle different color scheme for different workouts.
