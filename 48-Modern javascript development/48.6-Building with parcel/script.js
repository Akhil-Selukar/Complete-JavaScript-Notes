import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";

const realObject = {
  user: {
    fullName: "Sheldon Cooper",
    workPlace: "Caltech university",
    age: 26,
  },
  skills: [
    { skillName: "Physics", rating: 5 },
    { skillName: "Maths", rating: 4 },
    { skillName: "Biology", rating: 3 },
  ],
};

const normalClone = Object.assign({}, realObject);
const deepCloned = cloneDeep(realObject);

realObject.user.age = 27;

console.log(realObject);
console.log(normalClone);
console.log(deepCloned);
