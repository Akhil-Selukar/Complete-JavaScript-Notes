"use strict";

const now = new Date();
// console.log(now);

// const dateFormat_US = new Intl.DateTimeFormat("en-US").format(now);
// console.log(dateFormat_US);

// const dateFormat_GB = new Intl.DateTimeFormat("en-GB").format(now);
// console.log(dateFormat_GB);

const formatOption = {
  day: "numeric",
  month: "short",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric",
  weekday: "long",
};

// const dateFormat_US = new Intl.DateTimeFormat("en-US", formatOption).format(
//   now
// );
// console.log(dateFormat_US);

// const dateFormat_GB = new Intl.DateTimeFormat("en-GB", formatOption).format(
//   now
// );
// console.log(dateFormat_GB);

// const dateFormat_IN = new Intl.DateTimeFormat("hi-IN", formatOption).format(
//   now
// );
// console.log(dateFormat_IN);

const languageCode = navigator.language;
console.log(languageCode);

const dateFormat = new Intl.DateTimeFormat(languageCode, formatOption).format(
  now
);
console.log(dateFormat);
