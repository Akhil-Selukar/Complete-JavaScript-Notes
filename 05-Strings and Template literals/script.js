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
