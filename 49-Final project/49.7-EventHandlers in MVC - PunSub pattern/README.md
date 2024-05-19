## 49.7 Eventhandlers in MVC - publisher subscriber pattern

In last 2-3 sections we had a look on MVC pattern and as per that pattern all the presentation related or UI related thing must be in view, all business logic must be in model and all the application logic must be in controller. Model and view should not have direct communication and controller should be the one who should act as a bridge between model and view.

But if we observe the current implementation of our code, we can see that the events on UI are directly handled in controller without any view by using eventHandlers. There is no issue in it but it doesnot follow the MVC architecture completly. So what should be the ideal case? In ideal case the events must be handled in view. So it seems simple right we can transfer the event handling code (i.e. the below line to recipeView.js).

```javascript
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
```

But the waht about the callback function 'showRecipe' this function is a part of controller and if we transfer this function to recipeView then we will be transfering the application logic to view which will be against the MVC architecture. next thing which we can do is we can import the showRecipe function in recipeView and use it, but in this case as well we are not following the MVC architecture, because we are not supposed to call controller from view because that will be kind of implementing the applicatiion logic in view. We should only call view from controller.

So the solution here is we can use publisher subscriber pattern (pub-sub pattern). To implement this we can have a method in recipeView which will subscrib the controller (the actual code that will be executed on an event) and that method in view will be listning to the events, as soon as an event is received (consider this as published event) this method will call the subscribed method in controller.

Here the important thing to note is that we will not be importing the callback function from controller in view so it will not be the view who is calling the controller function but we will call a method of view from controller function which will allow access of callback function to the event handlers. Have a look at below code to understand this better.

Method in recipeView.js

```javascript
addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
```

controller.js

```javascript
import * as model from "./model.js";
import recipeView from "./view/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

const showRecipe = async function () {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;
    recipeView.displayLoader(recipeContainer);

    // Loading the data from third party API
    await model.loadRecipe(recipeId);

    // Rendering recipe to UI
    recipeView.render(model.state.recipe);
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
};

init();
```

Here in controller we are defining a function init() which will call the view and allow the addHandlerRender method to access the showRecipe() function, and this method we are calling as soon as the file is loaded so that the showRecipe() will be available for event handlers as soon as the application is loaded. Here we are calling view from controller and not the controller from view hence MVC architecture is followed and we are not importing the controller function in view hence the calls are also in proper direction.

After above refactoring of we run the code it will work the same but now we have everything related to User interaction in view, all business logic in model and all application logic in controller.
