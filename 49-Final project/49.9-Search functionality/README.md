## 49.9-Search functionality

In this section we will be implementing the functionality to search a recipe by passing the recipe name in search bar and the search results will be displayed in the left side panel on UI.

First of all to fetch the data we will have to do a fetch() call so this will be the best starting point for writing code for this functionality. Now all fetch call has to be in model hence we can write a async method which doea this fetch call for us based on the given search string, this method in model we can call from controller and send the output to view for rendering on UI.

model.js

```javascript
export const loadSearchResult = async function (query) {
  try {
    const searchResult = await getJSON(`${API_URL}?search=${query}`);
    console.log(searchResult);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

loadSearchResult("pizza");
```

Here we have simply created a async function which uses a helper method 'getJSON' which we implemented in one of the previous sections to fetch the data based on search string given. If we see the output in console of this code, you will see response object with around 59 reipes. So the fetching part is done, the next part is to transfer this data to controller we need to store this data in state object and before that we need to format the data as per our requirements.

```javascript
export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const searchResult = await getJSON(`${API_URL}?search=${query}`);
    // console.log(searchResult);

    state.search.results = searchResult.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    console.log(state.search.results);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

loadSearchResult("pizza");
```

Now we will get the data for all the 59 recipes for pizza in proper format i.e. array of objects. The next thing we need to do is to call this from controller. So first we will start with calling the model from controller with heardcoded search string 'poizza', after that we will get the search string form view and create a view for that.

controller.js

```javascript
const searchRecipe = async function () {
  try {
    await model.loadSearchResult("pizza");

    console.log(model.state.search.results);
  } catch (e) {
    console.error(`==>> ${e}`);
  }
};

searchRecipe();
```

Here as well the result will be exactly same as thet of the previous result, just that this time we have controller as well in place. The immediate next thing that need to be implemented is to get the search query form UI. We have a search bar in UI and there is a search button so as soon as the search button is clicked we need to read the string given in the search bar. So this complete thing is related to UI so this must go in views. Also the complete thing is related specifically to search bar in UI so we can create a view specifically for search bar (i.e. searchView.js).

searchView.js

```javascript
class SearchView {
  #parentElement = document.querySelector(".search");

  getQuery() {
    const query = this.#parentElement.querySelector(".search__field").value;
    this.#clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this.#parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  #clearInput() {
    this.#parentElement.querySelector(".search__field").value = "";
  }
}

export default new SearchView();
```

SearchView.js is also a class like recipeView.js. Here as well we have a parent element which is nothing but the search form element. Now we can read the search string from the search element and for that we have written a method getQuery(). This query is required at the controller hence we kept this method as public and we are calling this method in controller like below.

controller.js

```javascript
import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";

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
    recipeView.displayError();
  }
};

const searchRecipe = async function () {
  try {
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
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerSearch(searchRecipe);
};

init();
```

Also we need to listen to the submit event on search form hence just like load and hashchange events for load recipe we have attached the event listner for this search element using publisher subscriber pattern. Now as this search element is a form hence we have to prevent the defaults so we first did that and then call the handler function in 'addHandlerSearch()' method.
