## 49.11 Implementation of Pagination

In last section we fetched the recipes based on search string and then listed those recipes on left hand side panel. But as we saw that for pizza there were 59 recipes and all those recipes were displayed on the page. This is not what we want, we want specific number of recipes to show in a screen, next will be under next page and so on. So here we we will see how we can implement this pagination feature.

Now to implement this we dont need any fetch API call as we already have all the search result in state variable. But what we have to do is we have to send only specific records to the render function at start, then for nexxt page we want to send next few records and so on. So basically based on on which page we are we want to slice down the results array. This is a business logic that we have to implement hence we should implement this in model.js.

As we already have the data then based on page number and number of records to show per page we can simply slice the results array hence we have added a method to calculate starting point and end point of sliced array and then return the sliced array.

model.js

```javascript
export const getSearchResultsPage = function (pageNumber) {
  const start = (pageNumber - 1) * state.search.resultsPerPage;
  const end = pageNumber * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
```

Here resultsPerPage is the number of results we want to display per page, thsi we are reading from config file and storing in state variable, and page number is the input to the function.

Now from controller instead of passing complete data to render() function we can call above method to get limited data and send that data to render() so that only limited number of recipes will be displayed.

controller.js

```javascript
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
    resultsView.render(model.getSearchResultsPage(1));
  } catch (e) {
    resultsView.displayError();
  }
};
```

Here we are passig page number as hardcoded 1, so only first 10 records will be displayed. (further in this section only we will get the page number from UI)

After above code implementation we will be able to see only 10 records in left hand side panel of UI scree.

In UI now we want to display the user that on which page he or she is and what is the next and previous page number will be. For that our code must be aware of the current page number, then only we can calculate previous and next page. Hence it is important for us to store the page number as well somewhere. We are keeping all the data related to the active session in the state object hence we can store the pageNumber as well in state object.

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
};

.
.
.

export const getSearchResultsPage = function (pageNumber = state.search.page) {
  state.search.page = pageNumber;
  const start = (pageNumber - 1) * state.search.resultsPerPage;
  const end = pageNumber * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
```

In above code we have added the page in state object and assigned the default value as 1. Also the pageNumber in the getSearchResultPage function is defaulted to this initial value from state object. Inside the function we are modifing the page variable in state object based on the current page number.

Now till now we worked on the logic to get specific set of recipes based on page number. But now the most tricky part is to implement pagination in UI and get the proper page number.

Now we can have many UI scenarios with respect to pagination like

1. If we are on first page we should not display button/option to go to previous page.
2. If we are at last page we should not display button/option to go bact to next page.
3. If search results are less than the number of records per page then both buttons should not be displayed
4. If we are neither at first page nor at last page then both the buttons must be displayed.

This is kind of a separate functionality in itself which only deals with the pagination buttons and current page number. So we can create a separate view for this (paginationView.js).

As per above discussion we know that we have 4 different scvenarios, and to identify on which scenario we are right now we will need few details that is total number of records, current page number and records per page. All this information is present in the search object which is a part of state object, hence we will be needing the search object in this view. So the \_date for this view will be search object. Hence we are sending the complete search object to the render method of paginationView to render the pagination based on one of the scenario above.

controller.js

```javascript
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
    resultsView.render(model.getSearchResultsPage(1));

    // render initial pagination
    paginationView.render(model.state.search);
  } catch (e) {
    resultsView.displayError();
  }
};
```

Now to decide which scenario to executer it is very important that we know on which page we are right now an total how many pages are there. So the current page we can easily get from state object and the number of pages we can calculate based on total number of records we have and the records per page.

```javascript
const numberOfPages = Math.ceil(
  this._data.results.length / this._data.resultsPerPage
);
```

Now we have all the details so we can identify the scenario out of the 4 mentioned earlier.

paginationView.js

```javascript
import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginatiionView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateHtmlMarkup() {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and has other pages
    if (this._data.page === 1 && numberOfPages > 1) {
      return `page 1 + other pages`;
    }

    // last page
    if (this._data.page === numberOfPages && numberOfPages > 1) {
      return `last page`;
    }

    // middle page
    if (this._data.page < numberOfPages) {
      return `Other page`;
    }

    // page 1 and no other pages
    return `only 1 page`;
  }
}

export default new PaginatiionView();
```

In above code we have all the cases now we have to generate the html markup for displaying the respective buttons and on click of those buttons we have to update the state object with new page number.

The rendering button is now not that difficult, we can create the markups based on the scenarios like below.

paginationView.js

```javascript
import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginatiionView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateHtmlMarkup() {
    const currentPage = this._data.page;

    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and has other pages
    if (currentPage === 1 && numberOfPages > 1) {
      return `<button class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }

    // last page
    if (currentPage === numberOfPages && numberOfPages > 1) {
      return `<button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>`;
    }

    // middle page
    if (currentPage < numberOfPages) {
      return `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }

    // page 1 and no other pages
    return "";
  }
}

export default new PaginatiionView();
```

Now after above implementation we will be able to see the buttons to go forward or backward or in both the directions. But till now those buttons will not work because once we click on the button an event will be triggered and we will have to handle that event then only buttons will work.

To add the handlers this time as well we will use subscriber and publisher pattern. We have created 'addHandlerClick(handler)' method to attach the event handler to the buttons and listen to the events. This method will be called from a controller and in controller we have a handler which we are receiving as a argument to use as a callback function. But here we are not using handler directly as a callback function as before executing the callback function we have to identifu which button is clicked, is it forward button or backward button.

paginationView.js

```javascript
import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginatiionView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateHtmlMarkup() {
    .
    .
    .
export default new PaginatiionView();
```

controller.js

```javascript
.
.
.

const controlPagination = function (goToPage) {
  // Render the new search results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // render new pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerSearch(searchRecipe);
  paginationView.addHandlerClick(controlPagination);
};

init();

```
