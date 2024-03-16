## 41 Date and Time in javascript

While building real world applications we need to work with dates and time frequently. Hence date and time is one of the most important thing in javascript.

To use date in javascript we have to create the date first and there are 4 ways using which we can create date in javascript.
All the 4 ways use `new Date()` constructor function but the parameters to the constructor is different.

```javascript
"use strict";

const now = new Date();
console.log(now);
```

In the above code we have used `new Date()` constructor without any parameter hence it gives the date and time of that instance when that function is called. The output of above code will be something like below.

```
Sat Mar 16 2024 12:59:08 GMT+0530 (India Standard Time)
```

Now if we want to parse some string into date, for example we have got some transaction date from an API response in string format and we want to convert that string into date then we can use `new Date()` constructor and pass the string to it and javascript will convert it to the date object.

```javascript
const newYear = new Date("January 01 2023 00:00:00");
console.log(newYear);

const christmas = new Date("Dec 25, 2023");
console.log(christmas);

const transactionDate = new Date("2020-12-24T09:12:34.457Z");
console.log(transactionDate);
```

In above example first we have passed `January 01 2023 00:00:00` String to the date constructor, so javascript will convert the string to date format and will identify what day it was on 1st Jan, 2023 and set the time to 0 hr 0 min and 0 sec.

In second example we have just passed `Dec 25, 2023` to the date constructor, in this case as well javascript Date class is smart enough to identify that it is December month of 2023 and 25th day. As no timestamp is given hence javascript will automatically add 0, 0, 0 for Hr, Min and Sec.

In Third example we have given a code generated timestamp/time signature to the Date constructor. In this case as well javascript will convert the string to proper date object. Here 'Z' means the UTC timezone. In above example the Date() constructor will convert the time in the local timezone. As the here the timezone is IST so the result will have the adjustment in timezone (i.e. conversion from UTC to IST).

The overall result for above code will be.

```
Sun Jan 01 2023 00:00:00 GMT+0530 (India Standard Time)
Mon Dec 25 2023 00:00:00 GMT+0530 (India Standard Time)
Thu Dec 24 2020 14:42:34 GMT+0530 (India Standard Time)
```

Now apart from above two types we can pass year, month, day, hr, min, sec values as constructor parameters in Date constructor.

```javascript
const newDate = new Date(2020, 7, 13, 12, 38, 43);
console.log(newDate);
```

In above example we have passed 2020 as year, 7 as month, 13 as day, 12 as Hr, 38 as min and 43 as seconds. Hence the output of abovce code will be.

```
Thu Aug 13 2020 12:38:43 GMT+0530 (India Standard Time)
```

Here if you observe we have given the month value as 7 which should be 'July' but in output we got 'August'. This is because in javascript month counting starts from 0 (i.e. 0 based month system 😵, weird but true.)

Now the last way to create a date is to use number of milliseconds from the unix time (1st Jan, 1970). Have a look at below example.

```javascript
const unixDate = new Date(0);
console.log(unixDate);

// 4 * 24 * 60 * 60 * 1000 = 345600000
const fourDayPastUnixDate = new Date(345600000);
console.log(fourDayPastUnixDate);
```

The output of above code will be.

```
Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)
Mon Jan 05 1970 05:30:00 GMT+0530 (India Standard Time)
```

Here when we pass 0 milliseconds thatmeans we are getting the start value or Unix date value hence we got `Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)`, Now when we pass '345600000' which is the value of milliseconds in 4 days. Then we got the date exactly 4 days after the unix date. i.e. `Mon Jan 05 1970 05:30:00 GMT+0530 (India Standard Time)`

<hr>

Now just like other objects, Date also has some method which we can use to do some operations on date. Below are few of the commonly used method on Date object.

```javascript
const myDate = new Date("March 07 2023 05:43:12");
console.log(myDate);

console.log(myDate.getFullYear());
console.log(myDate.getMonth());
console.log(myDate.getDate());
console.log(myDate.getDay());
console.log(myDate.getHours());
console.log(myDate.getMinutes());
console.log(myDate.getSeconds());
console.log(myDate.toISOString());
console.log(myDate.getTime());

myDate.setFullYear(2025);
console.log(myDate);

console.log(Date.now());
```

In above example we can see that there is a get method to get each and every part of the date and time. The thing to notice here is that the month in the javacript is 0 based hence for March which is 3rd month we will get 2. And the `getDay()` method does not give you which day of the month it is, this method gives you the value of which day of week it is. To get the day in month we have to use `getDate()` method. The `.getTime()` method gives the value of milliseconds passed after the unix date.

Now apart from methods to get each and every part of date we have methods to set each and every part as well. One example of it is given in above code `myDate.setFullYear(2025);`. Here we are setting the year value of the date to 2025 and if we print the date after that we get the modified date. Here one thing to notice is that javascript adjust the date according to the calendar. Hence if we change the year in above example 'Tuesday' became 'Friday'

The output of above code is

```
Tue Mar 07 2023 05:43:12 GMT+0530 (India Standard Time)
2023
2
7
2
5
43
12
2023-03-07T00:13:12.000Z
1678147992000
Fri Mar 07 2025 05:43:12 GMT+0530 (India Standard Time)
1710576657646
```

The another important method is `Date.now()`, this method returns the number of milliseconds passed from unix date till this perticulat instance of time.
