// Exporting module

console.log("Loading posts data.");

const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
console.log("fetched post done");
const postData = await posts.json();
await fetch("https://jsonplaceholder.typicode.com/comments");
console.log("fetched comments done");
await fetch("https://jsonplaceholder.typicode.com/photos");
console.log("fetched photos done");

console.log("Loaded all data for posts");

export const displayLastPost = function () {
  console.log(postData.at(-1).title);
};
