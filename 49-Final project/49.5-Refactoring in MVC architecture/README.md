## 49.5 Refactoring in MVC architecture

Before jumping straignt into refactoring lets see what MVC architecture is and what problem it solve.

MVC (i.e. Model-View-Controller) is a most popular and widely used architecture for modern application development. MVC architecture helps us to arrange our code in more structured way and organize it better. Well organized code is always easy to maintain and expand futher in case of any new requirements. MVC architecture suggest three different components Model, View and Controller.

Starting with the View, it is the presentation module of the application using which user interact with the application and data or result of user's actions are presented to the user.

Model is the place where actual business logic is performed. It might need the data from DB of from other third party APIs hence all the database related calls and other http calls comes under model.

The third part is the controller which has the application logic, means what business logic should be executed when user perform a specific action on UI or view is decided at the controller module. So controller is a kind of bridge between view and model. It listen to the request from user, decide what actions need to be performed on occurance of that event and call that specific action. Then it receives the data response from Model and give it to view to present to the user.

Have a look at below diagram to understand the flow of request in MVC architecture.

![MVC architecture (49-Final project/49.5-Refactoring in MVC architecture/Notes images/MVC architecture.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.5-Refactoring%20in%20MVC%20architecture/Notes%20images/MVC%20architecture.png)

From above diagram we can see that, with the help of View user triggers some event on which is handled by controller. Then based on the event triggered the business logic in Model is called and the what all data is required for that request to processed is fetch by the Model and final output is given back to the controller. Now controller calls View to present the output to the user.

So from above we can clearly see that View and Model are completly isolated from each other and Controller is the one who controlls the communication between View and Model. So the So the applicatio loggic i.e. on specific event what operations to be performed is handled at controller level. Then how those operations should be performed is handled at Model leyar. So application logic and business logic are separated using MVC architecture, which helps in better organization of code.

Now let's Implement this above architecture in out code. If you see in our code we already have controller.js in src/js folder. This same file we will be using for the controller. For model and view we have to create the files.

We have a model.js for the business logic code which will mainly contain the fetch requests to APIs and other logical stuff. The controller.js will listen to all the events getting triggered in UI and call the model and view layers accordingly. Then we have a view folder in which we have recipeView.js to load the recipe (we will have individual file for each view because most of the time views have long code and it gets difficult to have all of them in a single file. Also in most of the places we will be needing parentElement for theview, we will need to get the data from the controller to render on screen, we will have to clear the existing content inside the view, so this is a perffect place where we can use OOP and create inheritance of classes where common functionality will be in parent class while child will extend the parent view class.)

Now as we know that model contain the main business logic so we can move the code to do the API call and fetch the recipe to model and that is what we did in below code.

```javascript
export const state = { recipe: {} };

export const loadRecipe = async function (recipeId) {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );
    const jsonResponse = await response.json();

    if (!response.ok) throw new Error(`${jsonResponse.message}`);

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
    alert(e);
  }
};
```

Here we exported method loadRecipe which will accept the recipe id and fetch the data for that recipe, then create a object of recipe and save it in a state object which we will use further in subsiquent sections. We will be needing this recipe details to render on UI using View hence we exported the state object as well.

Now in controller under the showRecipe() callback function which will be triggered on load event or hashchange event we are calling the above loadRecipe() method and passing the recipeId to fetch the recipe. As loadRecipe() is a async method and untill loadRecipe() is not completly executed the state object will not have the recipe details hence we will have to use await while calling loadRecipe() in controller.

```javascript
import * as model from "./model.js";
import recipeView from "./view/recipeView.js";

const recipeContainer = document.querySelector(".recipe");

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
    alert(e);
  }
};

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
```

Now in above code getting the recipeId from url is not something which comes under the business logic it is kind of application logic (because based on do we have a recipeId or not we have to either fetch the recipe and meanwhile it is fetching we have to display the loader or we have to keep the default message on UI) hence we are having it in controller itself.

Now if recipeId is present and we are fetching the recipe details using model then during that time we want to display the loader which is a View component, hence we have created a method displayLoader in view which displays the loader in recipeContainer. Have a look at below code from recipeView.js.

```javascript
class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;

  displayLoader = function () {
    const loader = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;

    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", loader);
  };

  #clear() {
    this.#parentElement.innerHTML = "";
  }
}
export default new RecipeView();
```

Now here we have created private variables #parentElement and #data where parentElement will store the view element for this class (recipe container in above case) and #data will store the data object which we have to render to the UI (reciper object in above case).

Now we have a privae #clear method() to clear the initial content of the parent element. We have created this as a separate method because we will have to clear the previous content at multiple places before loading the new content hence it is better to have a method for this and as this will happen within the class hence we have created it as a private method.

displayLoader() is a public method but we are not exporting it as we have a default export which is returning/exporting a new object of this view class and by using that object we will be able to call all public methods. This is what we did at line `recipeView.displayLoader(recipeContainer);` i.e imported the default export as recipeView which will give us a new object of RecipeView class and using that we called displayLoader().

Once the recipe is loaded by the Model and recipe objectc is available in state object now we have to display that recipe to UI so again we will have to send that recipe object to View to render the recipe. So we used the exported state object and got the recipe from there and sent it to another public method in recipeView, which is 'render()'.

The code for render is like below.

```javascript
import icons from "url:../../img/icons.svg";

class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;

  render(data) {
    this.#data = data;
    const htmlMarkup = this.#generateHtmlMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }

  displayLoader = function () {
    const loader = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;

    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", loader);
  };

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  #generateHtmlMarkup() {
    return `<figure class="recipe__fig">
    <img src="${this.#data.image}" alt="${
      this.#data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this.#data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this.#data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this.#data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${this.#data.ingredients
      .map((ingredient) => {
        return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ingredient.quantity}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>`;
      })
      .join("")}

    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this.#data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this.#data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
}

export default new RecipeView();
```

Here in render method, first thing we did is to initialize the private #data object with the data of recipe i.e. recipe object received as method argument. Then we called a private #generateHtmlMarkup() method which generates the htmlMockup string using the data received and return that string. Now we just have to insert this html markup at correct place to display it on UI. Before inserting this recipe data we have to remove the initially added loader hence we first called #clear() method and then inserted the htmlMarkup in the parent element.

```javascript
 render(data) {
    this.#data = data;
    const htmlMarkup = this.#generateHtmlMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }
```

After all the above refactoring if you look at the code it is properly formatted, controller is only listning to the events and based on the events deligating the calls and data to appropriate modules. Model is dedicatedly working to fetch the data from API and format the data (i.e. create the data object). And view is dedicatedly working on the portion of presenting the things to user.

If we observe the ingredisnts list then we can see 0.5 cup.. or 0.25 cup of ..., which is not clear, instead 1/2 cup of... or 1/4 cup of... will be much better.

This transformation of decimal to fraction can be done using a third party library called '[fracty](https://www.npmjs.com/package/fracty)' to install this llibrary we have to run below command in project folder.

```
npm install fracty
```

Once this is installed you will see an entry of fracty in your package.json file under dependency section like below.

```json
{
  "name": "49.5-refactoring-in-mvc-architecture",
  "version": "1.0.0",
  "description": "Recipe book",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  },
  "author": "Akhil Selukar",
  "license": "ISC",
  "devDependencies": {
    "@parcel/transformer-sass": "^2.12.0",
    "parcel": "^2.12.0"
  },
  "dependencies": {
    "fracty": "^1.0.11"
  }
}
```

Now as this converton and displaying fractions are related to presentation/view hence we will import this library in View and use it there.

```javascript
import icons from "url:../../img/icons.svg";
import fracty from "fracty/fracty";

class RecipeView {
  #parentElement = document.querySelector(".recipe");
  #data;

  render(data) {
    this.#data = data;
    const htmlMarkup = this.#generateHtmlMarkup();
    this.#clear();
   .
   .
   .
   .
    ${this.#data.ingredients
      .map((ingredient) => {
        return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${fracty(
        ingredient.quantity
      ).toString()}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>`;
      })
      .join("")}

   .
   .
   .
```

After this the quantity of ingredients will be displayed like 1/2 or 1/4.
