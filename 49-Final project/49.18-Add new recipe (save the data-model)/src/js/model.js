import { API_URL, RESULT_PER_PAGE, KEY } from "./config";
import { getJSON, sendJSON } from "./helper";

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

const createRecipeObject = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (recipeId) {
  try {
    const jsonResponse = await getJSON(`${API_URL}${recipeId}`);
    const { recipe } = jsonResponse.data;

    state.recipe = createRecipeObject(recipe);
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
    const resonseRecipe = await sendJSON(`${API_URL}?key=${KEY}`, recipeObj);
    const { recipe } = resonseRecipe.data;
    state.recipe = createRecipeObject(recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

const init = function () {
  const storedData = localStorage.getItem("bookmarks");

  if (storedData) state.bookmarks = JSON.parse(storedData);
};
init();
