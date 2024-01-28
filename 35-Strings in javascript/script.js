"use strict";

const showName = "Big Bang Theory";
const season = "Season 1";

console.log(season[0]);
console.log(season[1]);
console.log(season[2]);
console.log(season[7]);
console.log(Number(season[7]));

console.log(season.length);

console.log(showName.indexOf("B"));
console.log(showName.indexOf("g"));
console.log(showName.lastIndexOf("B"));
console.log(showName.lastIndexOf("g"));

console.log(showName.indexOf("Bang"));
console.log(showName.indexOf("bang"));

console.log(season.charAt(3));

console.log(showName.slice(4));
console.log(showName.slice(4, 8));
console.log(season.slice(season.indexOf(" ") + 1));
console.log(season.slice(-1));
