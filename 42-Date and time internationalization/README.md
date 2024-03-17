## 42 Date and time internationalization

Javascript probvides internationalization (Intl) API to format the date and time based on different countries and language standards.
The date and time printed by below code is in the default format which javascript uses to represent date and time.

```javascript
const now = new Date();
console.log(now);
```

Output:

```
Sun Mar 17 2024 12:32:53 GMT+0530 (India Standard Time)
```

Now, if we want to format this date and time to US (i.e. United States) and GB (i.e. United Kingdom) format then we can use internationalization API as below.

```javascript
const now = new Date();

const dateFormat_US = new Intl.DateTimeFormat("en-US").format(now);
console.log(dateFormat_US);

const dateFormat_GB = new Intl.DateTimeFormat("en-GB").format(now);
console.log(dateFormat_GB);
```

In above case we are using date time format of internationalization API and we are passing the language code and then asking to format the date stored in 'now' variable. Here 'en-US' means the english language in United States format while 'en-GB' means the english language in United Kingdom format. Now if we see the output of above code then the date will be formatted in therespective format.

```
3/17/2024
17/03/2024
```

Here we can see that the first output is 3/17/2024 i.e. month is first then date and then year, while the second output is `17/03/2024 i.e. date first, then month and then year. Here there is one problem, we can't see the time in this case. SO to fix this we can pass another argument to the Intl.DateTimeFormat() which is the formatOption. In formatOption object we can specify the format in which we want the date and time to be formatted also we can specify what values we want and what values we dont want. have a look at below example.

```javascript
"use strict";

const now = new Date();

const formatOption = {
  day: "numeric",
  month: "short",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric",
  weekday: "long",
};

const dateFormat_US = new Intl.DateTimeFormat("en-US", formatOption).format(
  now
);
console.log(dateFormat_US);

const dateFormat_GB = new Intl.DateTimeFormat("en-GB", formatOption).format(
  now
);
console.log(dateFormat_GB);
```

Here in above code we have created an object 'formatOption' where we have specified what all values we need and in which format we need those values to be formatted. We then passed this object to the Intl.DateTimeFormat() API and now if we see the result.

```
Sunday, Mar 17, 24, 12:54 PM
Sunday, 17 Mar 24, 12:54
```

In above result we can see that we got completly different and customized format of date and time. In formatOption we have specified day as numeric hence we got 17 as date, then we have specified month as short hence we got 'Mar' which is short form of 'March' similarly we got 'Sunday' as weekday in log format and so on. using this second argumrnt to the Intl.DateTimeFormat() we can customize the format of date and time. Now still there is one problem remainint. In above code we are manually setting the language code. Hence changing this code every time user logs in from different location is not possible. It should take the system's or browsers language code and work as per that. This can be achieved as below.

```javascript
const now = new Date();

const formatOption = {
  day: "numeric",
  month: "short",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric",
  weekday: "long",
};

const languageCode = navigator.language;
console.log(languageCode);

const dateFormat = new Intl.DateTimeFormat(languageCode, formatOption).format(
  now
);
console.log(dateFormat);
```

Here we are reading the language code from navigator. This gives us the language code set in browser and we can use the same in the code. So if the user is based out of UK then the language code set in his/her system's browser will be 'en-GB' while if the user is from US then the language code in his/her system will be 'en-US' so we can use this way to dynamically assign the language code.

In above example the language code in my system's browser is 'en-US' and thence the date got formatted in 'US' format and I got below output.

```
en-US
Sunday, Mar 17, 24, 1:03 PM
```
