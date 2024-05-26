## 49.18 Add new recipe (save the data-model)

In last section we displayed the new recipe form to the user and on submiting the form we extracted the data filled in the form. Now to store the data we need to implement the model. In this project as we are not maintaining any local database so we will do a POST call to the same third party API and send the data to store it. To do this we will have to follow some steps and the first step is to create a method in model which will format the data and do the API call. Now here we are doing an API call so this method will be async method.

If we observe the ingredients list of the data that we got from form, it is comma separated string which has first value as quantity then unit and then name of the ingredient. (refer below image)

![new recipe object (49-Final project/49.17-Add new recipe (display the form)/notes images/new recipe object.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.17-Add%20new%20recipe%20(display%20the%20form)/notes%20images/new%20recipe%20object.png>)

But the API format is not like this in API, all ingredients are stored in the form of array of objects where each object represent an ingredient and contain quantity, unit and description. So the first thing which we will have to do is to format the received data for new recipe in API format. So let's create a function in model.js and call it from controller.

controller.js

```javascript
.
.
.
const controllAddRecipe = function (newRecipeObj) {
  // Send the object to model and store it.
  model.uploadRecipe(newRecipeObj);
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

init();
```

Now let's create uploadRecipe() in model. In model first thing we have to do is to extract all six ingredients from the object. This is very difficult to do with Object but we can easily do this with an Array by using filter() method on array. So first we will conver the received object back to array and then apply filter on the array and the condition will be like the first element in the array which is field name must start with string 'ingredient' and the second element which is value must not be empty string.

The above sentense will make more sense if we observe the structure of array which we are getting after converting the object to array. (refer below)

```javascript
[["title", "Recipe title"], ["url":"TEST"],["image", "TEST"], ["ingredient-1","0.5,kg,rice"], ["ingredient-2",",,salt"]];
```

This is an array of array so we will loop over the parent array and for each sub-array we will check if first element starts with 'ingredient' or not and second element has some value or not.

model.js

```javascript
.
.
.
export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe).filter(
    (entry) => entry[0].startsWith("ingredient") && entry[1] !== ""
  );
  console.log(ingredients);
};
.
.
.
```

Now here the we are first converting the object to array using 'Object.entries()' and then on that array we are using filter method to filter out entries based on given filter criterion. We know that filter returns another array of elements which satisfies the given filter condition so the ingredients will have the array of entries which we need to create object of ingredients to send to the API.

Let's check what we will get in the ingredients.

![Ingredients array (49-Final project/49.18-Add new recipe (save the data-model)/notes images/ingredients array.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.18-Add%20new%20recipe%20(save%20the%20data-model)/notes%20images/ingredients%20array.png>)

Here we can see that now we have only three entries which are for ingredients. Using this entries we can create necessary objects to send to the API. To do this first we will have to split the second elementt of array (i.e. index 1) with comma (,) and then create an object using splited values where first value will be the quantity, second will be the unit and third will be thedescription. This we can do by using .map method on the received array like below.

model.js

```javascript
.
.
.
export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
    .map((ing) => {
      const [quantity, unit, description] = ing[1].split(",");
      return { quantity: quantity ? +quantity : null, unit, description };
    });
  console.log(ingredients);
};
.
.
.
```

Now if you see the output in console, you will see the array of object just like we need.

![array of ingredients objects(49-Final project/49.18-Add new recipe (save the data-model)/notes images/array of ingredients objects.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.18-Add%20new%20recipe%20(save%20the%20data-model)/notes%20images/array%20of%20ingredients%20objects.png>)

Now till this it is working, but what if someone doesnot follow the comma separated format for ingredients. In that case the current implementation will generate undefined for the unit and description or throw an error if entered value is not a number. But we want to check this format and inform user nicely that the ingredients entered are not in proper format by displaying an error message. For this we will have to modify the code like below.

model.js

```javascript
.
.
.
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingredientsArray = ing[1].split(",");

        if (ingredientsArray.length != 3)
          throw new Error(
            "Ingredients are not entered in proper format, Please follow the format quantity,unit,ingredient Name"
          );

        const [quantity, unit, description] = ingredientsArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
  } catch (err) {
    throw err;
  }
  console.log(ingredients);
};
```

here instead of directly destructuring the array into an object we are first checking that the comma separated array is of length 3 or not, which means if all the values are present or not. If not then we are throwing an error with proper message. now to render this message on UI we must catch this error and handle it in controller and instruct the view to display the message.

controller.js

```javascript
.
.
.
const controllAddRecipe = async function (newRecipeObj) {
  try {
    // Send the object to model and store it.
    await model.uploadRecipe(newRecipeObj);
  } catch (err) {
    addRecipeView.displayError(err.message);
  }
};
.
.
.
```

After this if we enter any ingredient in incorrect format we will see an error on UI.

So now we have the ingreients array ready as per the API format so we can create an actual object with all the data regarding the recipe and use it for the API call.

model.js

```javascript
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingredientsArray = ing[1].split(",");

        if (ingredientsArray.length != 3)
          throw new Error(
            "Ingredients are not entered in proper format, Please follow the format quantity,unit,ingredient Name"
          );

        const [quantity, unit, description] = ingredientsArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    console.log(recipe);
  } catch (err) {
    throw err;
  }
};
```

Now if we see the output in console, it will be in exact format in which we receive the data from API. So we are ready to sent this data to API. Now to send the data we need to convert it into JSON and then triger a POST request. Now there can be many such instances in actual application where we want to triger a POST request hence the best place to write the code for this is the helper.js.

helper.js

```javascript
.
.
.
export const sendJSON = async function (url, dataToSend) {
  try {
    const request = fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    const response = await Promise.race([request, timeout(TIMEOUT_SEC)]);
    const jsonResponse = await response.json();

    if (!response.ok) throw new Error(`${jsonResponse.message}`);
    return jsonResponse;
  } catch (e) {
    throw e;
  }
};
```

So here for POST request we will have to pass an options object as well in fetch method. The options object specify the method type i.e. POST because this will be a post API. Then inside header we can pass different request parameters like token and other things but as of now we are just passing content type as application/json which will instruct the API that the data which is expected is in json format and the last argument is the actual data. Now the data we want to be in json format so we will have to convert the object into json that can be done using JSON.stringify(). Now let's call this function and trigger the POST call.

model.js

```javascript
.
.
.
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingredientsArray = ing[1].split(",");

        if (ingredientsArray.length != 3)
          throw new Error(
            "Ingredients are not entered in proper format, Please follow the format quantity,unit,ingredient Name"
          );

        const [quantity, unit, description] = ingredientsArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // console.log(recipe);
    const resonseRecipe = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    console.log(resonseRecipe);
  } catch (err) {
    throw err;
  }
};
```

So here we have API_URL, which we have already imported from the config.js. And the URL will be the same. But for POST request to this API we will require a API key to identify the unique user.

> To generate the key you cna visit the [link](https://forkify-api.herokuapp.com/v2) and click on 'Generate your API key'

Now when we hit the run the application after this implementation, we will see same recipe object printed in console, because on successful call, the API is returning the same saved recipe. (refer below screenshot)

![successfully saved recipe(49-Final project/49.18-Add new recipe (save the data-model)/notes images/successfully saved recipe.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.18-Add%20new%20recipe%20(save%20the%20data-model)/notes%20images/successfully%20saved%20recipe.png>)

Now as the recipe is saved, we want to close the add recipe window and display the saved recipe in recpeView. For this again we will have to convert the received object into the form which our application understands i.e. image instead of image_url and sourceUrl instead of source_url, etc.. For this we already have code in model.js under loadRecipe function so instead of writing the same code again we can take out the code create a function to generate the recipe object and use it at both the places i.e. at loadRecipe and uploadrecipe.

model.js

```javascript
.
.
.

const createRecipeObject = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (recipeId) {
  try {
    const jsonResponse = await getJSON(`${API_URL}${recipeId}`);
    const { recipe } = jsonResponse.data;

    state.recipe = createRecipeObject(recipe);
    // console.log(state.recipe);

    if (state.bookmarks.some((bookmark) => bookmark.id === recipeId)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
};

.
.
.

export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingredientsArray = ing[1].split(",");

        if (ingredientsArray.length != 3)
          throw new Error(
            "Ingredients are not entered in proper format, Please follow the format quantity,unit,ingredient Name"
          );

        const [quantity, unit, description] = ingredientsArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipeObj = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    // console.log(recipe);
    const resonseRecipe = await sendJSON(`${API_URL}?key=${KEY}`, recipeObj);
    const { recipe } = resonseRecipe.data;
    state.recipe = createRecipeObject(recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
.
.
.
```

So now here once the new recipe is uploaded successfully, we will receive that recipe back. And we are converting that recipe into the format which we need in tha application and storing it in state variable. Also we are marking our recipe as bookmarked by default.

So if we take a look at the state object after all this code is executed, by adding a console.log() in controller.

controller.js

```javascript
.
.
.
const controllAddRecipe = async function (newRecipeObj) {
  try {
    // Send the object to model and store it.
    await model.uploadRecipe(newRecipeObj);
    console.log(model.state.recipe);
  } catch (err) {
    addRecipeView.displayError(err.message);
  }
};
.
.
.
```

Here we will get the object exactly like the object we get from fetch request for specific recipe, so by using this object we can simply render the recipeView with new recipe and close the form.

controller.js

```javascript
.
.
.
const controllAddRecipe = async function (newRecipeObj) {
  try {
    // Send the object to model and store it.
    await model.uploadRecipe(newRecipeObj);

    // render the new recipe
    recipeView.render(model.state.recipe);

    // display success message
    addRecipeView.displaySuccess();

    // close the form
    setTimeout(function () {
      addRecipeView.toggleHiddenClass();
    }, MODEL_CLOSE_WAIT_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.displayError(err.message);
  }
};
.
.
.
```

So here as soon as the recipe is uploaded successfully and no error is thrown we are rendering the success message, and then after 2 seconds (specified in config.js) we are closing the form by calling toggleHiddenClass() method to add class 'hidden' in window and overlay so that the new rendered recipe will be displayed.

Here you will not see the image because the image url we passed was a dummy url.
