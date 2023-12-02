console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean(undefined));
console.log(Boolean(NaN));
console.log(Boolean(null));

console.log(Boolean({}));
console.log(Boolean("Hello"));
console.log(Boolean(210));

let lifeLine = 0;
if (lifeLine) {
  console.log("Press start to start again.!!");
} else {
  console.log("Game over..!!");
}

lifeLine = 1;
if (lifeLine) {
  console.log("Press start to start again.!!");
} else {
  console.log("Game over..!!");
}
