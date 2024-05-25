## 49.13 Re-rendering only updated part in DOM

In last section we have implemented the functionality to update the servings and based on the number of servings we quantity of ingredients is updating. But while rendering the quantity and number os servings on UI if we observe the complete RecipeView UI is getting rerender which include unnecessary rerendering of image and other text and hyperlinks. This is not good because consider if we have many images which are not changing because of any of the udate then why to rerender those images. Also it will create some flickering effect if the network connectiion is not super fast. So in this section we will implement the functionality to render only those elements which got modified.

Now to achieve this we know that the recipe is already loaded to instead of reloading the recipe again we can just update the places where the modification need to be done. For this we will need a update() method instead of render() which we will call from the controller in case of servings are updated. This update method will generate the complete markup for entire view using updated serving data, but instead of rendering that markup we can compare this new markup with the old markup and check where exactly the changes are and we can simply replace the new text value in place of old text value. This will not render the entire view it will just update that one value only. So lets see the implementation part of this.

controller.js

```javascript
.
.
.
const controlServings = function (updateTo) {
  model.updateServings(updateTo);

  recipeView.update(model.state.recipe);
};
.
.
.
```

Here from controller we are calling the update method instead of render method. Now we need to define this update method. This we will define in View (i.e. the parent class) because this method can be used to other components as well where we want to update few things instead of the entire view.

view.js

```javascript
.
.
.
update(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.error(`Error ${data}`);
      return this.displayError();
    }

    this._data = data;
    const updateHtmlMarkup = this._generateHtmlMarkup();
  }
  .
  .
  .
```

Here we have defined a method update() in view.js. This method accepts the data about the recipe from state object and then check if the data is actually present or not and in it is not present display the error else it is updating the data variable in view.js with the updated data and then generate the new html markup with updated data. This markup is a string so it's very difficult to compare two string and get the exact element where we have some changees. So we will have to convert this string to DOM, so that we can get all element from this updated DOM then compare them against all the elements of existing DOM and update all those elements where there is some difference. We do have some methods available in document object which helps us do this exact thing. Have a look at below code.

```javascript
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
  }
```

Now by using `document.createRange().createContextualFragment(updateHtmlMarkup);` we have converted the updateHtmlMarkup string to DOM. So next to compare this with the existing DOM we need to get all elements from both the DOM's so that we can loop over it and compare the values. This can be done by using simple querySelectorAll("\*"); This wil give us all the elements from the DOM.

```javascript
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

      console.log(oldEle, newEle.isEqualNode(oldEle));
    });
  }
```

In above code we are looping over all the DOM elements and comparing old and new dom elements. If we run the application now and click on update servings button then in console we will be able to see that all the dom elements of recipeiView are getting listed with a boolean value true or false. For all the elements part of recipe details (or all elements which are parent to servings including servings) will have boolean value as false, means the elements are not equal. Below is the screenshot of the output.

![element comparison (49-Final project/49.13-Re-rendering only updated part of DOM/notes images/element comparison.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.13-Re-rendering%20only%20updated%20part%20of%20DOM/notes%20images/element%20comparison.png)

So we got the elements. Now we want to update the text content with updated one. But if we observe closely we can see that the recipe\_\_details secion is also marked as false which means changed but the actual change is not in recipe\_\_details, so if we replace the recipe\_\_details section with the new recipe\_\_details section it will not work as expected. So we have to find out the exact place where the serving size which is nothing but the textContent of the element. So we are interested only in those elements where text content is changed. This is what implemented next.

```javascript
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
    });
  }
```

Now after implementing the above if condition we will be able to see that the only text content where the vallue is changed are getting updated and the whole page is not getting reloaded. But there is another problem now. If we observer we are not able to navigate through all the pages. This is because, the logic to track next and previous page number is implemented using the data variables and we are not updating those in above code. So let's fix that now.

To change the text content we were directly updating the text content of modified element to the new text content. But now as we want to update the value from data attribute of the element which got modified, we will have to loop over the attributes of that element.

```javascript
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
```

Now this will update the data attributes as well, and now we will be able to update the servings to any number we want.
