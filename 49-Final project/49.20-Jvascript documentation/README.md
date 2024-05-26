## 49.20 Javascript docmentation

From last couple of sections we can see that a simple small project can have a lot of files and methods in them and it is very likely that we can forget what exactly a specific piece of code does. Or if multiple people are working on a project then it is very difficult to understand which developer created which method and for what. So in this case it is very important to use javascript documentation. Till now we have used comments but javascript documentation is much better and used by everyone.

To add javascript documentation comment we have to add a multiline comment above the method for which we want to create the documentation. The multiline comment should start with /\*\* (i.e. two stars after /.). Have a look at below documentation comment

view.js

```javascript
import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  /**
   * Render the recieved object to DOM in respective view.
   * @param {Object | Object[]} data the data to be rendered in DOM (e.g. recipe)
   * @param {Boolean} {render=true} If true then render the data else generate more markup.
   * @returns {undefined | String}
   * @this {Object} View instance
   * @author Akhil Selukar
   * @todo nothing
   * @throws display error message in parent element
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      // console.error(`Error ${data}`);
      return this.displayError();
    }

    this._data = data;
    const htmlMarkup = this._generateHtmlMarkup();

    if (!render) return htmlMarkup;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", htmlMarkup);
  }
.
.
.
```
