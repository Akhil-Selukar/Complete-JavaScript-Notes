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
    console.log(e);
    alert(e);
  }
};

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
