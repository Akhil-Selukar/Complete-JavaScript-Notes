import View from "./view";
import previewView from "./previewView";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage = "Unable to find any recipe, please try again!";
  _successMessage = "";

  _generateHtmlMarkup() {
    return this._data
      .map((bookmark) => previewView.render(bookmark, false))
      .join("");
  }
}

export default new ResultView();
