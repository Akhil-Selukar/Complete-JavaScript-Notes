## 37.8 Flat and FlatMap method

Consider we have an array of array i.e. an array which has its elements as another array. And we want to create a single array out of it, then in this case flat() method is used. Have a look at below example.

```javascript
const score_IND = [
  [0, 2, 4, 1, 6, 0],
  [3, 4, 2, 1, 0, 4],
];

console.log(score_IND.flat());
```

Here we have an array called score_IND which contains two subarrays representing the two overs, and each element inside the subarray represents the run scored per ball in that over. Now if we want to create a single array which will contain the runs scored on last 12 balls then we can use the flat method just as `score_IND.flat()` in above example. The output of above example will be.

```
[0, 2, 4, 1, 6, 0, 3, 4, 2, 1, 0, 4]
```

From above output we can see that flat method flattens the nested array. But here the important thing to note is flat() method by default only work for one level of nesting if we want to make it work for more nested array then we explicitly have to specify the depth. Have a look at below example.

```javascript
const nestedArray = [
  [1, ["a", "b"]],
  [2, 3, ["c", "d"]],
];

console.log(nestedArray.flat());
console.log(nestedArray.flat(2));
```

In above example we have a nested array with 2 level of nesting i.e. we have an array which contain array and inside those arrays also we have array. so if we apply just flat() method here we will get output like `[1, [a, b], 2, 3, [c, d]]`. Here we can see that we still have some arrays as it is. So to make flat() method work with nesting greater than 1 we have to specify it like `nestedArray.flat(2)`. Now in this case the output will be as expected i.e. `[1, 'a', 'b', 2, 3, 'c', 'd']`.

Now to see the usecase of this method let's take an example where we have a cricket match 'match_1' between two teams team_1 and team_2. We have two object one for each team and those objects stores team name, number of players in that team and runs scored by that team in two overs (just like in first example above). Here the task is to calculate the total runs scored in this match by both the teams. Have a look at below code.

```javascript
const team_1 = {
  teamName: "IND",
  players: "11",
  runsInTwoOvers: [0, 2, 4, 1, 6, 0],
};

const team_2 = {
  teamName: "NZ",
  players: "13",
  runsInTwoOvers: [4, 0, 1, 0, 4, 2],
};

const match_1 = [team_1, team_2];

const totalRunsScored = match_1
  .map((team) => team.runsInTwoOvers)
  .flat()
  .reduce((total, run) => total + run, 0);

console.log(totalRunsScored);
```

Here if we see, we are getting the runsInTwoOvers by using map() method and then on that we are applying flat(2) method to get an array of all the runs scored by both the teams in a single array. Once we got the array having runs scored by both the team we are reducing the array to a single value by adding all the values in that array.

Now in production grade programms we use this combination of map and flat very often hence to simplify the above code a new method called flatMap() is introduced which is the combinatio of map() and flat(). So the above code can be reduced to.

```javascript
const team_1 = {
  teamName: "IND",
  players: "11",
  runsInTwoOvers: [0, 2, 4, 1, 6, 0],
};

const team_2 = {
  teamName: "NZ",
  players: "13",
  runsInTwoOvers: [4, 0, 1, 0, 4, 2],
};

const match_1 = [team_1, team_2];

const totalRunsScored = match_1
  .flatMap((team) => team.runsInTwoOvers)
  .reduce((total, run) => total + run, 0);

console.log(totalRunsScored);
```

The output of both the above code will be same i.e. 24.

> It is important to note that flatMap() method work only with single level of nesting.
