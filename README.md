## Course: Learning Fullstack JavaScript Development: MongoDB, Node.js, React.js
## https://www.linkedin.com/learning/learning-full-stack-javascript-development-mongodb-node-and-react


####  launch mongodb: brew services start mongodb-community@4.4
####  kill mongodb: brew services stop mongodb-community@4.4
####  load sample data to mongo: 
####      babel-node loadTestData.js 
####      babel-node updateTestData.js - replace id with mongodb ObjectId _id
####  delete: db.**.drop()


Other things to try:
test - mocha, selenium, puppeteer
api test - JS/postman
ci/cd
feature flags - launchdarkly
axe accessibility test
docker
mocks - montebank


Main tools from the tutorial:
Webpack: bundler - translate modular code to code browser understands
Babel: the loader, configure the bundler (webpack)
nodemon: auto refresh changes
EJS: a template language
JSX: describe UI inside js, compiled into react
react: generate html from js, creates a js object tree in memory, compare the diff & generate parital elemnt when update - virtual dom
