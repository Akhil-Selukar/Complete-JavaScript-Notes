// type conversion
const accountBalance = "2000";

console.log(typeof accountBalance);
console.log(accountBalance + 100);
console.log(typeof Number(accountBalance));
console.log(Number(accountBalance) + 100);
console.log(typeof 200);
console.log(typeof String(200));
console.log(Number("John"));
console.log(typeof NaN);

// type coercion
console.log("Line number " + 14 + " shows type coercion example.");
console.log("Line number " - 14 - " shows type coercion example.");
console.log("5" - 2 - "1");
console.log("5" * 2);
console.log("5" / 2);

let num = "1" + 1;
num = num - 1;
console.log(num);
