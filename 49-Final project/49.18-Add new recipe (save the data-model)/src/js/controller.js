import * as model from "./model.js";
import { MODEL_CLOSE_WAIT_SEC } from "./config.js";
import paginationView from "./view/paginationView.js";
import recipeView from "./view/recipeView.js";
import resultsView from "./view/resultsView.js";
import searchView from "./view/searchView.js";
import bookmarkView from "./view/bookmarkView.js";
import addRecipeView from "./view/addRecipeView.js";

const showRecipe = async function () {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;
    recipeView.displayLoader();

    resultsView.update(model.getSearchResultsPage());

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
    // display loader
    resultsView.displayLoader();
    // fetching search query
    const query = searchView.getQuery();
    if (!query) return;

    // fetching data
    await model.loadSearchResult(query);

    // rendering data
    // console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // render initial pagination
    paginationView.render(model.state.search);
  } catch (e) {
    // console.error(`==>> ${e}`);
    resultsView.displayError();
  }
};

const controlPagination = function (goToPage) {
  // Render the new search results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (updateTo) {
  // update the servings data in state object
  model.updateServings(updateTo);

  // update the recipe view
  recipeView.update(model.state.recipe);
};

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

const renderInitialBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controllAddRecipe = async function (newRecipeObj) {
  // console.log(newRecipeObj);

  try {
    // Send the object to model and store it.
    await model.uploadRecipe(newRecipeObj);

    // render the new recipe
    recipeView.render(model.state.recipe);

    // display success message
    addRecipeView.displaySuccess();

    // close the form
    setTimeout(function () {
      addRecipeView.toggleHiddenClass();
    }, MODEL_CLOSE_WAIT_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.displayError(err.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRendre(renderInitialBookmarks);
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerForBookmark(controllBookmark);
  searchView.addHandlerSearch(searchRecipe);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controllAddRecipe);
};

init();
