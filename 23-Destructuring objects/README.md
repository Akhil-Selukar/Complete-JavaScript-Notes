## 23 Javascript Destructuring Objects

Just like destructuring an array which is explained earlier we can destructure objects as well.
As we know that the order of elements doesnot matter in the object hence while destructuring object we doesnot have to manually skip the elements if we dont want the element destructured. Have a look at below example.

```javascript
"use strict";

const john = {
  firstName: "John doe",
  age: 37,
  address: "8th block, 221B - Baker St, London, UK",
  contactNumber: 9874563215,
  skills: ["Javascript", "Java", "MongoDB", "SpringBoot", "ReactJS"],
  publications: {
    jsBook: {
      title: "Complete javascript bootcamp",
      cost: 150,
      pages: 400,
    },
    mongoDBBook: {
      title: "Complete guide to MongoDB",
      cost: 100,
      pages: 260,
    },
  },
};

const { firstName, contactNumber, publications } = john;

console.log(firstName);
console.log(contactNumber);
console.log(publications);
```

in above code we have an object named 'John' which contains properties line firstName, age, contactNumber, address, an array of skills and an object of books published by john. Now as mentioned earlier order of elements doesn't matter in object hence while destructuring we have to use the exact element name which we want to extract from the object and to destructure an object we use {} curly brackets. Hence in the line `const { firstName, contactNumber, publications } = john;` we used curly brackets and mentioned exact name of the elements which we want to extract from the object those are 'firstName', 'contactNumber' and 'publications'. And when we print the extracted elements we get below output.

```
John doe
9874563215
{
  jsBook: {
    title: "Complete javascript bootcamp",
    cost: 150,
    pages: 400,
  },
  mongoDBBook: {
    title: "Complete guide to MongoDB",
    cost: 100,
    pages: 260,
  },
}
```

Now lets say if we want to assign some meaningful names for the values received after destructuring like instead of publications we want to say booksPublished or for the firstName we want to say Author then we can do that as below.

```javascript
"use strict";

const john = {
  firstName: "John doe",
  age: 37,
  address: "8th block, 221B - Baker St, London, UK",
  contactNumber: 9874563215,
  skills: ["Javascript", "Java", "MongoDB", "SpringBoot", "ReactJS"],
  publications: {
    jsBook: {
      title: "Complete javascript bootcamp",
      cost: 150,
      pages: 400,
    },
    mongoDBBook: {
      title: "Complete guide to MongoDB",
      cost: 100,
      pages: 260,
    },
  },
};

const {
  firstName: author,
  contactNumber: mobileNumber,
  publications: booksPublished,
} = john;

console.log(author);
console.log(mobileNumber);
console.log(booksPublished);
```

The output of above code will also be same but here we can see that we have renamed the destructured elements.

Now if we try to destructure and fetch any property which is not present in the object the it gives `undefined`. Take a look at below example.

```javascript
"use strict";

const john = {
  firstName: "John doe",
  age: 37,
  address: "8th block, 221B - Baker St, London, UK",
  contactNumber: 9874563215,
  skills: ["Javascript", "Java", "MongoDB", "SpringBoot", "ReactJS"],
  publications: {
    jsBook: {
      title: "Complete javascript bootcamp",
      cost: 150,
      pages: 400,
    },
    mongoDBBook: {
      title: "Complete guide to MongoDB",
      cost: 100,
      pages: 260,
    },
  },
};

const {
  firstName: author,
  contactNumber: mobileNumber,
  publications: booksPublished,
  workEx: experience,
} = john;

console.log(author);
console.log(mobileNumber);
console.log(booksPublished);
console.log(experience);
```

In the above example we are trying to extract 'workEx' field and renaming it to 'experience' but this value is not present in the object so it will give undefined as result. The output of above code will be

```
John doe
9874563215
{
  jsBook: {
    title: "Complete javascript bootcamp",
    cost: 150,
    pages: 400,
  },
  mongoDBBook: {
    title: "Complete guide to MongoDB",
    cost: 100,
    pages: 260,
  },
}
undefined
```

This `undefined` value is not what we like to have in our code so in case we don't have the value present we can assigna default value as follows.

```javascript
"use strict";

const john = {
  firstName: "John doe",
  age: 37,
  address: "8th block, 221B - Baker St, London, UK",
  contactNumber: 9874563215,
  skills: ["Javascript", "Java", "MongoDB", "SpringBoot", "ReactJS"],
  publications: {
    jsBook: {
      title: "Complete javascript bootcamp",
      cost: 150,
      pages: 400,
    },
    mongoDBBook: {
      title: "Complete guide to MongoDB",
      cost: 100,
      pages: 260,
    },
  },
};

const {
  firstName: author,
  contactNumber: mobileNumber = 9999999999,
  publications: booksPublished = {},
  workEx: experience = 0,
} = john;

console.log(author);
console.log(mobileNumber);
console.log(booksPublished);
console.log(experience);
```

Here in above example we have assigned a default value of '9999999999' to the contactNumber which is renamed as 'mobileNumber', default value of {} i.e. empty object to the 'publication' which is renamed as 'booksPublished' and default value of 0 to 'workEx' which is renamed to 'experience'.

Now as we have 'firstName', 'contactNumber' and 'publications' available in the object hence default value will be overridden by the actual value present in the object. But as the object does not have any value for 'workEx' hence in output instead of 'undefined' we will now get the default value which is 0.

```
John doe
9874563215
{
  jsBook: {
    title: "Complete javascript bootcamp",
    cost: 150,
    pages: 400,
  },
  mongoDBBook: {
    title: "Complete guide to MongoDB",
    cost: 100,
    pages: 260,
  },
}
0
```

Now let's say we already have a variable with tthe property name which is there in the object and we want to destructure the object and extract the same property in that case we will have to mutate the existing variable. To do this we have a special syntax. Consider below code to understand this scenario better.

```javascript
let age = 10;

const sheldon = {
  fullName: "sheldon cooper",
  age: 37,
  contactNumber: 9874563215,
};
```

In above object if we destructure 'sheldon' object to get the age like below it will throw us an error.

```javascript
let age = 10;

const sheldon = {
  fullName: "sheldon cooper",
  age: 37,
  contactNumber: 9874563215,
};

{age} = sheldon;
```

In above example as 'age' is already declared at 1st line so we can't write `const {age} = sheldon` , it will give us an error saying 'identifier 'age' has already been declared.' as we have an age variable already declared. And if we dont write const just like in above code and try to modify or mutate the value of existing age variable defined at 1st line then it throws 'Uncaught SyntaxError: Unexpected token '='' error. This is because if we start javascript statement from {} (curly brackets) javascript consider it as a code block and by using = i.e. assignment operator we are trying to assign a value to code block. We can't use code blocak as a variable and assign any value to it so thats why we got abive error.

So now in such case how we can update the value of age variable by destructuring the object. This can be done by wrapping the destructuring of object `{age} = sheldon` into a pair of bracket like below.

```javascript
let age = 10;

const sheldon = {
  fullName: "sheldon cooper",
  age: 37,
  contactNumber: 9874563215,
};

({ age } = sheldon);

console.log(age);
```

This code will give the output as 37 which is the value inside the john object. And the earlire value of 'age' i.e. 10 will be overridden by new value 37. (this is why we declare age with let and not cost.)

### Destructuring of nested objects.

In the 1st eaxmple of 'john' object we have already destructured and extracted the 'publications' property which is a nested object. Now what we want is to destructure the inner 'mongoDBBook' object and fetch the title and cost of the mongoDB book. In such case what we need to do is we want to first destructure 'publications' object and get mongoDBBook object and then destructure mongoDBBook to get title and cost. This is performed as follows.

```javascript
"use strict";

const john = {
  firstName: "John doe",
  age: 37,
  address: "8th block, 221B - Baker St, London, UK",
  contactNumber: 9874563215,
  skills: ["Javascript", "Java", "MongoDB", "SpringBoot", "ReactJS"],
  publications: {
    jsBook: {
      title: "Complete javascript bootcamp",
      cost: 150,
      pages: 400,
    },
    mongoDBBook: {
      title: "Complete guide to MongoDB",
      cost: 100,
      pages: 260,
    },
  },
};

const { firstName, contactNumber, publications } = john;

const {
  mongoDBBook: { title, cost },
} = publications;

console.log(`Title : ${title}`);
console.log(`Cost : ${cost}`);
```

Here what we are doing is first we are destructuring 'publications' object and feting mongoDBBook object out of it and then again destructuring 'mongoDBBook' object by passing exact property name after : (colon). `mongoDBBook: { title, cost }` tthe output we get from above code will be.

```
Title : Complete guide to MongoDB
Cost : 100
```

Now the practical usecases of object destructuring is when we are getting response form any third party API in such cases we get response in the form of json object and we require the values in the json object at different places. Another usecase is when we have a method which need multiple values as method parameters then in that case if is hard to get the sequence of parameters in the correct order hence in such cases instead of sending values individually we can pass the object and we can destructure the object inside the method.

To understand this usecase better consider this scenario. Inside the 'john' object used earlier we want to add a method to publish a new book. That method for now must log the book name, number of pages in the book and the price of the book. So we must accept all these three values as method parameter and then we can use the received values inside the method to publish the book. To receive the attributes correctly we must send the attribute in correct sequence while calling the method. Now assume instead of three if there are 20-30 values you need as method argument. In that case it will be very difficult to maintain the exact order while calling the values. Also if while calling the method if we dont have values for some properties then to send some default value we need to write extra code and check for each and every field. This scenario can be very easily handled by using object destructuring. Have a look at below code.

```javascript
"use strict";

const john = {
  firstName: "John doe",
  age: 37,
  address: "8th block, 221B - Baker St, London, UK",
  contactNumber: 9874563215,
  skills: ["Javascript", "Java", "MongoDB", "SpringBoot", "ReactJS"],
  publications: {
    jsBook: {
      title: "Complete javascript bootcamp",
      cost: 150,
      pages: 400,
    },
    mongoDBBook: {
      title: "Complete guide to MongoDB",
      cost: 100,
      pages: 260,
    },
  },

  publishBook: function ({ title = "default", pages = 10, cost = 150 }) {
    console.log(`Publishing new book ${title}`);
    console.log(`Cost new book is ${cost}`);
    console.log(`Number of pages in new book are ${pages}`);
  },
};

john.publishBook({
  cost: 500,
  title: "Fun with flags",
});
```

In above code for 'publishBook' function instead of receiving title, number of pages and cost individually we are receiving an object and there itself we are destructuring the object. Now as we have seen at the begining that while destructuring object order of properties does not matter hence while calling the method we will not have to worry about the order in which we have to pass the title, cost and price. Now let's say we cont know about the number of pages in the book then while destructuring the object we have specified the default values as well so if we dont know any attribute then we can simply skip that attribute and the default value will be picked up. This is very useful when we have huge methods with many input parameters.

In above example we are calling the publishBook method with an object with just cost and title `john.publishBook({cost: 500title: "Fun with flags"});`, the order is also not matching with the order in which function is accepting the values. Still we get below output because of object destructuring. The output is.

```
Publishing new book Fun with flags
Cost new book is 500
Number of pages in new book are 10
```

Here the number of pages took the default value specified.
