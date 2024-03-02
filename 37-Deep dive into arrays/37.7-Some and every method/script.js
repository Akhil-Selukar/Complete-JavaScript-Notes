"use strict";

const runsThisOver = [0, 2, 4, 1, 6, 0];
const runsLastOver = [4, 6, 4, 4, 6, 4];
const successfulOver = [0, 1, "w", 2, 4, 0];

const anyBoundary = runsThisOver.some((run) => run >= 4);
console.log(anyBoundary);

const anyWicket = runsThisOver.some((run) => run === "w");
console.log(anyWicket);

const allBoundary = runsThisOver.every((run) => run >= 4);
console.log(allBoundary);

const allBoundaryLastOver = runsLastOver.every((run) => run >= 4);
console.log(allBoundaryLastOver);

const anyWicketSuccess = successfulOver.some((run) => run === "w");
console.log(anyWicketSuccess);
