## 49 Final project

In this project we will use almmost all the features that we have discussed in all previous sections, so basically this will be a kind of recap of all the entire notes.

Basically this application is a recipe guide application where you can search for any recipe from many recipes available and it will give you the details of how you can prepare it dish. It also has the feature of how many servings you want to prepare, based on that it will suggest you the quantity of ingredients required. You can also bookmark your favourite recipes so that it will appear in the bookmarked list and you can directly open those.

Also you can add your own recipes which will be visible for you onle (as we are not integrating any centralized database so it will be available on the system that recipe is added.)

### How to start the application?

As this perticular repository is for javascript only so the html and css files are already written and we will only focus on javascript. The starter files for this project are present in [49.1-Starter files](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/49-Final%20project/49.1-Starter%20files).

After downloading the started file first thing we have to do is to innitialize a project using below command in project folder

```
npm init
```

Once all the information is entered you will see below `package.json` file created in the project folder.

```json
{
  "name": "forkify",
  "version": "1.0.0",
  "description": "Recipe book for your kitchen",
  "default": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Akhil Selukar",
  "license": "ISC"
}
```

Then we will need parcel to build and run the project hence we will have to install parcle for this project and then modify the package.json file to add start and build commands as we saw in [48.6-Building with parcel](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/tree/master/48-Modern%20javascript%20development/48.6-Building%20with%20parcel) section.

To install parcel just run below command in project folder.

```
npm install parcel --save-dev
```

Now after the above command is executed completly we can add parcle start and build scripts as below.

```json
{
  "name": "forkify",
  "version": "1.0.0",
  "description": "Recipe book for your kitchen",
  "default": "index.js",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html --dist-dir ./dist"
  },
  "author": "Akhil Selukar",
  "license": "ISC",
  "devDependencies": {
    "parcel": "^2.12.0"
  }
}
```

In this projects starter files we have used saas for css which is a much better and modern way of writing css code, in order for this to work we need to install saas dependency hence we ca run below command which will download all the required dependencies for the project

```
npm install
```

Now we can run below command to start live server and see the project in local.

```
npm start
```

Once you are done with all the above steps your application will be running on 'http://localhost:1234' and you will bet below output of starter files.

![Starter file output (49-Final project/Notes images/Starter-files.png)](https://github.com/Akhil-Selukar/Complete-JavaScript-Notes/blob/master/49-Final%20project/Notes%20images/Starter-files.png)

To deploy this application you can simply run `npm build` command and wait for the comman to execute. After completion of the command you will see a dist folder at project location that dist folder you can use for deployment.
