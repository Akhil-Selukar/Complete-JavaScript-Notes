## 34 Maps in javascript

Map is a datastructure in javascript that maps values to keys. It is similar to objects because in maps as well we store data in key value pairs just like objects. The difference between map and object here is, in map key can be of any type where as in object key is of string type only. By any type mean literally any type, in map key can be string, number or even object as well. The simplest way to create a map in javascript is to declare an empty map first and then set values to that map. Have a look at below code which demonstrate all the above points.

```javascript
"use strict";

const penny = new Map();
penny.set("firstName", "Penny");
penny.set(1, "Leonard");

console.log(penny);
```

In the above code we declared a empty map 'penny' `const penny = new Map();` then by using line `penny.set("firstName", "Penny");` we are adding 'firstName' key and value associated with it as 'Penny'. Similarly at line `penny.set(1, "Leonard");` we are assigning 1 as a key which is a numeric key and a value of 'Leanord' which represent one of penny's friend. When we print the map we get below result.

```
{
  'firstName' => 'Penny',
  1 => 'Leonard'
}
```

In the above result we can see that we have string as well as numeric key.

Now one of the important thing to note while adding properties to a map is that set method after adding the property return the updated map. Hence we can apply a chain of set methods to set multiple propertirs. Have a look at below example.

```javascript
"use strict";

const penny = new Map();
penny.set("firstName", "Penny");
penny.set(1, "Leonard");

console.log(penny.set(2, "Sheldon"));
```

The output of above program is

```
{
  'firstName' => 'Penny',
  1 => 'Leonard',
  2 => 'Sheldon'
}
```

Here it is clear that after setting the 2nd friend using set method the set method returned the updated map itself. Hence to add further properties like few more friends and penny's job related details we can simply apply a chain of set method like below.

```javascript
"use strict";

const penny = new Map();
penny.set("firstName", "Penny");
penny.set(1, "Leonard");

penny
  .set(2, "Sheldon")
  .set(3, "Bernadette")
  .set(4, "Raj")
  .set(5, "Amy")
  .set(6, "Howard")
  .set(true, "Penny is a waitress")
  .set(false, "Penny is a physicist");

console.log(penny);
```

Here we have created a chain of set methods and added five more friends to penny. At line `.set(true, "Penny is a waitress")` and `.set(false, "Penny is a physicist")` we have used a boolean values as key. the output of above code will be.

```
{
  'firstName' => 'Penny',
  1 => 'Leonard',
  2 => 'Sheldon',
  3 => "Bernadette",
  4 => "Raj",
  5 => "Amy",
  6 => "Howard",
  true => "Penny is a waitress",
  false => "Penny is a physicist"
}
```

To get any specific property value we can use get method and specify which peoperty we want to read.

```javascript
"use strict";

const penny = new Map();
penny.set("firstName", "Penny");
penny.set(1, "Leonard");

penny
  .set(2, "Sheldon")
  .set(3, "Bernadette")
  .set(4, "Raj")
  .set(5, "Amy")
  .set(6, "Howard")
  .set(true, "Penny is a waitress")
  .set(false, "Penny is a physicist");

console.log(penny.get("firstName"));
console.log(penny.get(4));
console.log(penny.get(false));
console.log(penny.get("4"));
```

Here we have used String key, numerical key and boolean key to fetch the value out of the map. The important thing to note here is that the key must be the exact match "4" and 4 will be different one is string value and another is numeric and in map we have used numeric hence string "4" will give `undefined` value. The output of above code is

```
Penny
Raj
Penny is a physicist
undefined
```

As of now it is very clear that everything revolves around the keys when we work with maps, so inside maps duplicate keys are not allowed. If we try to use duplicate key then the old value stored against that key gets replaced with the new value.

```javascript
const orderItems = new Map();

orderItems
  .set(1, "Pizza")
  .set(2, "Pasta")
  .set(3, "French toast")
  .set(2, "Coffee");

console.log(orderItems);
```

In above code we have used key 2 twice, once for the value "Pasta" and second time for the value "Coffee". Now look at the output below, "pasta" is not present in the output we can only see "Coffee" assigned to the key 2.

```
{
  1 => 'Pizza',
  2 => 'Coffee',
  3 => "French teast",
}
```

To check if a property is present in given map we can use 'has()' method. 'has()' method check for the key and not for the value, which means that if the provided key is present then has() method will return `true` else it will return `false`.

```javascript
const orderItems = new Map();

orderItems.set(1, "Pizza").set(3, "French toast").set(2, "Coffee");

console.log(orderItems.has(1));
console.log(orderItems.has("Pizza"));
```

In the above example first console.log() will give `true` because the key 1 is present in orderItem map but second console.log() will give false as "Pizza" is not present as key anywhere in the orderItems map.

```
true
false
```

We can also delete any property from map using delete() method and this method also works based on 'key'.

```javascript
const orderItems = new Map();

orderItems.set(1, "Pizza").set(3, "French toast").set(2, "Coffee");

orderItems.delete(3);
console.log(orderItems);
```

In the above example the entry in map associated with key 3 will be deleted. Hence the output will be.

```
{
  1 => 'Pizza',
  2 => 'Coffee'
}
```

We can use size property of map to get the nuber of elements present in the map. And also we can clear the complete map by using clear() method.

```javascript
const colors = new Map();

colors.set(1, "Red").set(2, "Green").set(3, "Blue").set(4, "Orange");

console.log(colors.size);
colors.clear();
console.log(colors.size);
```

The output of above example will be.

```
4
0
```

First it gave 4 because there were 4 elements present in colors map and then we called clear() method which cleared the map and hence we got size 0 after clearing.

Now as mentioned in the begining of this article, in map we can set any object or array as a key. Let's have a look over it once.

Consider below example.

```javascript
const theMap = new Map();

theMap.set([1, 2], "Map value");

console.log(theMap.get([1, 2]));
```

Now in above code the output expected is `Map value`. But if we actually check the output of above code it will be `undefined`. This is because in memory arrays are not stored as it is, instead their memory location is stored. Hence in the above example even the the two array (one while setting the value and another while getting the value) looks same but they are at two different memory locations and hence the result is undefined. To fix above issue we can modify the code as below.

```javascript
const theMap = new Map();
const keyArray = [1, 2];

theMap.set(keyArray, "Map value");

console.log(theMap.get(keyArray));
```

Now in this case the output will be as epected. i.e. `Map value`.

As of now it is hard to understand the actual usecase of this type of implementation of using Object as a key but while working with DOM in real world applications it is common to fetch Object inside the DOM by using queryselector and using it as a key in map.
