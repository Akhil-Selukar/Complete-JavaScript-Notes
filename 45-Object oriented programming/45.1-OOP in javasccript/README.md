## 45.1 OOP in javascript

Before understanding how OOP works or implemented in javascript we must understand what is OOP (Object Oriented Programming).

So the object oriented programming is a programming style (way of structuring or organizing our code) based on object. In this programming style or in OOP we use objects to describe real-world or abstract features like book, user, song, etc. Object contains properties which tells us more about the object and methods which describes the behaviour or what all things that object can do. For example if we consider book as a object then title, author, numberOfPages, price, publicatiion, etc will be the property of book object while print(), generatePdf(), generateAudioBook() there are the methods or behaviour of the book or what all things we can do with the book. Now in the OOP we treat each entity as an object and we make the object interact with each another to generate desired output. This interaction between objects happen via public methods of the objects which are exposed by interfaces.

Now as we know that object oriented programming revolves around objects, so how we can create the object then? Well we can create objects using classes. So what are classes now? The simple explaination to this is classes are blueprints to create objects. The best example is of a building with multiple floors, while creating building architect does not create floor map for each and every individual floor. Only one or two maps are created and then each floor is build based on that plan only. So here the plan is nothing but the blueprint for creating the floor. In same way classes are nothing but the blueprint for creating objects. So we can define objects as instance of classes.

Now there are four different concepts when in comes to OOP. Those are.

1. Abstraction
2. Encapsulation
3. Inheritance
4. Polymorphism

What exactly all this concepts are?

### 1. Abstraction:

Abstraction means exposing or showing only the required things/functionalities and hiding the details. For example if we take an exampe of ATM machine, we as a user will get options like withdrawal of money, balance check, changing the ATM pin, money transfer and deposit. But at backend the machine does more tasks to accomplish your request. Like reading the account details from your inserted card, checking with bank database that the account is active or inactive, checking the account balance, verifying the entered password/pin, counting the amount requested, deducting that amount from your accounts balance, logging the transection, giving the money to user, closing the users transection, etc. As an end user we are not bothered about these processes. So ATM machine hide this implementation details and show only those functionalities to user which are necessary. This is called abstraction.

### 2. Encapsulation:

Encapsulation means protecting the data of an object from outside world (i.e. restricting direct access to the properties of an object) and providing public methods to access the properties, by this we can prevent the accedental modification of object. The best example of this is a vending machine, in vending machine we can see what all products are there in it but those are protected by a glass shield and we can not directly access those products. But we are provided with a method to get the product out of the machine. This is exactly what encapsulation means. It pack all methods and attributes just like a capsule and provide access to the propertie or attributes via public methods.

### 3. Inheritance:

Inheritance is nothing but reusing the properties of parent by it's child. For example if we consider one object as user which stores firstName, lastName, age and mobileNumber. And the user has only read access to the application. Now if we consider an admin object which has firstName, lastName, age and mobileNumber, the admin has read access as well as write access to the application. So here we can see that the Admin is nothing but another user with some additional properties, access and methods. So er can say that the admin is extending user with some properties and methods. So admin can be considered as a special type of user or a child to user which has all the properties of it's parent (user) with some of it's own unique properties. This concept of inheriting properties from parent is called inheritance.

### 4. Polymorphism:

Polymorphism means a child can implement the inherited method is different way. That means multiple child classes can have different implementation of the inherited methods. For example if we consider the same example as that of the above one (user and admin), if we another type of user called superUser. Superuser has more access on the application than admin. Now admin and superUser both implements the login functionality which they inherited from the parent i.e. user. But for admin to login we only need username and password, but superUser need username, password plus OTP sent on the mobile number. In this case we can see that both admin and superuser had implemented the inherited method of authentication from parent, but both of them have their own way of doing the authentication. This is nothing but the polymorphism. Here the Authenticate/login method has two different implementation in two different child.

## How OOP is implemented in Javascript

In Javascript we don't have regular classes so that we can instantiate an object from that class. In javascrpit we have prototypes where objects are linked to the prototype object and this is called as prototypal inheritance or delegation. The object which is linked to the prototype can access methods in the prototype. So in other words behaviours/methods of prototype is delegated to the linked prototype object hence it is called as sdelegation as well.

Now the questions are how can we create the prototypes? How can we link the objects to the prototypes? or how we can create objects in javascript.
So in javascript we have three different techniques those are.

1. Constructor function - This is a technique to create objects from a function. Traditionally this was the only way to implement OOP in javascript and hence the build in functions in javascript like Arrays, Maps, Set, etc are implementes using this.
2. ES6 Classes - This is the more modern way to implement OOP in javascript. ES6 introduces classes in javascript, however these classes are not like the classes we discussed above. These are just abstraction over Constructor functions.

3. Object.create() method - This is the most easiest and straight forward way to link an object to prototype. But this is not used that ofter, we will see further in details.
