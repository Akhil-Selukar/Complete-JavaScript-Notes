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
    return `<li class="preview">
        <a class="preview__link preview__link--active" href="#${results.id}">
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
