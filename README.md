# Clarity

advanced ml for nutritional analysis and healthcare management

steps to run project install dependencies

```
npm init -y
npm install express pocketbase
npm install --save-dev nodemon
npx create-react-app-client
cd client
npm install @mui/material @emotion/react @emotion/styled redux react-redux axios
cd ../server
npm init -y
npm install express pocketbase
npm install --save-dev nodemon
```

```
cd server
npm run dev

> clarity-backend@1.0.0 dev
> nodemon server.js

[nodemon] 3.1.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node server.js`
server is running on port 5001
```

```
cd client
npm start
Compiled successfully!

You can now view client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.242:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

project structure

```
clarity-app/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── .gitignore
├── README.md
└── package.json
```

```
.
├── README.md
├── client
│   ├── README.md
│   ├── build
│   │   ├── asset-manifest.json
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── static
│   │       ├── css
│   │       │   ├── main.f855e6bc.css
│   │       │   └── main.f855e6bc.css.map
│   │       ├── js
│   │       │   ├── 453.419a5d54.chunk.js
│   │       │   ├── 453.419a5d54.chunk.js.map
│   │       │   ├── main.91e64355.js
│   │       │   ├── main.91e64355.js.LICENSE.txt
│   │       │   └── main.91e64355.js.map
│   │       └── media
│   │           └── logo.6ce24c58023cc2f8fd88fe9d219db6c6.svg
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── background.heic
│   │   ├── cover-d.png
│   │   ├── cover-l.png
│   │   ├── d-cover.png
│   │   ├── d-mockup.png
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── l-cover.png
│   │   ├── l-mockup.png
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── components
│       │   ├── Dashboard.js
│       │   ├── ForgotPassword.js
│       │   ├── Login.css
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── ThemeToggle
│       │       ├── ThemeToggle.css
│       │       └── ThemeToggle.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── redux
│       │   ├── index.js
│       │   ├── reducers
│       │   │   └── index.js
│       │   └── store.js
│       ├── reportWebVitals.js
│       └── setupTests.js
├── package-lock.json
├── package.json
└── server
    ├── app.js
    ├── controllers
    ├── models
    ├── package-lock.json
    ├── package.json
    ├── routes
    │   └── api.js
    └── server.js

17 directories, 57 files
```

####  `package.json`

provides metadata, dependencies, scripts, configuration, engines, versioning, and repository information for the project.  

metadata contains the `name`, `version`, `description`, `main`, `scripts`, `keywords`, `author`, `dependencies`, `devDependencies`, and `license` of the project

when cloning the project and running `npm install`, the dependencies are automatically installed and this ensures that the project has all the necessary libraries to run correctly.

the scripts define custom commands for the project, such as `start`, `build`, `test`, `dev`, by running `npm run <script>` in the terminal.

`npm start` runs the application in development mode, meaning that the application will run on `localhost:3000` and any changes made to the code will be reflected in the browser.

`npm test` runs the application in test mode, meaning it runs a test watcher in an interactive mode. 

`npm run build` builds the application for production mode, creating an optimized version of the application in the `build` folder.  essentially it bundles the app into static files for production

`npm run eject` removes this tool and copies build dependencies, configuration files and scripts into the app directory, this is an irreversible action and cannot be undone.

`npm` is a package manager for node.js, it allows you to install, update, and manage dependencies for your project.

`express` is a web application framework for node.js, its used to process the handling of http requests, api requests, and routing.

`pocketbase` provides real time databases, authentication, file storage, allowing you to store and manage user data, files, and other resources.

`nodemon` is a utility that monitors for any changes in the source code and automatically restarts the server, it helps with the development process by reducing the need to manually restart the server for every change.

`npx` is a package running tool that comes with npm, and allows you to run node.js packages without having to install them globally.

`create-react-app` is a used to create a single page react application and sets up the project with default configurations, including tools like webpack babel, eslint, and jest.

[`@mui/material`](https://mui.com/material-ui/getting-started/installation/) is a library of react components that implements google's material design, it helps with building a user interface with components such as buttons, text fields, and dialogs.

[`@emotion/react`](https://emotion.sh/docs/introduction) is library for writing css styles with javascript and provides flexible styling capabilities, its used as the default styling engine for material ui allowing for direct css usage.

[`@emotion/styled`](https://emotion.sh/docs/styled) is part of the emotion library that provides a styled components like api for creating styled react components

[`redux`](https://redux.js.org/usage/#code-quality) is a state management library, it helps manage the state of the application in a predictable way.  it centralizes the applications state and logic.

[`react-redux`](https://react-redux.js.org/using-react-redux/connect-mapstate) is the official binding library for react and redux, it allows for easy integration by connecting react components to the redux store, enabling them to read state and dispatch actions.

[`axios`](https://axios-http.com/docs/intro) is a library that helps with making http requests, it's used to communication with the backend apis, making it easier to send and receive data from the server.

`cors`

####  `./server/server.js`

####  `./server/app.js`

####  `./server/routes/api.js`




