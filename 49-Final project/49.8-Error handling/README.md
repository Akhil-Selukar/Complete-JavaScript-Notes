## 49.8 - Error handling

Till now in our project in any error scenario what we are doing is, we are just printing that error in console and displaying a popup for user. But in UI if you observe the loader keep on rotating forever after the error popup is closed. In actual real world applications this is not how we are supposed to handle the error. We must show some message on UI screen itself instead of popup so that user can act accordingly further. This error handling is what we will be implementing in this section.

Now as we want to display the error on UI so this rendering of error must happen through view hence we have added below method in recipeVieo.js

```javascript
displayError(errorMessage) {
    const errorMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>
      `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
  }
```

This is a very simple method which create the markup for error using the message received as argument and clear what all content is there in the parent element and add the error message markup to the html page in parent element.

So we have handled the error at view but we need to instruct that in case of any error in the code we have to call this method in recipeView.js. Now the error can occure at model where we are fetching the data or error can occure at helper function or anoy other function for that matter but the communication with view is done via controller so we must transfer/delligate the error to controller irrespective of where we that error is originated. Doing this is very easy, we have already did that in helper function by rethrowing the error. Similarly we will have to rethrow the error from model so that it can be handled at controller (because controller will be the one to call model hence model will give response to controller only and not directly to the view.)

```javascript
import { API_URL } from "./config";
import { getJSON } from "./helper";

export const state = { recipe: {} };

export const loadRecipe = async function (recipeId) {
  try {
    const jsonResponse = await getJSON(`${API_URL}/${recipeId}`);
    const { recipe } = jsonResponse.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (e) {
    throw e;
  }
};
```

Here in above code of model we can see that we are rethrowing the error in catch block, so the error will transfered to the controller. Now to handle this error in caontroller we can simply call the public 'displayError()' method of recipeView from catch block of controller like below.

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
    // console.error(`error ==>> ${e}`);
    recipeView.displayError(e);
  }
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
};

init();
```

After implementing above code we will get below king of error message on UI, instead of the popup and logging the error in console.

![Error handling message screenshot (49-Final project/49.8-Error handling/notes images/Error handling.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.8-Error%20handling/notes%20images/Error%20handling.png)

Here the message is not really clear to user, It must be something which is easily understandable. So we can pass the message from controller catch block while calling the method for displaying the error, but controller can call different views so it is better to have the message in view itself. Hence we have added a default message to the view and call the displayError() without any message.

So the code will be like below

recipeView.js

```javascript
import icons from "url:../../img/icons.svg";
import fracty from "fracty/fracty";

class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;
  #errorMessage =
    "The recipe you are looking for is not found, please try another one!";

  render(data) {
    this.#data = data;
    const htmlMarkup = this.#generateHtmlMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }

  displayLoader() {
    const loader = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;

    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", loader);
  }

  displayError(errorMessage = this.#errorMessage) {
    const errorMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>
      `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
  }

  .
  .
  .
  .
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
    recipeView.displayError();
  }
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
};

init();
```

Now in this case the error message will be like below.

![Error message corrected (49-Final project/49.8-Error handling/notes images/Error handling message.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.8-Error%20handling/notes%20images/Error%20handling%20message.png)

In simlar fashion we will implement success message display as well even though we are not using it as of now. (but concept is exactly same so better to implement now.)

recipeView.js

```javascript
  displaySuccess(successMessage = this.#successMessage) {
    const successMarkup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${successMessage}</p>
      </div>
      `;
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", successMarkup);
  }
```
