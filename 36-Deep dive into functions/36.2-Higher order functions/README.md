## 36.2 Javascript Higher Order Functions

**First class functions in javascript -** Functions in javascript are treated just like a simple value which we can assign to a variable or as a property of an object. Hence javascript is called to have first class functions.

**Now what are higher order functions?**<br>
Higher order functions are the functions which receives another function as parameter or which return back a new function or does both. This type of behaviour is possible only because of first class functions.

Below are the examples of higher order functions.

We have already seen the event listeners before which cal perform some operation on occurance of specific event like click.

```javascript
const welcome() = function(){
  cosole.log("Hello user, Welcome..!!");
}

welcomeBtn.addEventListener('click', welcome);
```

In above example `addEventListener()` itself is a function which takes two parameters and as a second parameter we are passing `welcome` which is another function. Hence here `addEventListener` is a higher order function and `welcome` is a callback function. Callback function is a function which is passed as an argument to another funnction and will be called by the actual function afterword.

Now the second example is.

```javascript
const checkAge = function(age){
  if(age >= 18){
    return function{
      console.log("Congratulations you can vote..!!");
    }
  }
}
```

In above example the function checkAge is a higher order function because if teh 'age' is greater than or equal to 18 then checkAge will return another function.

> **Very important note :**
> First class function is just a feature that javascript has but higher order functions are actually a type of function which uses and which is possbile because of first class function feature.
