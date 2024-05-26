## 49.17 Add new recipe (Display new recipe form)

Now the only part remaining about the application is to add a new recipe. In this feature user will be able to add a new recipe and that recipe will be available to the user only. It will have a special symbol on UI which will denote that the recipe is added by the user.

Now the first thing which we will need is the form to add new recipe. As soon as the user clicks on the 'Add Recipe' button a form should popup which will ask for details about the recipe. This is the part which we will implement for now. This part deals with the UI components and we will have to listen to the click event on the 'Add Recipe' button and then based on the click we need to display the form. So as of now mostly the work is in view and controller. for add recipe we will create a new view which is 'addRecipeView.js'

addRecipeView.js

```javascript
import View from "./view";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", function () {
      this._overlay.classList.toggle("hidden");
      this._window.classList.toggle("hidden");
    });
  }

  _generateHtmlMarkup() {}
}

export default new AddRecipeView();
```

Here we have selected all the elements which we will be needing in this view and then to show the add recipe form we are adding a event listner to \_btnOpen. This event listner will listen for the click event and as soon as the click event happens it will remove the hidde class from overlay and window so that form will appear on the screen. Now for this thing to work we dont need any controller as this is completly UI related. Also the 'Add recipe' button i.e. \_btnOpen will be there as soon as the application is loaded, means we can attach the event listner on load of the application. Hence we can use a constructor method here which will add the event listner to the button as soon as the application is loaded and object of this class is created.

addRecipeView.js

```javascript
import View from "./view";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", function () {
      this._overlay.classList.toggle("hidden");
      this._window.classList.toggle("hidden");
    });
  }

  _generateHtmlMarkup() {}
}

export default new AddRecipeView();
```

Now even though the controller do not have any thing to do till this point, but the event listner will be attached to the button only when the constructor is executed, and constructor will execute only when the new object oof this class is created when we load the application. And to create the new object of this class we will have to import this class in controller. So just import this view in controller and that will be fine.

Now after this if we run the application we should expect the form to be shown on screen when we click on the 'Add reipe' button but it will give an error. This is because we are using 'this' inside the callback bunction of the event handler hence the 'this' keyword in the callback function will be the button on which the element happened and we dont have \_overlay and \_window present in add recipe button, we want the this keyword to be the this keyword of the class. So for that we will have to bind the this keyword while calling \_overlay and \_window. Which we have done many times earlier like below.

addRecipeView.js

```javascript
import View from "./view";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
  }

  _toggleHiddenClass() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this._toggleHiddenClass.bind(this));
  }

  _generateHtmlMarkup() {}
}

export default new AddRecipeView();
```

Now after above implementation the form to add new recipe will be displayed on click on add recipe button. Now we have to close the form on click on close button or on click of anywhere outside the form (i.e. on overlay). So we can create another method to add event handler on close button and overlay which will gain toggle/add the hidden class to window and overlay.

addRecipeView.js

```javascript
import View from "./view";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _toggleHiddenClass() {
    this._overlay.classList.toggle("hidden");
    this._window.classList.toggle("hidden");
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener("click", this._toggleHiddenClass.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener(
      "click",
      this._toggleHiddenClass.bind(this)
    );
    this._overlay.addEventListener("click", this._toggleHiddenClass.bind(this));
  }

  _generateHtmlMarkup() {}
}

export default new AddRecipeView();
```

Now at this point the the form will appear on click of 'Add Recipe' button and it will disappear on click or close button or outside the form (i.e. on overlay)

The next thing which we want to do is, on click of upload button we want the data filled in the form to be submited to backend and we want to store that data. Now before storing the data we will have to extracct the data from form and create an object out of that data. So we will have to listen to the click event on upload button, then as soon as the button is clicked we will have to read the data from form and to store the data we will have to send that data to model. So integrattion of controller is must here. Let's start implementing this from the view.

addRecipeView.js

```javascript
import View from "./view";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {
  _parentElement = document.querySelector(".upload");
  _window = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");

  .
  .
  .
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);

      handler(data);
    });
  }

  _generateHtmlMarkup() {}
}

export default new AddRecipeView();

```

Here we can not attach the event listner on the actual upload button, because the button will not be there initially, it will appear once the form is displayed. And also there might be click on the button or press of 'enter' button to submit the form hence we have added the event listner to entire form. As we have to send the data to model so we have to integrate the view with controller hence we are taking argument as handler function which will be there in controller and we will be calling the handler function with form data.

Now to read form data we can select each and every element and read the value from it. But this not the best way, we can get all the data from form by using 'new FormData()' and passing the form instance into this. It will return an array of array which will have property name and value (i.e. form field and value against that field). But we want an object of all the details, so we can convert this array to an object using Object.fromEntries() method.

Now let's implement controller and at first just see if we are receiving the data or not.

controller.js

```javascript
.
.
.

const controllAddRecipe = function (newRecipeObj) {
  console.log(newRecipeObj);

  // Send the object to model and store it.
};

const init = function () {
  bookmarkView.addHandlerRendre(renderInitialBookmarks);
  recipeView.addHandlerRender(showRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerForBookmark(controllBookmark);
  searchView.addHandlerSearch(searchRecipe);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controllAddRecipe);
};

```

Here as of new we are just printing the details of new recipe. So let's check implemention till now. on click of submit button on add new recipe form we must get the details filled in the form printed as an object in console, just like in below image.

![new recipe details object(49-Final project/49.17-Add new recipe (display the form)/notes images/new recipe object.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.17-Add%20new%20recipe%20(display%20the%20form)/notes%20images/new%20recipe%20object.png>)
