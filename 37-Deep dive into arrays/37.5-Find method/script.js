"use strict";

const runsThisOver = [0, 2, 4, 1, 6, 0];

const firstBoundary = runsThisOver.find((run) => run >= 4);

console.log(firstBoundary);

// const user1 = {
//   fullName: "Sheldon cooper",
//   userName: "sc",
//   password: "1234",
// };

// const user2 = {
//   fullName: "Leonard hofstadert",
//   userName: "lh",
//   password: "1234",
// };

// const user3 = {
//   fullName: "Penny",
//   userName: "pe",
//   password: "1234",
// };

// const users = [user1, user2, user3];

// const Penny = users.find((user) => user.userName === "pe");
// console.log(Penny);
