## 49.16 Using local storage for bookmarks

In last section we have implemented the bookmark functionality and it is working as expected. But as soon as we refresh the page or as soon as we restart the application all the bookmarks gets removed. This is because we are not storing the bookmarked information anywhere. As we are not using any database here so we will use local storage to store this information so that the bookmarks will remain as it is even after the application is refreshed or restarted.

Now as this operation had to do with data i.e. storing and retriving the data from local storage the code will go to the model.js.
As soon as use add new recipe to the bookmark we must add it in local storage as well, similarly as soon as any recipe is removed from the bookmark then same should be removed from the local storage as well. In simple words we have to refresh the local storage in both the cases i.e. addition and removal of recipe from the bookmarks. So we can write a simple function which will update the bookmarks data into local storage and call that function from addBookmark() and removeBookmark() method in model.js.

model.js

```javascript
.
.
.
export const addBookmark = function (recipe) {
  // add recipe to the bookmarke array in state object.
  state.bookmarks.push(recipe);

  // set bookmarked prperty on recipe object as true
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const removeBookmark = function (id) {
  // remove recipe form bookmarks array
  const index = state.bookmarks.findIndex((element) => element.id === id);
  state.bookmarks.splice(index, 1);

  // set bookmarked prperty on recipe object as false
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};
```

Here we have created a fuunction called persistBookmarks which just add the bookmarkes array into the locastorage with key 'bookmarks'. Then we have called this function from both the methods which are adding or removing the bookmarks.

After implementing the above code if we run the application and add some recipes to bookmark we will be able to see the recipes in local storage even after refresh or restart of the application just like shown in below screenshot.

![Bookmarks in local scorage(49-Final project/49.16-Using local storage for bookmarks/notes image/bookmarks in local storage.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.16-Using%20local%20storage%20for%20bookmarks/notes%20image/bookmarks%20in%20local%20storage.png)

But still, after refresh the bookmarks are not persisted in the UI even though it is there in the local storage. This is because we have just stored the bookmarks into the local storage but while rendering the recipes to UI we will have to check data from loacl storage as well and if any of the recipe which we are displaying in the UI is present in the local storage under bookmarks then we should display in the UI as well. This is what we will implement now.

The first thing that we will have to do is to get the data from local storage as soon as the application is loaded. This is again deals with data so will be under model.js and as we want this to happen as soon as the appication is loaded so we can add an init() method which will be called immediately. and under that init method we retrive the data from local storage just like below.

model.js

```javascript
.
.
.
export const addBookmark = function (recipe) {
  // add recipe to the bookmarke array in state object.
  state.bookmarks.push(recipe);

  // set bookmarked prperty on recipe object as true
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const removeBookmark = function (id) {
  // remove recipe form bookmarks array
  const index = state.bookmarks.findIndex((element) => element.id === id);
  state.bookmarks.splice(index, 1);

  // set bookmarked prperty on recipe object as false
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

const init = function () {
  const storedData = localStorage.getItem("bookmarks");

  if (storedData) state.bookmarks = JSON.parse(storedData);
};
init();
```

Here we are reading the data from local storage, now that data can be empty some times (when there is no bookmarked recipe) hence we are checking if the data is present or not, and if the data is present then we are converting that data strig back to object using JSON.parse() method and the storing it under the state variable, bookmarks array.

Now the next thing that we have to do is to render the bookmarks in the bookmarks list. That we can do in bookmarkView.js. This should happen as soon as we load the page, hence we will need a event listner which will listen for the load event and once the load event is triggered it should call a callback function which will render the bookmarks in bookmark list based on the data retrived from the local storage (which is now present in state object as well.)

bookmarkView.js

```javascript
import View from "./view";
import previewView from "./previewView";

class BookmarkView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarked recipe!";
  _successMessage = "";

  addHandlerRendre(handler) {
    window.addEventListener("load", handler);
  }

  _generateHtmlMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new BookmarkView();
```

Now we will have to create the handler function which will handle the load event and render all the bookmarks in bookmarks list.

controller.js

```javascript
.
.
.

const renderInitialBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const init = function () {
  bookmarkView.addHandlerRendre(renderInitialBookmarks);
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerForBookmark(controllBookmark);
  searchView.addHandlerSearch(searchRecipe);
  paginationView.addHandlerClick(controlPagination);
};

init();
```

Here the renderInitialBookmarks function renders the bookmarks to bookmarks list, and we are passing this function as callback function for eventHandler which is handling the load event on bookmarkView i.e. addHandlerRender().

So after this implementation the bookmarked recipies stored in the local storage will be loaded in UI as well even after refresh and rerun of the applicaton.
