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

const { firstName, contactNumber, publications } = john;

console.log(firstName);
console.log(contactNumber);
console.log(publications);

// const {
//   firstName: author,
//   contactNumber: mobileNumber,
//   publications: booksPublished,
// } = john;

// console.log(author);
// console.log(mobileNumber);
// console.log(booksPublished);

// const {
//   firstName: author,
//   contactNumber: mobileNumber = 9999999999,
//   publications: booksPublished = {},
//   workEx: experience = 0,
// } = john;

// console.log(author);
// console.log(mobileNumber);
// console.log(booksPublished);
// console.log(experience);

// const {
//   mongoDBBook: { title, cost },
// } = publications;

// console.log(`Title : ${title}`);
// console.log(`Cost : ${cost}`);

// john.publishBook({
//   cost: 500,
//   title: "Fun with flags",
// });
