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

const case1 = "Sheldon Cooper";
const emailId = "   SheldonCooper@bbt.com   ";

console.log(case1.toLowerCase());
console.log(case1.toUpperCase());

console.log(emailId.toLowerCase());
console.log(emailId.trim());
console.log(emailId.toLowerCase().trim());

console.log(emailId.trimStart());
console.log(emailId.trimEnd());

const line1 = "Two documents are missing.";

const result = line1.replace("Two", "Couple of");
console.log(result);

const result2 = line1.replace("Two", "Couple of").replace("missing", "found");
console.log(result2);

const billString =
  "There are two items in your cart and your bill amount is two thousand and eighty two.";

console.log(billString.replace("two", "three"));
console.log(billString.replaceAll("two", "three"));

console.log(billString.startsWith("Hello"));
console.log(billString.startsWith("There"));
console.log(billString.endsWith("five."));
console.log(billString.endsWith("two."));
console.log(billString.includes("bag"));
console.log(billString.includes("cart"));

const sheldon = {
  fullName: "sheldone cooker",
  friends: ["penny", "leonard", "amy", "raj", "bernadatte", "howard"],
};

const [firstName, lastName] = sheldon.fullName.split(" ");
console.log(firstName);
console.log(lastName);

const allFriends = sheldon.friends.join(", ");
console.log(allFriends);

const capitalizeName = function (userName) {
  const allWords = userName.split(" ");
  const formattedWords = [];

  for (const word of allWords) {
    formattedWords.push(word.replace(word[0], word[0].toUpperCase()));
  }
  return formattedWords.join(" ");
};

const formattedName = capitalizeName(sheldon.fullName);
console.log(formattedName);

// Padding the string
const firstString = "Hello";
const secondString = "This string is more than 10 character long";

console.log(firstString.padStart(10, "*"));
console.log(secondString.padStart(10, "*"));

console.log(firstString.padEnd(10, "*"));
console.log(secondString.padEnd(10, "*"));

const alert = "ALERT..!!⚠️";

console.log(alert.repeat(10));
