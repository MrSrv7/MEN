# MEN

A StandAlone NodeJS Server Backend app which is connected to MongoDB via Express JS, that responds to API (REST API) requests and perform Authentication checks (if neccessary) with JWT tokens. You can use this as a dedicated Server backend for whatever front-end framework you using (like ReactJS, VueJS, even Vanilla JS). This is a NodeJS Server app connected with MongoDB for saving, manipulating and maintaining the data. The APIs are interactively served at the root level by Swagger. All the APIs can be interactively explored through the Swagger UI.

## Note

This App is deployed to Heroku. If you also need to deploy in heroku you can do with the following commands using `heroku cli`

### Commands

`heroku create` - this command creates a server instance in your heroku account.
`git push heroku master` - this command pushes the code from the git repository to heroku's app repository.
`heroku ps:scale web=1` - this command scales the web server.
`heroku open` - this command opens the app instance in default browser.

## All the Environmental files will be ignored by default in Heroku. Visit the app settings page and define the environmental values in Config Vars section

## Project Setup

The `root` directory contains :

`package.json` : file that records important metadata about a project and also defines functional attributes of a project that npm uses to install dependencies, run scripts, and identify the entry point to the package.

`.eslintrc` : this is the config file of the linter package that the app is using - `eslint`.

`.prettierrc` : this is the config file of the prettier package which helps to format the code `prettier`

`.babelrc` : this is the config file of the babel package that helps to make use of ES6+ syntax in app's files `babel`

`.env` : this is the environmental config which is not pushed to any VCS or over network as it may contain senstive data like API keys etc.,

`Procfile` : this is the config file for deploying in heroku

`src` : this is the starting point of the project. The `src` (source) directory contains all the neccessary files that initiate the server, connects the middleware and the database with the server, responds to the incoming API requests etc

The `src` directory contains :

1. `models` : **Models** directory contains all the schema files with which the database is designed to save data and return the collection of data.

2. `controllers` : **Controllers** directory contains all the controller files with which the functional aspect is written.

3. `routers` : **Routers** directory contains all the router files with which the app's router is configured to respond with the controller functions corresponding to the incoming API requests.

4. `middleware` : **Middleware** directory contains all the middleware files with which the router is configured to perform any middleware functionality (like checking if the user logged in has authority to view or make changes) before performing the controller logic.

5. `apis` : **Apis** directory contains all the objects that are defined in swagger config which are served in Swagger UI to interact with the APIs.

6. `utils` : **Utils** directory contains all the utility files which are nothing but the most repetitive block of codes and are saved as template files written with abstraction so that the utility can be integrated anywhere within the app.

7. `server.js` : **server.js** is the root file for the server to keep running and initiate the router and establish the connection between the database and server to respond any incoming API requests etc.,

8. `constants.json` : **constants.json** contains all the static/hard-coded values which are usually strings that are returned if any error occurs or any of the validation fails. This is useful if the app grows and if the constants' valus needed to be changed frequently.

## Scripts

The following `scripts` can be run within the root directory of the app.

1. `npm i` or `yarn` : is used to install all the required dependencies that are in the package.json file to run the app

2. `npm run dev:server` : `yarn start dev:server` : is used to run the server app with `src/server.js` as entry point in development mode

3. `npm run local:server` : `yarn start local:server` : is used to run the server app with `src/server.js` as entry point in development mode

4. `npm run lint:check` or `yarn lint:check` : is used to lint all the js files within the app's scope.

5. `npm run lint:fix` or `yarn lint:fix` : is used to fix all the fixable linting errors that eslint returned with `.eslintrc` config.

6. `npm run format:check` or `yarn format:check` : is used to check if the styling of all files matches with the `.prettierrc` config.

7. `npm run format:fix` or `yarn format:fix` : is used to fix if the styling of any/all file(s) doesn't matches the `.prettierrc` config.

8. `npm run prepare` or `yarn prepare` : is used to run the `husky` app which is used to prevent commits if it may contain any `eslint` linting errors or `prettier` styling error.
