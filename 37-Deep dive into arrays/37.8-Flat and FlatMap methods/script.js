"use strict";

const score_IND = [
  [0, 2, 4, 1, 6, 0],
  [3, 4, 2, 1, 0, 4],
];

console.log(score_IND.flat());

// ----------------------

const nestedArray = [
  [1, ["a", "b"]],
  [2, 3, ["c", "d"]],
];
console.log(nestedArray.flat());
console.log(nestedArray.flat(2));

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

const totalRunsScored_new = match_1
  .flatMap((team) => team.runsInTwoOvers)
  .reduce((total, run) => total + run, 0);

console.log(totalRunsScored_new);
