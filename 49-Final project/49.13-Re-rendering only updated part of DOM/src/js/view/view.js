import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.error(`Error ${data}`);
      return this.displayError();
    }

    this._data = data;
    const htmlMarkup = this._generateHtmlMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }

  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.error(`Error ${data}`);
      return this.displayError();
    }

    this._data = data;
    const updateHtmlMarkup = this._generateHtmlMarkup();

    const updatedDOM = document
      .createRange()
      .createContextualFragment(updateHtmlMarkup);
    const newDomElements = Array.from(updatedDOM.querySelectorAll("*"));
    const oldDomElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    newDomElements.forEach((newEle, i) => {
      const oldEle = oldDomElements[i];

      // console.log(oldEle, newEle.isEqualNode(oldEle));
      if (
        !newEle.isEqualNode(oldEle) &&
        newEle.firstChild?.nodeValue.trim() !== ""
      ) {
        oldEle.textContent = newEle.textContent;
      }

      if (!newEle.isEqualNode(oldEle)) {
        Array.from(newEle.attributes).forEach((attr) => {
          oldEle.setAttribute(attr.name, attr.value);
        });
      }
    });
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
