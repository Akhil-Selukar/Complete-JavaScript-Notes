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
    state.search.page = 1;
    // console.log(state.search.results);
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getSearchResultsPage = function (pageNumber = state.search.page) {
  state.search.page = pageNumber;
  const start = (pageNumber - 1) * state.search.resultsPerPage;
  const end = pageNumber * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // calculate new quentity for ingredients in state object.
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // update the number of servings in state object
  state.recipe.servings = newServings;
};

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
