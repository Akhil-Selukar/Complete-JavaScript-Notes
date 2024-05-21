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
    console.log(state.recipe);
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
