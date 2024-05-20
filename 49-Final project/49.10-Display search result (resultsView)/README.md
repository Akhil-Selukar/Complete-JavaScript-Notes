## 49.10 Render search result in UI

In last lecture we were able to fetch the recipes based on search query, the next task is to display the result in left side panel. Now here to display the result we will be specifically working on left side panel so lets create a view 'resultsView.js' for displaying result in side panel.

Now here in side panel if no recipe is found then we want to display an error message saying "No recipe found!", In casse of recipes are found then we want to clear whatever was there in the side panel and display the recipe data, to display the data we will need to generate the mockup. So overall this view is very much similar to that of recipeView.js. Hence now this is why we created classes for the views, as most of the part is same we can create a parent View class and then extend results vire and recipeView (need to refactor) from it and use the inheritance.

```javascript
export default class View {}
```

Here we have exported the class itself and not its instance because we want to extend other classes from this class and not from any instance hence we will be needing this class itself.

> [!IMPORTANT] As of now with parcel and babel the inheritance etween trulyprivate fields does not work hence we will have to refactor all views to use protected fields instead of private fields. Hence we replaced # with \_ to make fields and methods restricted instead of private.

Now we can copy the common code (i.e. common for both recipe and result view and transfer it in the parent class i.e. view.js and extend the childs with parent class.)
Afte the refactoring the code will still work fine.

Now our new refactored views will look like below.

view.js

```javascript
import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data) {
    this._data = data;
    const htmlMarkup = this._generateHtmlMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }

  displayLoader() {
    const loader = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", loader);
  }

  displayError(errorMessage = this._errorMessage) {
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
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
  }

  displaySuccess(successMessage = this._successMessage) {
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
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", successMarkup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
```

recipeView.js

```javascript
import View from "./view.js";

import icons from "url:../../img/icons.svg";
import fracty from "fracty/fracty";

class RecipeView extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage =
    "The recipe you are looking for is not found, please try another one!";
  _successMessage = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }

  _generateHtmlMarkup() {
    return `<figure class="recipe__fig">
    <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

 .
 .
 .
 .     
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

searchView.js

```javascript
import View from "./view";

class SearchView extends View {
  _parentElement = document.querySelector(".search");

  getQuery() {
    const query = this._parentElement.querySelector(".search__field").value;
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  _clearInput() {
    this._parentElement.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
```

resultsView.js

```javascript
import View from "./view";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Unable to find any recipe, please try again!";
  _successMessage = "";
}

export default new ResultView();
```

Now let's work on results view further to create htmlMarkup and add the content in side panel. The first thing we want to do is to display loader while data is getting fetched after user click on search. So this is easy, as soon as user hit the search. we are calling the controller and that controller is basically responsible to implement all the application logic hence we can use the resultsView and instruct it to display the loader till the data is being fetched. Now even though the resultsView.js does not have method to display the loader but as it extends the class view, it will be able to access all the methods present in view.js. And displayLoader() is there in view hence we can call it directly without rewriting it in resultsView.js. This is how inheritance helps us to reuse same code at different places.

controller.js

```javascript
const searchRecipe = async function () {
  try {
    // display loader
    resultsView.displayLoader();
    // fetching search query
    const query = searchView.getQuery();
    if (!query) return;

    // fetching data
    await model.loadSearchResult(query);

    // rendering data
    console.log(model.state.search.results);
  } catch (e) {
    console.error(`==>> ${e}`);
  }
```

So now when you add some search query and then click on search the loader will appear in the side panel. Even though after the data is fetched successfully it will not display the actual data and keep loader only because this is what we have to implement next.

Now to display the result first we have to generate tthe htmlMarkup for the received recipes. The markup will be different for different views hence \_generateMarkup() can not be in parent view.js and we have to implement this method for resultsView.js like below.

Here one thing we must note that the data which need to be displayed is being passed from controller in method render(). This render method is in parent class which will set the \_data to given data and hence same data will be available in child calss as well.

Now this data is a array and we want to print all the array elements in proper format. Hence to generate the htmlMarkup we have to loop over the array but as we need the html markup for each element in the array we will use map() instead of forEach.

```javascript
import View from "./view";
import icons from "url:../../img/icons.svg";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Unable to find any recipe, please try again!";
  _successMessage = "";

  _generateHtmlMarkup() {
    // console.log(this._data);
    return this._data.map(this._markupPreview).join("");
  }

  _markupPreview(results) {
    return `<li class="preview">
        <a class="preview__link preview__link--active" href="#${results.id}">
        <figure class="preview__fig">
            <img src="${results.image}" alt="${results.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${results.title}</h4>
            <p class="preview__publisher">${results.publisher}</p>
        </div>
        </a>
  </li>`;
  }
}

export default new ResultView();
```

Here we have created a protected method '\_markupPreview(results)' which is callback function for 'this.\_data.map()'. This will generate an array with html markup for each entry in that array, and at the last we are joining all these array entries to create a single string.

After this implemetation we must see all the 59 results in left side panel (59 if we are searching for "pizza").

![search result for pizza (49-Final project/49.10-Display search result (resultsView)/notes images/search result for pizza.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.10-Display%20search%20result%20(resultsView)/notes%20images/search%20result%20for%20pizza.png>)

Now if we search some random value for which no recipe is available in that case ideally it should display error message but as of now in our application is simply does nothig. So we have to implement the error handling here.

If we look at the response of fetch call after we search for some random string. The response is still success only but the only difference is that this time the array will be empty. So while handling error actually we will have to handle the empty array (which means no recipe found for given search string).
This we can handle at the parent class, because all data will flow to the child views via parent class only so it is better we handle it at parent level itself and not let it pass to the child views.

view.js

```javascript
import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.displayError();

    this._data = data;
    const htmlMarkup = this._generateHtmlMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }

  displayLoader() {
    const loader = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
          .
          .
          .
          .
```

Here we can see that the we are checking if data is null or undefined the immediately terminate the execution with return statement and while terminating call 'displayError()'. But in our scenario of random search we will be having an empty array as data. So !data will not be true data is there just that it is empty. Hence we have added another or condition to check if data is array and its length is 0 or not, if yes the also it will call 'displayError()' function.

So finally the no search result will look like below.

![No search result (49-Final project/49.10-Display search result (resultsView)/notes images/no search result.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.10-Display%20search%20result%20(resultsView)/notes%20images/no%20search%20result.png>)
