## 49.19 Add new recipe (Finetuning)

In last section we have implemented the addition of new recipe functionality to the application, and it is working as well. Still there are some issues which need to be fixed. For example, whenever we add a new recipe, the bookmarks list is not getting updated even though the newly added recipe is added as a bookmarked by default. The id in url of the page and the recipe which is getting displayed are not correct hence on refresh the recipe changes, on click of submit button, until we get success response, the loader should be displayed but it keep on showing the form itself.

So in this section we are going to resolve all this small issues and finetune the application.

Many of the above things are very simple, have a look at below code.

controller.js

```javascript
.
.
.
const controllAddRecipe = async function (newRecipeObj) {
  // console.log(newRecipeObj);

  try {
    // display loader
    addRecipeView.displayLoader();

    // Send the object to model and store it.
    await model.uploadRecipe(newRecipeObj);

    // render the new recipe
    recipeView.render(model.state.recipe);

    // display success message
    addRecipeView.displaySuccess();

    // render new bookmarkView
    bookmarkView.render(model.state.bookmarks);

    // update the url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);

    // close the form
    setTimeout(function () {
      addRecipeView.toggleHiddenClass();
    }, MODEL_CLOSE_WAIT_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.displayError(err.message);
  }
};
.
.
.
```

Here we have called `addRecipeView.displayLoader();` before the uploadRecipe call to model. So after clicking on submit till the uploadRecipe() is running and we are awaiting for the response the loader will be displayed. Then for updating url we can use 'history' property of window. This has a method called pushState which allow us to change the url without reloading the page. pushState() method takes three arguments, where first and second arguments are state and title respectively which does not matter to us, but the third argument is the url so here we can specify the # symbol and id which we want to append to the host url. so the line `window.history.pushState(null, "", `#${model.state.recipe.id}`);` will take care of updating the url in browser window.

Next problem that we had was the bookmark list was not getting updated with the newly added recipe. So this can be fixed by re-rendering the bookmarks list. (Here we can not update the list because we want to add a whole new element and not update the existing element.)

Now after doing this the addition of recipe code is free from all the issues. Now we can refactor helper class to finetune our code. If we observe the helper class, both getJSON and sendJSON methods are mostly same. Just that the request is added with the options in case of sendJSON. So we can create a single method for this and use a ternary operator to decide if optional argument is required or not (i.e. request is post of get) like below.

helper.js

```javascript
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const callAPI = async function (url, uploadData = undefined) {
  try {
    const request = uploadData
      ? fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const response = await Promise.race([request, timeout(TIMEOUT_SEC)]);
    const jsonResponse = await response.json();
    if (!response.ok) throw new Error(`${jsonResponse.message}`);
    return jsonResponse;
  } catch (e) {
    throw e;
  }
};
```

After removing getJSON and sendJSON methods we will have to replace all getJSON and sendJSON calls from controller with callAPI().
This will not change any of the functionality but make the code more clean.

Now the last thing which is pending is to mark the recipe added by user as users personal recipe and show a small user symbol on the recipe beside bookmark button. But for this we must get the recipes added by user as well in search result. Then only we will be able to display it as user's personal recipe on search result view. To get this we have to pass the unique key for user (which we have generated in last section) with the fetch url,

model.js

```javascript
import { API_URL, RESULT_PER_PAGE, KEY } from "./config";
import { callAPI } from "./helper";
.
.
.
export const loadRecipe = async function (recipeId) {
  try {
    const jsonResponse = await callAPI(`${API_URL}${recipeId}?key=${KEY}`);
    const { recipe } = jsonResponse.data;

    state.recipe = createRecipeObject(recipe);
    // console.log(state.recipe);

  .
  .
  .

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const searchResult = await callAPI(`${API_URL}?search=${query}&key=${KEY}`);
    // console.log(searchResult);

    state.search.results = searchResult.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
.
.
.
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingredientsArray = ing[1].split(",");

        if (ingredientsArray.length != 3)
          throw new Error(
            "Ingredients are not entered in proper format, Please follow the format quantity,unit,ingredient Name"
          );

        const [quantity, unit, description] = ingredientsArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipeObj = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // console.log(recipe);
    const resonseRecipe = await callAPI(`${API_URL}?key=${KEY}`, recipeObj);
    const { recipe } = resonseRecipe.data;
    state.recipe = createRecipeObject(recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
.
.
.
```

And now to render the small user icon we need to add/remove the hidden class based on if the recipe has the key or not. Because all user defined recipes will have the unique key and other recipes will not have that key. So again here we can use ternary operator to implement this.

previewView.js

```javascript
import View from "./view";
import icons from "url:../../img/icons.svg";

class PreviewView extends View {
  _parentElement = "";

  _generateHtmlMarkup() {
    const urlId = window.location.hash.slice(1);

    return `<li class="preview">
        <a class="preview__link ${
          this._data.id === urlId ? "preview__link--active" : ""
        }" href="#${this._data.id}">
        <figure class="preview__fig">
            <img src="${this._data.image}" alt="${this._data.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="preview__publisher">${this._data.publisher}</p>
            <div class="preview__user-generated ${
              this._data.key ? "" : "hidden"
            }">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
        </div>
        </a>
  </li>`;
  }
}

export default new PreviewView();
```

So here we in \_generateHtmlMarkup() method at line `<div class="preview__user-generated ${this._data.key ? "" : "hidden"}">` we are checking if the data object has key or not if it has the key then that means this recipe is user's personal recipe and we want to show the little user icon beside it so we are not adding the hidden class, but if the key is not present then we dont want to show the user icon and hence we are adding the 'hidden' class there.

Same we have implemented in recipeView as well.

recipeView.js

```javascript
.
.
.
<div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
  <svg>
    <use href="${icons}#icon-user"></use>
  </svg>
</div>
.
.
.
```

Below is how the final UI will look like for user's personal recipes.

![Final user persional recipe (49-Final project/49.19-Add new recipe (Finetuning)/notes images/User personal recipe.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.19-Add%20new%20recipe%20(Finetuning)/notes%20images/User%20personal%20recipe.png>)
