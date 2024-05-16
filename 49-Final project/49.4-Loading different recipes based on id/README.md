## 49.4-Loading different recipes based on id

In this section we are going to load different recipes based on id. If we have any link with href in our html file then on click of that link url changes after # symbol. This is what we will be implementing in thsi section. We will be having link for each recipes in left side panel (in future sections). On click on that recipe url will be changed and after # we will get the id of that recipe. Now we have to get that id from url and use that id while calling the API to fetch recipe.

To implement this every time when we click on any href link and url changes after # a event got trigered called 'hashchange' event. We need to listen to this event and based on this event we will have to call the recipe API for that specific recipeId.

As we will be implementing the left side panel in future sections hence to simulate the links for few different recipes we have to add some hardcoded links like below in html file.

```html
.
.
.
</header>

      <div class="search-results">
        <ul class="results">
          <a class="preview__link" href="#5ed6604591c37cdc054bcc13">Recipe 1</a>
          <a class="preview__link" href="#5ed6604591c37cdc054bcac4">Recipe 2</a>
          <a class="preview__link" href="#5ed6604691c37cdc054bd0bc">Recipe 3</a>
        </ul>

        <div class="pagination">
.
.
.
```

This will add three hardcoded links in the left side panel. And whenever you click on these links you will notice the id specific to that link is added after the # symbol.

Now the to listen this event we need to add a eventListner at window object which will listen to 'changehash' event. Then as soon as this event is captured we have to read the id from the url and then pass this id to call the API. This is what we did in below code.

```javascript
const showRecipe = async function () {
  displayLoader(recipeContainer);
  const recipeId = window.location.hash.slice(1);
  if (!recipeId) return;

  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
    );
    const jsonResponse = await response.json();

    .
    .
    .

    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", htmlMarkup);
    console.log(recipe);
  } catch (e) {
    alert(e);
  }
};

window.addEventListener("hashchange", showRecipe);
```

Here we first listen to the event using `window.addEventListener("hashchange", showRecipe);` and as soon as the event occured we called showRecipe function as callback function. Now it we need to read the id from url, for this we can use `window.location.hash` but this will give us the id with # symbol. We want to remove the # symbol hence we used slice method and removed the first character from the id to get actual id and used that id to call the API. In case of null id i.e. initial load we dont want our API call to fail hence we have added a guard if statement and if id is null it will return immediately.

Now if you run the application you will see that the links will work and render the recipe specific to the id.

But there is one issue in above implementation. Try copping the url with any id and paste it in another tab and then hit enter. In this case even though the url has the id still recipe will not render. This is because this time the hash in url does not changed it was already there hence hashchange event didn't triggered. In this scenario the event triggered was the load event. Hence to handle this scenario, we need to handle the load event as well in same fashion. So we can add another event listner like below.

```javascript
window.addEventListener("hashchange", showRecipe);
window.addEventListener("load", showRecipe);
```

Now this will work, but this is not the best solution for the problem. Consider you have 15 such events for which you have to call the same callback function. In such case it is not good to write 15 eventListners. What we can do is to create an array of events which we have to handle and using a foreach loop we can attach event listner to all the events like below.

```javascript
["hashchange", "load"].forEach((ev) => window.addEventListener(ev, showRecipe));
```

This code will also do the same thing.

Your final output after this section will look like below.

> [!TIP] Because of file size the video can not be displayed here, you can download the video from below link

[Video Link](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/49.4-Loading%20different%20recipes%20based%20on%20id/Notes%20assets/loading%20different%20recipes%20based%20on%20id.mp4)
