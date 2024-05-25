## 49.15 Implementing the bookmarks

In this section we will be implementting the functionality to add the bookmarks. Now what this functionality should do is, as soon as the bookmark button for the displayed recipe is clicked it should change the bookmarked button to filled one. Then it must store that recipe somewhere (in state object ofr us) so that if we switch to some other recipe and came back to the bookmarked one it must display the bookmarked recipe.

So mainly we will have to update the state object so we will have to start with model.

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
  bookmarks: [],
};

.
.
.

export const addBookmark = function (recipe) {
  // add recipe to the bookmarke array in state object.
  state.bookmarks.push(recipe);

  // ste bookmarked prperty on recipe object as true
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

```

In model we added an empty bookmark array in the state object. Then we have created a method which will update this array and add the recipe object to the bookmarked array. Also we need to display the bookmarked button as filled so we will need the information that if the recipe which we are rendering is bookmarked or not, hence we will have to track bookmarked recipe in recipe object as well. So we are adding a flag 'bookmarked' to the recipe object. If the receipe present in state object is same as that on the recipe for which bookmark button is clicked then we are adding the bookmarked flag as true in recipe object of state (because it is the state's recipe object which we are passing to render.)

Now bookmark button will be clicked from UI hence we will need a event listner which will listen for the click event on the bookmark and then call the respective controller. Now here it is not necessary that every time there will be some recipe loaded on the recipe view. Hence it is not necessary that the bookmark button will always be there, so we cannot directly add eventListner to the btn element and we will have to use the event delegation here as well.

recipeView.js

```javascript
.
.
.
  addHandlerForBookmark(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;

      handler();
    });
  }
  .
  .
  .
```

Here we are listning for the event click event on the parent element and then we are checking if the clicked element is bookmark button or not based on the class '.btn--bookmark'. If the clicked button is not bookmarked then btn will be undefined hence we are returning immediately. And if the clicked element is bookmark button then we are calling the handler function. So now next thing we will have to work on is the handler function or the controller for bookmark.

controller.js

```javascript
.
.
.
const controllBookmark = function () {
  model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerForBookmark(controllBookmark);
  searchView.addHandlerSearch(searchRecipe);
  paginationView.addHandlerClick(controlPagination);
};

init();
```

So here as soon as the bookmark button is clicked the controller will be called and in controller as of now we are just calling the model to update the bookmark details in state object and then we are just logging the recipe on console to check if the bookmarked flag is set or not.

If you run the application with above code, and then click on the bookmark button for any of the recipe then you will get a recipe object in console which will have bookmarked property set to true.

![bookmarked flag(49-Final project/49.15-Implementing the bookmark/notes images/bookmarked flag.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.15-Implementing%20the%20bookmark/notes%20images/bookmarked%20flag.png)

Now it is simple to render the filled bookmarked button. We can simply check this flag and if this flag is true then we can simply add the fill class to the bookmark button. This we can do using ternary operator in the \_generateHtmlMarkup() method of recipeView.js

```javascript
.
.
.
    <div class="recipe__user-generated">
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>
  .
  .
  .
```

Now to make this work we will have to reload the recipeView when the bookmark button is clicked. Again here instead of reloading the whole page we can simply update the attribute which is change and hence we will use the update method instead of render().

controller.js

```javascript
.
.
.
const controllBookmark = function () {
  model.addBookmark(model.state.recipe);
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};
.
.
.
```

After implementing this if we check the application then after clilcking on the bookmark button we will see that the button is getting filled. Now same we have to reverse as well, I mean when filled button is clicked then we will have to remove it from bookmark. We will work on this further but more important problem which we have to solve now is if we bookmark some recipe and then switch to some other recipe and then came back to the bookmarked one, the bookmark will be gone. This is because every time we are loading the recipe we are loading if from scratch and we are making the fetch request. Hence the bookmarked flag will not be retained for that recipe. So here we need the bookmarks array from the state object, if the recipe is there in bookmarked array then we will mark the recipe as bookmarked = true.

So to implement this check we will have to go to the model class where we are loading the recipe based on id.

```javascript
.
.
.
export const loadRecipe = async function (recipeId) {
  try {
    const jsonResponse = await getJSON(`${API_URL}${recipeId}`);
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
    // console.log(state.recipe);

    if (state.bookmarks.some((bookmark) => bookmark.id === recipeId)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};
.
.
.
```

Here we are checking that if any of the entry in bookmark array have id equal to the recipeId for which we have fetched the data, if it is true then that means fetched recipe was bookmarked previously and hence we are setting the bookmarked flag as true for it, else the bookmarked flag will be false.

(Now here there is another better way to implement this. As we are storing the recipe object in bookmarks array, so we can do this check before doing the fetch call and if the bookmarks array has entry with the id then we can get the recipe from the array itself ad no need to call the api using fetch call. This can reduce the API calls and improve the performance. Where as it is important to note that instead of storing whole recipe object in bookmarks array we can store only id of the recipe and use above implementation to check for bookmarked recipe. By using this you will not have to store all the data about recipe because if number of bookmarked recipes are in large number then it will not be good in terms of memory utilizaton. As of now we are string the whole recipe object in bookmarks array because we will be using it further to display list of bookmarked recipes.)

Now after implementing the above code if you check, you will see that even after switching to different recipe and then comming back to the bookmarked recipe it will still be bookmarked. Now let's work on the other problem of removing the bookmark.

For removing the bookmark we will need another method which will remove the recipe form the bookmarks array in state object.

model.js

```javascript
.
.
.
export const removeBookmark = function (id) {
  // remove recipe form bookmarks array
  const index = state.bookmarks.findIndex((element) => element.id === id);
  state.bookmarks.splice(index, 1);

  // set bookmarked prperty on recipe object as false
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
};
```

Here we are getting the id of recipe which need to be removed from bookmarks. Now to remove the specific element from an array we need the index of that element. Hence by using the findIndex method we are finding the index of the element with id equal to given id and the by using the splice method on array we are removing the element at that index.

Now we have to call this method. But the calling part is only one i.e. the bookmark button is only one and same is used for both the purposes so we have to implement the toggle logic somewhere. Now based on the inputs and current state which methods to execute is decided by the controller hence this logic must go to controller.

controller.js

```javascript
.
.
.
const controllBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }
  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};
.
.
.
```

Here we are simply checking if bookmarked is already true then remove recipe from bookmarks and if it is false then add the recipe in bookmarks.

After this implementation the bookmark button will be fully functional. Then next thing we need to impllement is to display all the bookmarked recipes in the bookmarks section which is there in upper right corner of UI. On hover that list should display all the recipes bookmarked by user.

Now in thsi top right corner list we want to display the list of recipes which are bookmarked by the user. That means we want to modify the UI hence we will need a view for this (bookmarkView.js). This view is very similar to that of the resultsView.js. The next thing is we need to call this bookmark view from controller.

controller.js

```javascript
.
.
.
const controllBookmark = function () {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  // Update the UI
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};
.
.
.
```

Now at this point you will see the bookmarked list is working. But there is a bug in the bookmark list it is not highlighting the correct recipe which is displayed on recipeView. This is because when we are rendering teh recipe view for any recipe we are not updting the bookmark view. Hence bookmark view is not aware about the change in recipeView. This can be fixed by simply updating the bookmarkView on rendering of the recipe.

```javascript
.
.
.

const showRecipe = async function () {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;
    recipeView.displayLoader();

    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);

    // Loading the data from third party API
    await model.loadRecipe(recipeId);

    // Rendering recipe to UI
    recipeView.render(model.state.recipe);
  } catch (e) {
    // console.error(`error ==>> ${e}`);
    recipeView.displayError();
  }
};

.
.
.
```

Now it will work perfectly.

At this point bookmark feature is kind of completed, so next part is completly optional. But still if you closely observe the code, bookmarkView.js and resultsView.js both the files are almost same except the parent element and error message. Even the htmlMarkup that they are generating is also exactly same. So it is not a good practice to repeat the same code again and again. So what we can do is we can create a child class i.e. previewView.js to the bookmarkView and resultsView which will have methods that are common for both bookmarkView and resultsView.

So previewView.js will have the '\_markupPreview()' method which is common for both the views and now the bookmarkView and resultView will use this \_markupPreview() method instead of their own. Have a look at the code to understand this in better way.
