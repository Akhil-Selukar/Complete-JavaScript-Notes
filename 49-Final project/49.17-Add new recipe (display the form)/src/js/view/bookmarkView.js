import View from "./view";
import previewView from "./previewView";

class ResultView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarked recipe!";
  _successMessage = "";

  addHandlerRendre(handler) {
    window.addEventListener("load", handler);
  }

  _generateHtmlMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new ResultView();
