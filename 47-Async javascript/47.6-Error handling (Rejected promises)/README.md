## 47.6 Error handling (Rejected promise)

Just couple of section back we saw that promise can be settled in two ways, i.e. either fulfilled when we received the response of API successfully or rejected when API call failes. Till now we have only handled 'fulfilled' promises only, but what if the promise is rejected. Now the only way our API call can fail is if our internet connection failed, so to simulate this we have aadded a button to the UI and on click of that button the fetch() will call the API to get country data. So what we will do is after loading the first page with button we will disconnect from internet and then click on the button to execute the further code. So the call will fail and we will get a promise with rejected state. In this section we will see how we can handle the rejected promises.

There are two ways to handle error or rejecte promises.

The first one is to pass second callback function to .then() method and handle the error there.

```javascript
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(
      (response) => response.json(),
      (err) => alert(err + "\nPLEASE CHECK YOUR INTERNET CONNECTION")
    )
    .then((data) => {
      displayCountryCard(data[0]);

      const neighbourCountry = data[0].borders?.[0];

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbourCountry}`);
    })
    .then((response) => response.json())
    .then((neighboursData) =>
      displayCountryCard(neighboursData[0], "neighbour")
    );
};
```

Here in above code we have added another callback function to .then() method which is `(err) => alert(err + "\nPLEASE CHECK YOUR INTERNET CONNECTION")` this handles the error and print that error with message provided like below.

![Error handling 1 (47-Async javascript/47.6-Error handling (Rejected promises)/images/Error_Handling-1.png)](<https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/47-Async%20javascript/47.6-Error%20handling%20(Rejected%20promises)/images/Error_Handling-1.png>)

The problem with this approach is we have only handled the error at first .then() method, so what if error occured when we are fetching data for neighbouring countries? In this case we will have to add the second callback function in each and every place where we are making the fetch() call. This is not possible if we have chaining of promises. So in such cases we need error handling in once central place.

So to implement this centralized error handling, instead of passing the second callback function in each .then() call we can handle the error at the end of the chain using .catch() method. This is possible because no matter where in chain the error occure it is propagated till the end and if it is handle at the end then well and good otherwise it throws an error in console.

Have a look at below code which handle error at the end of chain.

```javascript
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      displayCountryCard(data[0]);

      const neighbourCountry = data[0].borders?.[0];

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbourCountry}`);
    })
    .then((response) => response.json())
    .then((neighboursData) =>
      displayCountryCard(neighboursData[0], "neighbour")
    )
    .catch((err) => alert(err + "\nPLEASE CHECK YOUR INTERNET CONNECTION"));
};
```

Now in above code we have handled the error using .catch() at the end of the chain. So this code will handle the error occuring at any place in the chain.

Now apart from .then() and .catch() we do have third method as well. .then() is called when the promise is fulfilled and .catch() is called when the promise is rejected. But the third method which is .finally() this will be called no matter the promise is fulfilled or rejected. This will be always called at last.

for example

```javascript
const displayCountryDetails = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      displayCountryCard(data[0]);

      const neighbourCountry = data[0].borders?.[0];

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbourCountry}`);
    })
    .then((response) => response.json())
    .then((neighboursData) =>
      displayCountryCard(neighboursData[0], "neighbour")
    )
    .catch((err) => alert(err + "\nPLEASE CHECK YOUR INTERNET CONNECTION"))
    .finally(() => {
      console.log("This is the end of promise chain..!!!");
    });
};
```

Now the message "This is the end of promise chain..!!!" will be printed to the console no if there is a rejected promise of a fulfilled promise. This finally is most of the times used when we want to show loader till the API call is in progress and once the call completes then no matter the call is success of failed we want to remove the loader and display either actual data of error message based on state of promise.
