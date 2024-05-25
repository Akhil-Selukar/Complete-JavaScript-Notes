## 49.14 Highlighting the selected recipe

Till now as pwe current progress of the application after searching for any recipe we are getting the recipes listed in left side panel and we can click on any of the recipe and that recipe will be displayed in the right side recipeView. But after that there is no such indecation which will distinguish the selected recipe from other list in left side panel. Hence we will be implemeting the feature for highlighting the selected recipe in left side panel.

To implement thsi we will have to add the class 'preview\_\_link--active' for the recipe which is selected. This need to be done when we are generating the markup. If the id for which we are generating the markup is same as that of id in the url then we should add this class in the markup. This is what we will be implementing in here.

resultView.js

```javascript
import View from "./view";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Unable to find any recipe, please try again!";
  _successMessage = "";

  _generateHtmlMarkup() {
    // console.log(this._data);

    return this._data.map(this._markupPreview).join("");
  }

  _markupPreview(results) {
    const urlId = window.location.hash.slice(1);

    return `<li class="preview">
        <a class="preview__link ${
          results.id === urlId ? "preview__link--active" : ""
        }" href="#${results.id}">
        <figure class="preview__fig">
            <img src="${results.image}" alt="${results.title}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${results.title}</h4>
            <p class="preview__publisher">${results.publisher}</p>
        </div>
        </a>
  </li>`;
  }
}

export default new ResultView();
```

But here doing just this is not enought because whenever we select any recipe from side panel we are refreshing the recipeView but not the side panel so the 'preview\_\_link--active' class will not be added to the newly selected recipe and removed from the old selected recipe. Hence we will have to refresh this side panel as well when we select any recipe. This can be done in two ways those are using render() method and re-rendering the whole side panel again, and the second way is to use the update() method and just update the changed element.

If we use render then again it will render the entire list againa and it will cause that flickering effect. Hence we will use the update method instead of render in controller, whenever we are rendering the recipe view.

controller.js

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

This is why we have added the update method in parent class view.js, because we can now reuse it from any child view.
