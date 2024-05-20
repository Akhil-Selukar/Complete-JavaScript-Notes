import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import resultsView from "./view/resultsView.js";
import searchView from "./view/searchView.js";

const showRecipe = async function () {
  try {
    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;
    recipeView.displayLoader();

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
    resultsView.render(model.state.search.results);
  } catch (e) {
    console.error(`==>> ${e}`);
  }
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerSearch(searchRecipe);
};

init();
