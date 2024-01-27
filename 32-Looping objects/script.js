"use strict";

const users = {
  sheldon: {
    userName: "Sheldon cooper",
    password: "xxxxxxxxxx",
  },
  leonard: {
    userName: "Leonard Hofstadter",
    password: "aaaaaaaaaa",
  },
  penny: {
    userName: "Penny",
    password: "bbbbbbbbbb",
  },
};

// // loop over keys.
// console.log(Object.keys(users));

// for (const user of Object.keys(users)) {
//   console.log(user);
// }

// // loop ovre values.
// console.log(Object.values(users));

// for (const detail of Object.values(users)) {
//   console.log(detail?.userName ?? "Username not available");
// }

// loop over entries.
console.log(Object.entries(users));

// for (const entry of Object.entries(users)) {
//   console.log(
//     `For ${entry[0]}, username is "${entry[1].userName}" and password is ${entry[1].password}`
//   );
// }

for (const [key, { userName, password }] of Object.entries(users)) {
  console.log(
    `For ${key}, username is "${userName}" and password is ${password}`
  );
}
