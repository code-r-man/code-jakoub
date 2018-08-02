# Developer test
In this repository you will find a very simplified version of the tech stack we use at Gamebook.
Our tests focus specifically on the sign up form and how you connect it to Redux and GraphQl

## API information...

We use GraphQl as our API, the relevant endpoints for this test are already implemented:
- signUp (Mutation)
- usernameExists (Query)

Further documentation about the endpoints is available in localhost:3000/graphql once you run the
application

The test consists in 4 tasks, `not all of them are relevant for the evaluation of your application`, only complete the tasks you were indicated by email.

#### General Coding Principles
* When refactoring base your solution on SOLID principles
* Use a functional approach where applicable
* Design components 
* Follow a clean naming convention and class format
* Follow the one-class-per-file convention
* Put comments where needed

## Task 1: Implement rule based validation for the password field in the Signup form.
The validation for the password field should:
* Validate the password field as the user inputs new data.
* Display the list of validation rules that the field should meet.
* Conditionally style each of the rules in the list based in the validation status for that rule.

Check the wireframe below for a detailed example:
```
wireframe: http://ssp6i2.axshare.com/#c=2
pw: GamebookTechnology
```

## Task 2: Implement async validation for the username field.
The validation for the username field should:
* Validate the username field as the user inputs new data.
* Get the validation status from the GraphQl endpoint `usernameExists`.
* Use the GraphQl client that is already implemented (Optional, you can also use a different GraphQl client).

## Task 3: Refactor the form as a component.
Implement a Form component that substitutes the current form implementation, it should:
* Display form errors.
* Display a user hint while loading.
* Display the submit button.
* Handle the submit event.

## Task 4: Connect the component with the `signup` endpoint.
The solution should:
* Send a request on submit to `signup` endpoint.
* Use the GraphQl client that is already implemented (Required, this time is not optional).
* Set status of the request in the Redux store.
* Set errors from the API in the Redux store.
* Read the state from the store.

# gamebook-portal instructions

## Requirements...
- Latest Node LTS (v6.9.x)
- NVM (strongly recommended but not a dependency)

## Install system dependencies...
1. Install NVM [link](https://github.com/creationix/nvm#install-script)
2. Install Node `nvm install 6.9` or go to node and grab latest Node version [link](https://nodejs.org/en/download/current/)

## Install project dependencies...
1. Navigate to the root of the project
2. Run: `npm install`
3. If you do not have webpack installed globally you will need it now `npm install -g webpack`

## Usage...
To run the server build watcher run `npm run webpack`, this will
create a bundled application that includes both, server and client.
This process will continue running waiting for code changes and then
building a new application bundle accondingly. The generated file will
be named `compiled-server.js` to execute this file `npm run start`
this will start the web server and a new client build watcher that
will inject the changes in the code directly to the client.



