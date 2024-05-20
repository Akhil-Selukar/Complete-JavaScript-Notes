import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.displayError();

    this._data = data;
    const htmlMarkup = this._generateHtmlMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }

  displayLoader() {
    const loader = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", loader);
  }

  displayError(errorMessage = this._errorMessage) {
    const errorMarkup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errorMessage}</p>
          </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", errorMarkup);
  }

  displaySuccess(successMessage = this._successMessage) {
    const successMarkup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${successMessage}</p>
          </div>
          `;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", successMarkup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }
}
