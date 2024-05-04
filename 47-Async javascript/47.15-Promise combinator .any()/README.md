## 47.15 Promise combinator (.any())

Now .any() is the newest promise combinator and it is very similar to that of race() the only difference here is that .any() will not short circuit the combinator and it will return the first fulfilled promise and ignore the rejected promises.

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
    const data = await Promise.any([
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

![any image (47-Async javascript/47.15-Promise combinator .any()/images/any.png)](<[<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.14-Promise%20combinator%20.allSettled()/images/allSettled.png>](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.15-Promise%20combinator%20.any()/images/any.png)>)
