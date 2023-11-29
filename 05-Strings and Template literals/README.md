## 05 Javascript string and template literals

Template literals also called as 'backticks' ` (``) ` are used to generate string from various constants or variables. Have a look at below example.

Consider we have details of an employee saved in various variables/constants and we want to generate the introduction line for the employee.

```javascript
const firstName = "Akhil";
const yearOfBirth = 1999;
const jobProfile = "Developer";

// Normal way of generating string
const introduction =
  "Hi I'm " +
  firstName +
  ", I'm " +
  (2040 - yearOfBirth) +
  " years old. By profession I'm a software " +
  jobProfile;

console.log(introduction);

// Template literals way of generating string
const newIntroduction = `Hi I'm ${firstName}, I'm ${
  2040 - yearOfBirth
} years old. By profession I'm a software ${jobProfile}`;

console.log(newIntroduction);
```

The out of above code is,

```
Hi I'm Akhil, I'm 41 years old. By profession I'm a software Developer
Hi I'm Akhil, I'm 41 years old. By profession I'm a software Developer
```

In above example in normal way of generating the String We can clearly see that is is a bit difficult to write and we can easily miss some spaces or + operator or variable name. While in template literal way of generating string it is more simple and easy to write. Template literla string must start with backtick i.e. ` symbol.

We can also create multiline string using template literals. Previously before ES6 we ussed to use `\n\` at the end of each line in an multiline string. Now starting from ES6 after introduction of template literals we can simply write multiline string in template literals and it will work. See below example for better understanding.

```javascript
// multiline String without template literals
const comment =
  "This is \n\
my first \n\
multiline comment.";

console.log(comment);

// multiline String with template literals
const newComment = `This is
my first 
multiline comment.`;

console.log(newComment);
```

The output of above code is,

```
This is
my first
multiline comment.

This is
my first
multiline comment.
```

Here we can clearly see that second way of writing multiline strings is much more cleaner.
