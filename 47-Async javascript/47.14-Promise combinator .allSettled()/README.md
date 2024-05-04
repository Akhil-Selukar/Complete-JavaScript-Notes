## 47.12 Promise combinator (.allSettled())

Till now we have seen .all() which return an array of all settled promisis and if in case any of the promimse is rejectced then the overall result of .all() will be a rejected promise. Then we saw .race() which return the first settled promise no matter it is fulfilled or rejected, if it is settled it will be returned.

Now the third combinator is .allSettled() this one is added recently in javascript and it works almost same as that of .all() combinator. But the only difference is .all() return the rejected promise as soon as any of the promise in it is rejected, while allSettled() returns a array of all promises settled no matter it is fulfilled or rejected. That means if we have 5 promises in .allSettled() and out of which 3rd and 4th got rejected. Then allSettled() will return an array of 5 setted promises in which 3 will be in fulfilled state and 2 (3rd and 4th) will be in rejected state. (Basically allSettled() is just like all() except short circuiting).

```javascript
"use strict";

const getCoutryJson = function (url, errorMessage = "Something went wrong!") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`(${response.status}) - ${errorMessage}`);
    }
    return response.json();
  });
};

const fetchCapitals = async function (country1, country2, country3) {
  try {
    const data = await Promise.allSettled([
      getCoutryJson(`https://restcountries.com/v3.1/name/${country1}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country2}`),
      getCoutryJson(`https://restcountries.com/v3.1/name/${country3}`),
    ]);

    console.log(data);
  } catch (err) {
    console.log(err.message);
  }
};

fetchCapitals("sweden", "Unknown", "UAE");
```

In above code we know that the second promise is going to be rejected because there is no country with name 'unknown' hence the output will be an array of three promises with second one rejected.

![all Settled image (47-Async javascript/47.14-Promise combinator .allSettled()/images/allSettled.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.14-Promise%20combinator%20.allSettled()/images/allSettled.png>)
