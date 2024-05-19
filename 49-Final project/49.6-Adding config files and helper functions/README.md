## 49.6 Helper functions and config files

Apart ftom just model, views and controllers modern web applications does have some other modules/files which are for configuration or for some utility/helper functions which are needed at different places throughout the code. In this section let's refactor the code more and add this two files.

We have added two files config.js and helper.js in the js folder. Config.js will contain the things like some constants or other config related things which are used at multiple places in the code. So instead of defining those things in each and every file we can have them in config.js and we can export it from there. So in case of any change in the config related thing, instead of changing it from every file we just have to change it in one place i.e. config.js file. Similarly if there is a piece of code which we are using at multiple places in the code then we can add that piece of code in util/helper.js and import it throughout the code so thet in case the logic changes then we dont have to worry about changing it in all the places, we just have to change it in helper.js and it will work.

So in our example we have 'https://forkify-api.herokuapp.com/api/v2/recipes' this url common and we will be using it at multiple places hence we have added it in the config file and imported it in model to use. Similarly we know that all fetch calls to the API will return us a promise and we will have to convert that promise to json using .json() method so the code for fetching data and converting it to json we can be the perfect example for helper function hence we have added it in helper.js class like below.

```javascript
export const getJSON = async function (url) {
  try {
    const response = await fetch(url);
    const jsonResponse = await response.json();

    if (!response.ok) throw new Error(`${jsonResponse.message}`);
    return jsonResponse;
  } catch (e) {
    throw e;
  }
};
```

Now, in casse of slow internet connection or any other reason it might take a lot of time to fetch the recipe data so we dont want user to keep on waiting, we want to terminate the call if the recipe is not fetched in 10 sec. This timeout of fetch call can be implemented by using the [race() promise combinator](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/47-Async%20javascript/47.13-Promise%20combinator%20.race()>). So we have added a timeout function which will return a promise which will be fulfilled after given number of seconds. And then used the race() promise combinator to implement the timeout of long running API calls.

```javascript
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(10)]);
    const jsonResponse = await response.json();

    if (!response.ok) throw new Error(`${jsonResponse.message}`);
    return jsonResponse;
  } catch (e) {
    throw e;
  }
};
```

Now here thetimeout seconds i.e. 10 is a configurable value and we can move it to configuration file. Hence the final config and helper files are as below.

config.js

```javascript
export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
export const TIMEOUT_SEC = 5;
```

helper.js

```javascript
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const jsonResponse = await response.json();

    if (!response.ok) throw new Error(`${jsonResponse.message}`);
    return jsonResponse;
  } catch (e) {
    throw e;
  }
};
```

We refactored the model code to use this helper method for fetching the data from Fetch call like below.

model.js

```javascript
import { API_URL } from "./config";
import { getJSON } from "./helper";

export const state = { recipe: {} };

export const loadRecipe = async function (recipeId) {
  try {
    const jsonResponse = await getJSON(`${API_URL}/${recipeId}`);
    const { recipe } = jsonResponse.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    console.log(state.recipe);
  } catch (e) {
    console.error(`error ==>> ${e}`);
    alert(e);
  }
};
```
