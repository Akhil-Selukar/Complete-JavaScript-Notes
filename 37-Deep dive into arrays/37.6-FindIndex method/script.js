"use strict";

const runsThisOver = [0, 2, 4, 1, 6, 0];

const indexForSixRuns = runsThisOver.findIndex((run) => run === 6);
console.log(indexForSixRuns);

const indexForZeroRuns = runsThisOver.findIndex((run) => run === 0);
console.log(indexForZeroRuns);
