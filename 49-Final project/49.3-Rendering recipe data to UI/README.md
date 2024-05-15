## 49.3 Rendering recipe data to UI

In last section we have fetched the recipe and created a recipe object which contain all the required details about the recipe. Now the next step is to display that detail to user on UI. In earlier projects we have seen that this is done by inserting the html code at specific place, so for this we will have to create a template literal with the html template and add data about the recipe in it and then add that html template in our actual html file.

```javascript
const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const showRecipe = async function () {
  try {
    const response = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40"
    );
    const jsonResponse = await response.json();

    if (!response.ok) throw new Error(`${jsonResponse.message}`);

    let { recipe } = jsonResponse.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // Rendering recipe to UI
    const htmlMarkup = `<figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="src/img/icons.svg#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="src/img/icons.svg#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="src/img/icons.svg#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="src/img/icons.svg#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="src/img/icons.svg#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="src/img/icons.svg#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">1000</div>
        <div class="recipe__description">
          <span class="recipe__unit">g</span>
          pasta
        </div>
      </li>

      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="src/img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">0.5</div>
        <div class="recipe__description">
          <span class="recipe__unit">cup</span>
          ricotta cheese
        </div>
      </li>
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="src/img/icons.svg#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;

    recipeContainer.insertAdjacentHTML("afterbegin", htmlMarkup);
    console.log(recipe);
  } catch (e) {
    alert(e);
  }
};

showRecipe();
```

Now in above code we have created a html template with recipe details (Except list of ingredients) and we have added the created html template in html document. After implementing above code we will see the data related to the recipe on screen. But if we closely observe we can see some problems like.

1. Even though the recipe details are displayed we are still having the message 'Start by searching for a recipe or an ingredient. Have fun!' below the recipe. This should be gone.
2. Ingredients list need to be displayed.
3. Different icons on the screen are missing (we can only see voide space in place of icons for example in 'DIRECTIONS' button right side arror is missing, bookmark icon is missing, etc.)

Now let's first fix the issue with default message 'Start by searching for a recipe or an ingredient. Have fun!', this should disappear when a recipe is displayed. This is very simple. That message was the initial content of the container with class 'recipe' i.e. recipeContainer. By using `insertAdjacentHTML` we are adding new content to the container, but still the old content is there i.e. the message. So before adding the new content which we have created, we need to remove the old content which will remove the message. This can be achieved like below.

```javascript
.
.
.
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", htmlMarkup);
.
.
.
```

Here before adding the htmlMarkup as html content in container we are making existing content as '' i.e. blank.

Now if you reload the application, the default message 'Start by searching for a recipe or an ingredient. Have fun!' will be gone.

The second problem is the list of ingredients. To display the actual list of ingredients we have to loop over the ingredients array which is present in recipe object and create the html markup with that data.

The number of ingredients might differ for different recipes so it is clear that we have to loop over the array. Now the second thing is for each ingredient we want to create a template literal, so basically for each ingredient there must be 1 string returned. So if we use for each to loop over the array we will not get the string returned hence we will have to use .map() here like below.

```javascript
.
.
.
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${recipe.ingredients.map((ingredient) => {
      return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="src/img/icons.svg#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ingredient.quantity}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>`;
    }).join("")}

    </ul>
  </div>
  .
  .
  .
```

This will return the template literal for each ingredient in the ingredients array. This will display the indredients in UI (There are some null entries, we will work on it later, as of now we are able to render the list on UI).

The third problem now is the icons which are missing from the UI. This is because if we look at the html template we are creating we are refering to `src/img/icons.svg` this path but this path is in our devlopment project folder path, when we run parcel in that case new dist folder is created and all the assets and other resources need to be picked from that dist folder. So to fix this path we need to first import the icons.svg from dist folder in our JS file. This can be done by importing the file like below.

```javascript
import icons from "url:../img/icons.svg";
```

Here .. means the root folder i.e. dist.

Now we can use this imported icons and refer the icons in html template literal. This imported icons is nothing but the filepath of newly created icons file in dist folder.

```javascript
const showRecipe = async function () {
  try {
    const response = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40"
    );
    const jsonResponse = await response.json();

    if (!response.ok) throw new Error(`${jsonResponse.message}`);

    let { recipe } = jsonResponse.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // Rendering recipe to UI
    const htmlMarkup = `<figure class="recipe__fig">
    <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${recipe.ingredients
      .map((ingredient) => {
        return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ingredient.quantity}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>`;
      })
      .join("")}

    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;

    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", htmlMarkup);
    console.log(recipe);
  } catch (e) {
    alert(e);
  }
};
```

Now after importing and using the icons.svg file the icons will appear on UI.

One thing which might be noticed in case of slow internet connection is when we load the page it takes some time for the recipe to load till then only the default message is getting displayed, which might seem like our request is not triggered. So to fix this we might need to show some loader which will indicate that request is being processed. This can be done by adding a rotating loader.

The loader is rotated using css frame animation.

We might need this loader at multiple places hence it's better to create a new function which will attach the loader to given parent element. This can be done like below.

```javascript
const displayLoader = function (parentElement) {
  const loader = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;

  parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML("afterbegin", loader);
};
```

Now we can call this function from showRecipe() to display loader till the API call is in progress.

```javascript
const showRecipe = async function () {
  displayLoader(recipeContainer);
  try {
    const response = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40"
    );
    const jsonResponse = await response.json();

    .
    .
    .
```

Below is how UI will look like after completion of this section.

![UI screen after rendered recipe (49-Final project/49.3-Rendering recipe data to UI/Notes images/Final UI.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.3-Rendering%20recipe%20data%20to%20UI/Notes%20images/Final%20UI.png)
