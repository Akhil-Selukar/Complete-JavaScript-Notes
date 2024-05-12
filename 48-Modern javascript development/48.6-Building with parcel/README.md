## 48.6 Building project with parcel

In last few sections we saw that we have to run `npm install` command on each machine and it will then download all the dependencies and then the application will be ready to use, but we cant ask user to do this on his/her machine. Even the packages that is downloaded after the npm install might be huge and we might not be using the complete package (like in last section we just used cloneDeep from lodash, which is just one function from hundreds of functions available in lodash). But npm install did download the whole package, this is not necessary. So to fix this and package the application with only those things which are actually necessary to run the code we use build tools like parcel. It bundle the code with only necessary things and compress it so that it is easy to move to production.

Parcel tool is a command line tool and it is available in npm, so we install it using npm command. To install the parcel tool we have to run below command in project folder (here we are installing the parcel only for specific project but you can install it globally as well)

To install locally (for specific project)

```
npm install parcel --save-dev
```

Note: to install parcel globally we just have to run the command with -g for global installation.

Now once the parcel is installed you will see entry for parcel in `package.json` file under 'devDependencies' section. DevDependencies means thesse dependencies are required only for development purpose and will not be included in final build.

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
  },
  "devDependencies": {
    "parcel": "^2.12.0"
  }
}
```

Now to run the parcel and optimize the code we have two ways.

1. by using npx command
2. by using npm script (i.e. package.json)

Mostly second way is used in real world but we will see both. The first is using npx command. So to run the parcel we can run below command in project folder.

```
npx parcel index.html
```

Here the index.html is our entry point for the application. Now when we run this command it will start a live server on 'localhost:1234' and a new folder 'dist' (distribution) gets created and this folder contains the parsed code. If we take a look at this code we can see that the index.html is not pointing to newly created javascript file (this is a script file hence parcel removes the type="module") and that javascript file is having a lot of now code along with the code written by us. This additional code is from the dependencies that we have in our code and other code that is needed for this newly bundled application to work. Here parcel included only that code which we need from lodash and not the complete lodash library. Now this code inside the dist folder is what we use in production.

Another thing which parcel does which is very helpful is we do not have to secify the complete path of import in our script file. For example to import cloneDeep from lodash till now we used below import statement.

```javascript
import cloneDeep from "./node_modules/lodash-es/cloneDeep.js";
```

But when we are using parcel we can simply use

```javascript
import cloneDeep from "lodash-es";
```

Parcel is smart enough to pic cloneDeep from lodash for us. Even this is true for other assets as well like css files, images, media, etc.

Now the code is well optimizes, but still there is a scope to optimize this code further. We can see that there are many comments present in the code and in the dependency code there might be some portion of cloneDeep which we are not using. So to remove all this and compress the application even further we can use parcel but we will see that in a while.

First let's look at the second way to run parcel using npm script i.e. package.json file.

If we closely observe the package.json, there is a script section in it. This is where we can provide some scripts to test our code and to run parcel and build the code. The command which we use using npx i.e. `parcel index.html` this we can pass in here and we can use it to run parcel. Have a look at below package.json.

```json
{
  "name": "48.5-working-with-npm",
  "version": "1.0.0",
  "description": "",
  "main": "script.js",
  "scripts": {
    "start": "parcel index.html"
  },
  "author": "Akhil Selukar",
  "license": "ISC",
  "dependencies": {
    "lodash-es": "^4.17.21"
  },
  "devDependencies": {
    "parcel": "^2.12.0"
  }
}
```

Here in above package.json we have added a script named 'start' and the command which we will be executing whenever we call start script is `parcel index.html`. Now every time when we want to run the parcel we can just run below command in project folder.

```
npm run start
```

Note: here start is the name of script which we gave in packaje.json. You can give any name.

Above command will also do the same job which 'npx parcel index.html' did.

Now the next step is we want to compress the code further and remove all the unnecessary code and comments from the final build which we want to move to production. To do this we have another parcel command which is

```
parcel build index.html
```

This can also be run using npx but hener I'm adding this in package.json only.

```json
{
  "name": "48.5-working-with-npm",
  "version": "1.0.0",
  "description": "",
  "main": "script.js",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  },
  "author": "Akhil Selukar",
  "license": "ISC",
  "dependencies": {
    "lodash-es": "^4.17.21"
  },
  "devDependencies": {
    "parcel": "^2.12.0"
  }
}
```

So now in project folder we can run command.

```
npm run build
```

> Note : If you get error like below while running npm run build
>
> ```
> @parcel/namer-default: Target "main" declares an output file path of "script.js" which does not match the compiled bundle type "html".
> ```
>
> Simply remove line `"main": "script.js",` from package.json and it will work

This will optimize and compress the code further. Once the command is executed completly have a look at html and js files in dist folder. You will see the content in the files just converted into a single line and it is very hard to read. This is the finally optimized code and now this optimized code is finally ready to go to production. Many times in many libraries you might find minified version of the files, those files are nothing but this optimized versions.

> [!IMPORTANT] Just take a look at size of 'dist' folder and the size of code you have written including the dependencies downloaded and assets used, you will see the huge difference. In my case the code without parcel is of 200+Mbs and and code built by parcel is of 207kb.
