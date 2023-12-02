// logical AND i.e. &&
console.log(true && true);
console.log(true && false);
console.log(false && true);
console.log(false && false);

// logical OR i.e. ||
console.log(true || true);
console.log(true || false);
console.log(false || true);
console.log(false || false);

// logical NOT i.e. !
console.log(!true);
console.log(!false);

const hasLifelines = false;
const isLost = true;

if (hasLifelines && isLost) {
  console.log("Press start to play again..!!");
} else {
  console.log("Sorry, game over..!!");
}

// Important note
console.log(null && true);
console.log("hello" && true);
console.log("hello" && false);
console.log("hello" && "world");

console.log(null || true);
console.log("hello" || true);
console.log("hello" || false);
console.log("hello" || "world");
console.log(false || "world");
console.log(true || "world");

console.log(!"");
console.log(!"hello");
console.log(!null);
console.log(!undefined);
