"use strict";

const arr_1 = new Array(8);
// console.log(arr_1);

// arr_1.fill(3);
// console.log(arr_1);

arr_1.fill(3, 3, 6);
console.log(arr_1);

// const arr = [1, 2, 3, 4, 5, 6];
// arr.fill("A", 2, 4);
// console.log(arr);

// const arr_2 = Array.from({ length: 7 });
// console.log(arr_2);

// const arr_2 = Array.from({ length: 7 }, () => 1);
// console.log(arr_2);

const arr_2 = Array.from({ length: 7 }, (_, index) => index + 1);
console.log(arr_2);
