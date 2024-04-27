## 46.8 Move to workout location on click

In this section we will be implementing the feature using which if we click on any workout in the left side panel, that perticular workout will be centered on the map. To achieve this we have to listen to the 'click' event on listed workout items in side panel. But the problem here is we don't have any workout listed initially so where we will attach the event listner. This is where we can use the [event delegation](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/44-Advanced%20DOM/44.6-Event%20delegation). We will attach the event listner on the parent element which is the panel itself and then deligate that event to specific workout.

Here as we want to attach the event listner as soon as the application loads we attach it in the constructor of the App class.

```javascript
constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
    containerWorkouts.addEventListener("click", this._moveToWorkout.bind(this));
  }
```

We have used .bind(this) because the method \_moveToWorkout is used as callback function and hence it will not have this keyword set to the object of class App, so we explicitly set the this keyword to this in App class object.

Now the method \_moveToWorkout() which we are using as callback function will have the actual logic.

Now whenever any click happen in the side panel we want to check if that click happen inside any workout box displayed on UI or not. Now that workout box is nothing but the list item from an unordered list, and the list item has class 'workout' and all other details like duration, imojis and other details are inside this list item hence if the click event is inside teh workout list item then it will cover click on all the other elements inside it.

Now to identify this we can use '.closest()' on the element on which event occure, and check if we have any closest parent element with class 'workout' (because that is what our actual target is). This we can do as below.

```javascript
_moveToWorkout(e) {
    const workoutElement = e.target.closest(".workout");
    console.log(workoutElement);
  }
```

If we check the 'workoutElement' we will get the id of the workout in it which we have added as data attribute in last section. Now by using this workout id we can simply get that workout from workouts array, then from that we can get the coordinates of that workout and locate that coordinates on map.

```javascript
  _moveToWorkout(e) {
    const workoutElement = e.target.closest(".workout");
    // console.log(workoutElement);

    if (workoutElement === null) return;

    const workout = this.#workouts.find(
      (wo) => wo.id === workoutElement.dataset.id
    );

    console.log(workout);
  }
```

Now if we check the above code. As soon as we click on any workout in left side panel, we will be able to see the workout details of that workout in console. There we have coordinates as well. Now as we have coordinates, we can use the method provided by leaflet i.e. setView() method. This will set the coordinate to center of the map. Have a look at below code.

```javascript
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
```

Here we have passed the coordinates from the workout to set view method and then set the zoom level to our defaultvalue 13. Then the 3rd optional argument is to animate the map which will look like map is actually scrolling to the given coordinates and duration for this animation is 1 sec.
