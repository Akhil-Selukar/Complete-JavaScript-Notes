## 46.7 Rendering workouts on left side panel

In last section we have refactored the code and implemented classes for different types of workouts. The remaining part now is to display the list of workouts in left side panel. We will implement that in this section.

Now to implement this we are going to do some DOM manipulatiion and we will generate some html code as soon as a new workout is added and then will add that html code to the unordered list in the html page. In html page we have an unordered list with class workouts, in that list the first child is the form to submit workout we have already handled that. Second child is a list item for workout running (commented part) and third one is the list item for workout cycling (commented part), this is what we are going to handle in this section. Based on the type of workout we will create the html markup and add it to the list.

First lets handle the common part in both the type of workouts which is distance and duration. The individual part which is specific to the workout we will handle further down this section. To handle this rendering we have added a new method called `_renderWOrkouts(workout)`, this will create teh html and add it in the list as list item. Have a look at below code which handles the common part in both the workouts.

```javascript
_renderWorkouts(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">Running on April 14</h2>
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
  }
```

In above code we have almost handled all common parts, the remaining thing is the workout title/description which is workout type and the date on which that workout is done. This is also kind of common to both the workouts and it will be there for all workouts hence we can add a new method to workout class and call that method in child calss to generate the description.

```javascript
_setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
```

We have added above method to the workout (i.e. parent class) and then called this method in the constructor of child classes.
This method will be called without any error because through the scope chaining the child class will have access to the parent class's methods.

Now as we have description added to all the workouts (of both types) we can access this description and add it to the html we want to add to display workouts in left side panel.

```javascript
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
  }
```

Now to handle the workout type specific part, we can add a if condition in \_renderWorkouts() method and add the remaining html based on the workout type.

```javascript
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
  }
```

Using above method the html will be ready, now the thing is we have to add this html into the parent element which is the unordered list with class 'workouts'. Here we want the form to appear first in the panel as soon as we click on the map, hence form has to be the first child of the parent element 'ul'. The second child will be the new workout which. every new workout will be second child so that in the workouts list the topmost workout will be the recent workout.

But now the problem is we can only attach any element to its parent as first child or last child, we can not attach second, third, fourth child or so on. Hence instead of adding this new html as child to 'ul' we will add it as sibling to 'form' element using 'afterend' as the option which will add new html at the end of form element.

```javascript
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
```

Now if we run the code and try to add new workout, it will be added to the left panel as well, Also it will have color coding and description as well. This is perfect. Below is the screenshot of UI screen till this point.

![UI screenshot after above code implementation(46-Using external libraries (Geolocations)/46.7-Rendering workouts on left side panel/images/UI-Screenshot.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/46-Using%20external%20libraries%20(Geolocations)/46.7-Rendering%20workouts%20on%20left%20side%20panel/images/UI-Screenshot.png>)

Now if we check this code actually in action there are couple of issues. First one is the workout marker should display description of workout and not the hardcoded text. Second is when you hit enter and submnit the form the entries in the side panel appear to shift up a bit, which gives a wrong impression like entry is being added at the last (which is not the casse but it feel that way.) This is becaue when the form appears there is a animation which slide the form down shifting the already listed workouts downward. Similarly when the form disappears the animation also work in reverse way like form shift up and so the other workout entries in the panel as well. So while disappering we want that to happen instantly. This is what we will solve below.

First of all we can create a separate method for clearing inouts and hiding the form and call that in '\_newWorkout(e)' method and in newly created method where we are hiding the form we can fix the animation.

```javascript
_hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputSpeed.value =
      inputElevation.value =
        "";
    form.classList.add("hidden");
  }
```

Now here to fix that animation problem, we can not do something like animation will happen only one way. But what we can do is we can immediately hide the element and let the animation happen in background. This can be achieved by modifying the style of form.

```javascript
_hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputSpeed.value =
      inputElevation.value =
        "";
    form.style.display = "none";
    form.classList.add("hidden");
  }
```

But now we have another problem, after submiting the first workout even after clicking the form is not loaded. This is because we have set the form's display property to 'none' after first submit. This we have to bring back to original value once the animation which is running at the background is over. From the below css code for form we can see that the animation is for 0.5 sec. and original display property is 'grid'

```css
.form {
  background-color: var(--color-dark--2);
  border-radius: 5px;
  padding: 1.5rem 2.75rem;
  margin-bottom: 1.75rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 2.5rem;

  height: 9.25rem;
  transition: all 0.5s, transform 1ms;
}

.form.hidden {
  transform: translateY(-30rem);
  height: 0;
  padding: 0 2.25rem;
  margin-bottom: 0;
  opacity: 0;
}
```

Hence we can use setTimeout function in javascript to set the property back to grid after 0.5 sec. Have a look at below code.

```javascript
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
```

Here by using setTimeout function we are setting the display property back to 'grid' after 500 ms i.e. 0.5 sec.

Now the last part we have to handle is to display the workout description on the markers on map. This is very simple, we already have description in the workout objects so we can use that and add it to the popupoContent in \_addMarker(workout) method

```javascript
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
      .setPopupContent(`${
        workout.type === "running" ? "🏃‍♂️" : "🚴‍♂️"
      } ${workout.description}`)
      .openPopup();
  }
```

Below is the screenshot for final UI at the end of this section.

![Final Ui screenshot (46-Using external libraries (Geolocations)/46.7-Rendering workouts on left side panel/images/Final-UI-Screenshot.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/46-Using%20external%20libraries%20(Geolocations)/46.7-Rendering%20workouts%20on%20left%20side%20panel/images/Final-UI-Screenshot.png>)
