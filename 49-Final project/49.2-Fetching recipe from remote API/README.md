## 49.2 Fetching recipe from remote API.

For this application to work we need details of all the recipes, and to get this details we will be using a set of remote APIs 'https://forkify-api.herokuapp.com/v2' which are provided by '[Jonas Schmedtmann](https://www.udemy.com/course/the-complete-javascript-course/?couponCode=LETSLEARNNOWPP)'.

If we visit the page 'https://forkify-api.herokuapp.com/v2' where API documentation is given, we can see an API `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886` which will give recipe for pizza when made a GET call. So we will be using this API to fetch different recipes based on recipe Id.

Now as we have already seen how we can call remote API using async functions we can create a function to call the API and get the recipe details like below.

```javascript
const showRecipe = async function () {
  try {
    const response = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886"
    );
    const jsonResponse = await response.json();

    if (!response.ok) throw new Error(`${jsonResponse.message}`);

    console.log(jsonResponse);
  } catch (e) {
    alert(e);
  }
};
```

In above function we have created a async function showRecipe which calls the API and wait for the response, as soon as the response is received we are parsing that response to json format by using .json() method and the if we take a look at parsed json we will get below response.

![API Response ()](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.2-Fetching%20recipe%20from%20remote%20API/Notes%20images/response-1.png)

In above response we can see that the actual data that we are looking for is present under 'data'. So we can extract the data and create a new recipe object with required data like below.

```javascript
const showRecipe = async function () {
  try {
    const response = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886_dummy"
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

    console.log(recipe);
  } catch (e) {
    alert(e);
  }
};
```

After above code we will have a nicely formated and clean 'recipe' object with all the required details. Also in case of any invalid recipe id we are handling the error and we will get below error message in browser.

![Error response (49-Final project/49.2-Fetching recipe from remote API/Notes images/error response.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.2-Fetching%20recipe%20from%20remote%20API/Notes%20images/error%20response.png)
