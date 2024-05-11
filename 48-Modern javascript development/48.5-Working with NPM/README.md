## 48.5 Working with NPM (Node Package Manager)

Earlier while working with geolocation API we used leaflet library. And to add that library to our program we added a script tag in our html file before main script.js so that leaflet library get loaded first. Now this is the older way of importing lbraries. Consider your project has 20 such libraries which you want to use. In that case it is not a good practice to load 20 different libraries from html page, neither it is good to download the packages manually and install it to the computer. This approaches might not work with large projects as we can miss some packages, we can mess with versions and it makes the application very heavy (consider transfering your application having 20 different libraries having hundreds of files). So the better solution here is to use a package manager (NPM i.e. node package manager)

What NPM does for us is it creates a package.json file which contains details of all the packages we need in our application. Whenever we want to setup the application on a new system, we just have to transfer our actual appllication code with package.json file and then we can run NPM command and NPM will do the magic. It will read all the dependencies listed in package.json and download those packages for us and we will not have to do it manually. If we want to update the version of any of the package/library we can just go to package.json and update it there and done.

To run npm commands we must have nodejs installed on our system (If you dont have nodejs install, then just visit [Nodejs download](https://nodejs.org/en/download), download the latest version of nodejs and install it to your system.)

> Note : To check if we have npm installed in our system we can just run command `npm -v` in terminal, if it return the version number then we are good to go.

Now in each project where we want to use npm, we have to add npm and that can be done by running below command in the project folder.

```
npm init
```

As soon as yoou run the command in the project folder, it will ask you some questions about your project like, package name, version, short description about project, entry pont of the project, Author, licence, etc.. (you can add the details or press enter to keep the default values). Once you answer the questions it will create a file named `package.json` in your project folder, that file will look like below.

```json
{
  "name": "48.5-working-with-npm",
  "version": "1.0.0",
  "description": "",
  "main": "script.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Akhil Selukar",
  "license": "ISC"
}
```

This file will contain all the information about your project and the dependencies you need to run this project.

Now to add dependency using npm we will see an example and add dependency [Lodash](https://lodash.com/) which is a modern javascript library which provide utility functions for common programming tasks.

To add Lodash dependency in our project instead of adding a script tag in html we can use npm and just run below npm command in project location. (we are using ES compatible version of Lodash i.e. lodash-es)

```
npm install lodash-es
```

Once the command is triggered it will add an dependency entry in `package.json` file and download and add the lodash package in 'node_modules' folder

```json
{
  "name": "48.5-working-with-npm",
  "version": "1.0.0",
  "description": "",
  "main": "script.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Akhil Selukar",
  "license": "ISC",
  "dependencies": {
    "lodash-es": "^4.17.21"
  }
}
```

Now we can simply import any function form lodash package in our program.

For example we will import cloneDeep function from lodash module which is used to deep clone an object (i.e. to create completly new copy of an object). Have a look at below code.

```javascript
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
```

The output of above code will have three objects printed in which first two will have age as 27 while the third one will have age as 26.

Here in above code we have imported cloneDeep from '/node_modules/lodash-es/cloneDeep.js'. After importing we used this function to clone the 'realObject' after normal cloning and deep cloning, when we change age property of realObject we can see that the same change got reflected to normal clone but not in deep clone. So we have used cloneDeep function of lodash successfully using npm.

Now consider you have 20-25 such different libraries used in your project. In that case you don't have to copy and transfer 'node_modules' folder to different system you just have to transfer your code files and the npm's package.json file and then you can run below command in your project folder and npm will download and add all the dependencies based on the package.json file.

```
npm install
```

Note: before running the code in this section make sure to run `npm install` and check the node_modules folder is there or not.
