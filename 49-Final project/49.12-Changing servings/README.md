## 49.12 Changing servings

In the application we can now search for the recipes, we can view the recipe we want, we can go to next page or come back to previous page. The next thing which we can implement is to change the serving size for the recipe. Based on the number of servings the quantity of ingrediants must change. This we can implement easily, we can listen to the events on buttons to change the servings. based on the cllick of button we can update the servings and we can multiple the quantity of ingredients by serving size to update it.

So here we will need to handle the click events on the servings increase and decrease buttons so again we will need to use the publisher and subscriber pattern like in last section. This time the view is not that big and the servings is a part of recipe view so we ca write this code in recipeView.js itself.

recipeView.js

```javascript
import View from "./view.js";

import icons from "url:../../img/icons.svg";
import fracty from "fracty/fracty";
.
.
.

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny");
      if (!btn) return;

      handler();
    });
  }

 .
 .
 .
export default new RecipeView();
```

Here we have are using event deligation to check for the servings button (i.e. button with class btn--tiny. as of now we are not worried about increase of decrease). Now as we are adding event listner to the parent element hence it might happen that the event is triggered outside the servings button but on parent element. Hence to prevent updating details from such events we have added a guard clause `if(!btn) return;` this will immediately end the event listner callback function if no button is clicked. and if the button is clicked then we will call the handler function(). (Further we will identify if the button clicked was for increase of decrease.)

Now next thing is we have to write the handler function. This handler function must update the servings and ingredients quantity in state object and render the updated servings and quantity for ingredients on recipe view. It is very clear that as we will be working with state object and updating it so we will have to call the model from the controller and once the state object is updated then we can simply re-render the recipe view.

controller.js

```javascript
import * as model from "./model.js";
import paginationView from "./view/paginationView.js";
import recipeView from "./view/recipeView.js";
import resultsView from "./view/resultsView.js";
import searchView from "./view/searchView.js";

.
.
.


const controlServings = function () {
  // update the servings data in state object
  model.updateServings(6);

  // update the recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(searchRecipe);
  paginationView.addHandlerClick(controlPagination);
};

init();
```

Here we have created a function called 'controlServings' this will be the controller function which will also be called on occurance of click event on any of the update serving button. This function first call model to update the servings data in state object and then render the recipe view. Now we will have to write the 'updateServings()' function in model this will take the number of servings and update the state object as per that.

model.js

```javascript
import { API_URL, RESULT_PER_PAGE } from "./config";
import { getJSON } from "./helper";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RESULT_PER_PAGE,
    page: 1,
  },
};
.
.
.
export const updateServings = function (newServings) {
  // calculate new quentity for ingredients in state object.
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // update the number of servings in state object
  state.recipe.servings = newServings;
};
```

If we run the above implementation of the code and click on any of the update serving button the servings will change to '6' and the quantity of ingredients will update for 6 servings. (6 because we have hardcoded the serving side as 6 in controller. This we will make dynamic further.)

Now every time we increase the serving it will increase by 1 and same with decrease as well. So just like the pagination buttons we can add a data property for servings as well in view.

recipeView.js

```javascript
import View from "./view.js";

import icons from "url:../../img/icons.svg";
import fracty from "fracty/fracty";

.
.
.

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--tiny");
      if (!btn) return;

      const {updateTo} = btn.dataset;
      if(+updateTo > 0)handler(+updateTo);
    });
  }

  _generateHtmlMarkup() {
    return `<figure class="recipe__fig">
    .
    .
    .
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings" data-update-to=${
          this._data.servings - 1
        }>
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings" data-update-to=${
          this._data.servings + 1
        }>
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    .
    .
    .

```

controller.js

```javascript
import * as model from "./model.js";
import paginationView from "./view/paginationView.js";
import recipeView from "./view/recipeView.js";
import resultsView from "./view/resultsView.js";
import searchView from "./view/searchView.js";

.
.
.


const controlServings = function (updateTo) {
  // update the servings data in state object
  model.updateServings(updateTo);

  // update the recipe view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(searchRecipe);
  paginationView.addHandlerClick(controlPagination);
};

init();
```

And now the code must be working as expected.

But if closely noticed we can observe that whenever we change the servings the entire recipeView is reloaded which include the image and other things. But those things are not dependent on servings right. So basically it is not correct to reload the entire view just for servings update. Instead it will be really better if we can simply update the servings and ingredients and not the other things. This is what we will see in next section.
