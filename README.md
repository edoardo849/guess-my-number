Guess My number
===

# Description of the assignment

Exercise description:
- Create an interface that allows a user to enter a number in a certain range.
-  There has to be a predefined number hidden from the user.
- The user should know what that range is and should be able to have three attempts.
- Every time the user enters a number, this will be logged in a database and show in the interface the number of intents.
- If the user enters a number that matches the predefined number, a success message should be shown.
- If the user exceeds the number of attempts an message should be shown communicating it.

## Deliverables:
All application files plus the database dump in a zip file.

# Installation

## Dependencies
- `node` and `npm`
-  Ensure you're running the latest versions Node `v4.1.x+` and NPM `2.14.x+`
- `mongodb` installed on localhost listening to port `27017`

Once you have those, you should install these globals with npm install --global:

- `webpack (npm install --global webpack)`
- `webpack-dev-server (npm install --global webpack-dev-server)`
- `karma (npm install --global karma-cli)`
- `protractor (npm install --global protractor)`
- `typings (npm install --global typings)`
- `typescript (npm install --global typescript)`

Clone the repository
```bash
git clone

# Enter in the repository
cd guess-my-number

# install the repo with npm
npm install

# start the server
npm start

# In another Terminal Tab start the backend
npm run backend

# Run tests
npm run test
```
