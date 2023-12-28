## 16 Javascript Objects

Object is a data structure in javascript which stores properties in key-value pair format and we can fetch the properties by using the key. In an object key is a string and value can be of any type i.e. string, number, boolean, array or even another object. Below is the example of a simple object which holds details of an employee.

```javascript
const employee = {
  firstName: "Sheldon",
  lastName: "Cooper",
  age: 36,
  company: "BBT",
  skills: ["Javascript", "Python", "Azure", "Physics"],
};

console.log(employee);
```

In above example we have defined an object with name 'employee' which holds details like first name, last name, age, company, skills related to the employee. Here 'firstname', 'lastName', 'age', 'company' and 'skills' are the keys and we can see that firstName and lastName has string value while 'age' is having number value and skills is an array.

When we print the complete object using `console.log(employee);` we get below result.

```
{firstName: 'Sheldon', lastName: 'Cooper', age: 36, company: 'BBT', skills: Array(4)}

age: 36
company: "BBT"
firstName: "Sheldon"
lastName: "Cooper"
skills: ['Javascript', 'Python', 'Azure', 'Physics']
```

### Accessing properties of an object

There are two ways using which we can access properties of an object one is using dot and another is using brackets. Below is the example of both.

```javascript
const employee = {
  firstName: "Sheldon",
  lastName: "Cooper",
  age: 36,
  company: "BBT",
  skills: ["Javascript", "Python", "Azure", "Physics"],
};

console.log(employee.firstName);
console.log(employee["lastName"]);
```

Here `console.log(employee.firstName);` represent the use of dot to access property of an object. Here we are accessing 'firstName' property of employee object hence it will give 'Sheldon' as output. While `consile.log(employee["lastName"]);` uses the brackets to access 'lastName' property od employee object and it will give 'Cooper' as a result.

The main difference between two ways is that in brckets we can pass expression or variable which will not work in case of dot. to understand this consider below example.

```javascript
const employee = {
  firstName: "Sheldon",
  lastName: "Cooper",
  age: 36,
  company: "BBT",
  skills: ["Javascript", "Python", "Azure", "Physics"],
};

const propertyName = prompt("enter the property name you want to see : ");
console.log(employee.propertyName);
console.log(employee[propertyName]);
```

Here we have the same employee object and we are using `prompt()` function here, promt() ask user for input and save the value entered by user as a string in given variable. So when we run this code it will give user a popup saying "enter the property name you want to see : " and wait for user to enter something. Lte's assume user enter 'age' and click on submit, then the 'age' string will be stored in variable 'propertyName'. Now when we use propertyName with dot to access the value we will not get the expected result which is 36. Because propertyName will not be replaced by the string it contains i.e. 'age' whereas 'propertyName' itself will be considered as a key and it will look for the key 'propertyName' in the object and as this key does not exist it will return `undefined` as result. Where as in case of brackets first propertyName will be evaluated as expression and the string value 'age' will be considered and eventually the expression will become `console.log(employee["age"]);` and hence it will return the desired output which is 36.

```
undefined
36
```

Similar to accessing the properties we can also use dot and bracket to add new properties in the object. consider below code.

```javascript
const employee = {
  firstName: "Sheldon",
  lastName: "Cooper",
  age: 36,
  company: "BBT",
  skills: ["Javascript", "Python", "Azure", "Physics"],
};

employee.location = "USA";
employee["contactNumber"] = 9874563215;

console.log(employee);
```

In above code the line `employee.location = "USA";` will add new key name 'location' to the object and set it's value as 'USA'. And the line `employee["contactNumber"] = 9874563215;` will add the key 'contactNumber' to the object and set it's value to 9874563215. Hence when we print the object using console.log(employee); it will give below result.

```
{firstName: 'Sheldon', lastName: 'Cooper', age: 36, company: 'BBT', skills: Array(4), …}

age: 36
company: "BBT"
contactNumber: 9874563215
firstName: "Sheldon"
lastName: "Cooper"
location: "USA"
skills: (4) ['Javascript', 'Python', 'Azure', 'Physics']
```
